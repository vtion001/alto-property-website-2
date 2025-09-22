/**
 * Global Twilio Device Manager
 * Maintains device connection state across component unmount/remount cycles
 */

import { Device } from '@twilio/voice-sdk'

// Helper function to get Twilio Device class
function getTwilioDevice() {
  if (typeof window !== 'undefined' && (window as any).Twilio?.Device) {
    return (window as any).Twilio.Device
  }
  return Device
}

// Helper function for detailed error logging
function logDetailedError(context: string, error: any) {
  console.error(`❌ ${context}:`, {
    error,
    message: error?.message,
    code: error?.code,
    stack: error?.stack,
    timestamp: new Date().toISOString()
  })
}

interface DeviceState {
  device: any | null
  isReady: boolean
  status: 'initializing' | 'connecting' | 'ready' | 'error' | 'retrying' | 'failed' | 'disconnected'
  error: string | null
  token: string | null
  retryCount: number
}

class TwilioDeviceManager {
  private static instance: TwilioDeviceManager
  private state: DeviceState = {
    device: null,
    isReady: false,
    status: 'initializing',
    error: null,
    token: null,
    retryCount: 0
  }
  private listeners: Set<(state: DeviceState) => void> = new Set()
  private initializationPromise: Promise<void> | null = null
  private toast: any = null

  static getInstance(): TwilioDeviceManager {
    if (!TwilioDeviceManager.instance) {
      TwilioDeviceManager.instance = new TwilioDeviceManager()
    }
    return TwilioDeviceManager.instance
  }

  subscribe(listener: (state: DeviceState) => void): () => void {
    this.listeners.add(listener)
    // Immediately call with current state
    listener({ ...this.state })
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener({ ...this.state }))
  }

  private updateState(updates: Partial<DeviceState>) {
    this.state = { ...this.state, ...updates }
    this.notifyListeners()
  }

  // Initialize device with token and toast
  async initialize(token: string, toast?: any): Promise<void> {
    console.log('🔧 TwilioDeviceManager.initialize called with:', {
      tokenLength: token?.length,
      tokenPreview: token?.substring(0, 20) + '...',
      hasToast: !!toast
    })
    this.toast = toast
    this.updateState({ status: 'initializing' })
    return this.initializeDevice(token)
  }

  async initializeDevice(token: string): Promise<void> {
    // If already initializing with the same token, return the existing promise
    if (this.initializationPromise && this.state.token === token) {
      return this.initializationPromise
    }

    // If device is already ready with the same token, no need to reinitialize
    if (this.state.device && this.state.isReady && this.state.token === token) {
      return Promise.resolve()
    }

    this.initializationPromise = this.doInitializeDevice(token)
    return this.initializationPromise
  }

  private async doInitializeDevice(token: string): Promise<void> {
    try {
      console.log('🔄 TwilioDeviceManager: Initializing device...')
      this.updateState({ 
        status: 'connecting', 
        error: null, 
        token 
      })

      // Check if we're in mock mode
      if (token === 'mock_access_token_for_development') {
        console.log('🧪 TwilioDeviceManager: Mock mode detected - simulating device ready state')
        this.updateState({
          device: { mock: true },
          isReady: true,
          status: 'ready',
          error: null
        })
        return Promise.resolve()
      }

      // Clean up existing device if any
      if (this.state.device) {
        try {
          this.state.device.destroy()
        } catch (error) {
          console.warn('Error destroying existing device:', error)
        }
      }

      // Validate token before initialization
      if (!token || token === 'mock_access_token_for_development') {
        if (token === 'mock_access_token_for_development') {
          console.log('🧪 TwilioDeviceManager: Mock mode detected')
          this.updateState({
            device: null,
            isReady: true,
            status: 'ready',
            error: null,
            retryCount: 0
          })
          return
        } else {
          throw new Error('Invalid or missing access token')
        }
      }

      // Get Twilio Device class
      console.log('📦 Getting Twilio Device class...')
      const TwilioDevice = getTwilioDevice()
      console.log('✅ Twilio Device class obtained')
      
      // Create device with modern Voice SDK v2.x configuration
      console.log('🏗️ Creating Twilio Device instance...')
      const device = new TwilioDevice(token, {
        edge: ['sydney', 'dublin'] // Use closest edge locations
      })
      console.log('✅ Twilio Device instance created')

      // Setup device event handlers with enhanced error handling
      device.on('ready', () => {
        console.log('✅ TwilioDeviceManager: Device ready')
        console.log('📊 Device capabilities:', {
          state: device.state,
          identity: device.identity,
          edge: device.edge,
          isBusy: device.isBusy
        })
        
        this.updateState({
          device,
          isReady: true,
          status: 'ready',
          error: null,
          retryCount: 0
        })

        if (this.toast) {
          this.toast({
            title: 'Device Ready',
            description: 'Twilio device is ready for calls',
            variant: 'default',
          })
        }
      })

      device.on('error', (error: any) => {
        logDetailedError('TwilioDeviceManager Device Error', error)
        this.updateState({
          device: null,
          isReady: false,
          status: 'error',
          error: error.message || 'Device error'
        })

        let errorMessage = 'Could not initialize Twilio device for calling'
        if (error.message?.includes('TwiML')) {
          errorMessage = 'TwiML application not configured. Please check the setup guide.'
        } else if (error.message?.includes('token')) {
          errorMessage = 'Invalid access token. Please check your Twilio credentials.'
        }

        if (this.toast) {
          this.toast({
            title: 'Device Error',
            description: errorMessage,
            variant: 'destructive',
          })
        }
      })

      device.on('disconnect', (call: any) => {
        console.log('🔌 TwilioDeviceManager: Device disconnected')
        if (call) {
          logDetailedError('Disconnect Event', call)
        }
        this.updateState({
          isReady: false,
          status: 'disconnected'
        })
      })

      device.on('incoming', (call: any) => {
        console.log('📞 Incoming call received')
        console.log('📊 Incoming call details:', {
          callSid: call.parameters.CallSid,
          from: call.parameters.From,
          to: call.parameters.To,
          direction: call.parameters.Direction
        })
        
        if (this.toast) {
          this.toast({
            title: 'Incoming Call',
            description: `Call from ${call.parameters.From}`,
            variant: 'default',
          })
        }
      })

      // Additional event listeners for comprehensive monitoring
      device.on('connect', (call: any) => {
        console.log('🔗 Call connected:', call.parameters)
      })
      
      device.on('cancel', () => {
        console.log('❌ Call cancelled')
      })
      
      device.on('presence', (presenceEvent: any) => {
        console.log('👤 Presence event:', presenceEvent)
      })

      // Store device reference
      this.updateState({ device })
      
      // Register the device to connect to Twilio's servers with timeout
      console.log('📡 Registering device with Twilio...')
      
      // Add timeout to prevent hanging
      const registrationPromise = device.register()
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Device registration timeout after 30 seconds')), 30000)
      })
      
      await Promise.race([registrationPromise, timeoutPromise])
      console.log('🚀 Twilio Device initialized and registered successfully')

    } catch (error: any) {
      logDetailedError('TwilioDeviceManager Initialization Error', error)
      this.updateState({
        device: null,
        isReady: false,
        status: 'error',
        error: error.message || 'Initialization failed'
      })

      let errorMessage = 'Could not initialize Twilio device for calling'
      if (error.message?.includes('TwiML')) {
        errorMessage = 'TwiML application not configured. Please check the setup guide.'
      } else if (error.message?.includes('token')) {
        errorMessage = 'Invalid access token. Please check your Twilio credentials.'
      }

      if (this.toast) {
        this.toast({
          title: 'Device Initialization Failed',
          description: errorMessage,
          variant: 'destructive',
        })
      }
      
      throw error
    } finally {
      this.initializationPromise = null
    }
  }



  getDevice() {
    return this.state.device
  }

  getState() {
    return { ...this.state }
  }

  isDeviceReady() {
    return this.state.isReady
  }

  destroy() {
    if (this.state.device) {
      try {
        this.state.device.destroy()
      } catch (error) {
        console.warn('Error destroying device:', error)
      }
    }
    
    this.updateState({
      device: null,
      isReady: false,
      status: 'disconnected',
      error: null,
      token: null,
      retryCount: 0
    })
    
    this.listeners.clear()
    this.initializationPromise = null
  }
}

export default TwilioDeviceManager