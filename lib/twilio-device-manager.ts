/**
 * Global Twilio Device Manager
 * Maintains device connection state across component unmount/remount cycles
 */

import { Device, Call } from '@twilio/voice-sdk'

// Using Twilio Voice SDK v2.x Device class directly

// Twilio-specific type definitions
interface TwilioError {
  message: string
  code?: number | string
  stack?: string
  causes?: TwilioError[]
  description?: string
  explanation?: string
  solutions?: string[]
}

interface TwilioPresenceEvent {
  available: boolean
}

interface ToastFunction {
  (options: { title: string; description?: string; variant?: 'default' | 'destructive' }): void
}

// Mock device type for development
interface MockDevice {
  mock: true
}

// Union type for device that can be real or mock
type TwilioDevice = Device | MockDevice

// Type guards
function isRealDevice(device: TwilioDevice): device is Device {
  return !('mock' in device)
}

function isMockDevice(device: TwilioDevice): device is MockDevice {
  return 'mock' in device
}

// Helper function for detailed error logging
function logDetailedError(context: string, error: TwilioError | Error | unknown) {
  const errorInfo: Record<string, unknown> = {
    error,
    timestamp: new Date().toISOString()
  }

  if (error && typeof error === 'object') {
    if ('message' in error) errorInfo.message = error.message
    if ('code' in error) errorInfo.code = error.code
    if ('stack' in error) errorInfo.stack = error.stack
  }

  console.error(`❌ ${context}:`, errorInfo)
}

interface DeviceState {
  device: TwilioDevice | null
  isReady: boolean
  status: 'initializing' | 'connecting' | 'ready' | 'error' | 'retrying' | 'failed' | 'disconnected'
  error: string | null
  token: string | null
  retryCount: number
  // Call recording state
  currentCall: Call | null
  isRecording: boolean
  recordingConsent: boolean
  callStartTime: Date | null
  callSid: string | null
}

class TwilioDeviceManager {
  private static instance: TwilioDeviceManager
  private state: DeviceState = {
    device: null,
    isReady: false,
    status: 'initializing',
    error: null,
    token: null,
    retryCount: 0,
    currentCall: null,
    isRecording: false,
    recordingConsent: false,
    callStartTime: null,
    callSid: null
  }
  private listeners: Set<(state: DeviceState) => void> = new Set()
  private initializationPromise: Promise<void> | null = null
  private toast: ToastFunction | null = null

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
  async initialize(token: string, toast?: ToastFunction): Promise<void> {
    console.log('🔧 TwilioDeviceManager.initialize called with:', {
      tokenLength: token?.length,
      tokenPreview: token?.substring(0, 20) + '...',
      hasToast: !!toast
    })
    this.toast = toast || null
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
      if (this.state.device && isRealDevice(this.state.device)) {
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

      // Use Voice SDK v2.x Device class directly
      console.log('📦 Using Twilio Voice SDK v2.x Device class...')
      
      // Create device with modern Voice SDK v2.x configuration
      console.log('🏗️ Creating Twilio Device instance...')
      const device = new Device(token, {
        edge: ['sydney', 'dublin'], // Use closest edge locations
        logLevel: 'warn' // Reduce console noise
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

      device.on('error', (error: TwilioError | Error | unknown) => {
        logDetailedError('TwilioDeviceManager Device Error', error)
        const baseErrorMessage = error instanceof Error ? error.message : 
                                (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') ? 
                                (error as any).message : 'Device error'
        
        this.updateState({
          device: null,
          isReady: false,
          status: 'error',
          error: baseErrorMessage
        })

        let toastMessage = 'Could not initialize Twilio device for calling'
        if (baseErrorMessage.includes('TwiML')) {
          toastMessage = 'TwiML application not configured. Please check the setup guide.'
        } else if (baseErrorMessage.includes('token')) {
          toastMessage = 'Invalid access token. Please check your Twilio credentials.'
        }

        if (this.toast) {
          this.toast({
            title: 'Device Error',
            description: toastMessage,
            variant: 'destructive',
          })
        }
      })

      device.on('disconnect', (call: Call | null) => {
        console.log('🔌 TwilioDeviceManager: Device disconnected')
        if (call) {
          logDetailedError('Disconnect Event', call)
        }
        this.updateState({
          isReady: false,
          status: 'disconnected'
        })
      })

      device.on('incoming', (call: Call) => {
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
      device.on('connect', (call: Call) => {
        console.log('🔗 Call connected:', call.parameters)
      })
      
      device.on('cancel', () => {
        console.log('❌ Call cancelled')
      })
      
      device.on('presence', (presenceEvent: TwilioPresenceEvent) => {
        console.log('👤 Presence event:', presenceEvent)
      })

      // Store device reference
      this.updateState({ device })
      
      // In Voice SDK v2.x, the device automatically connects when instantiated
      // No manual registration is needed - the 'ready' event will fire when connected
      console.log('📡 Device created, waiting for ready event...')
      console.log('🚀 Twilio Device initialized successfully (v2.x)')

    } catch (error: unknown) {
      logDetailedError('TwilioDeviceManager Initialization Error', error)
      const baseErrorMessage = error instanceof Error ? error.message : 
                              (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') ? 
                              (error as any).message : 'Initialization failed'
      
      this.updateState({
        device: null,
        isReady: false,
        status: 'error',
        error: baseErrorMessage
      })

      let errorMessage = 'Could not initialize Twilio device for calling'
      if (baseErrorMessage.includes('TwiML')) {
        errorMessage = 'TwiML application not configured. Please check the setup guide.'
      } else if (baseErrorMessage.includes('token')) {
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

  // Call recording methods
  async makeCall(phoneNumber: string, recordingEnabled: boolean = false): Promise<Call | null> {
    if (!this.state.device || !this.state.isReady) {
      throw new Error('Device not ready for calls')
    }

    // Handle mock device
    if (isMockDevice(this.state.device)) {
      console.log('🧪 Mock call to:', phoneNumber)
      return null
    }

    try {
      console.log('📞 Making call to:', phoneNumber, 'with recording:', recordingEnabled)
      
      const params: Record<string, string> = {
        To: phoneNumber
      }

      // Add recording parameter if enabled
      if (recordingEnabled) {
        params.Record = 'true'
        params.RecordingStatusCallback = `${window.location.origin}/api/call-recordings/webhook`
      }

      const call = await this.state.device.connect(params)
      
      this.updateState({
        currentCall: call,
        callStartTime: new Date(),
        callSid: call.parameters?.CallSid || null,
        isRecording: recordingEnabled
      })

      // Setup call event handlers
      this.setupCallEventHandlers(call)

      return call
    } catch (error) {
      logDetailedError('Make Call Error', error)
      throw error
    }
  }

  private setupCallEventHandlers(call: Call) {
    call.on('accept', () => {
      console.log('✅ Call accepted')
      if (this.toast) {
        this.toast({
          title: 'Call Connected',
          description: 'Call is now active',
          variant: 'default',
        })
      }
    })

    call.on('disconnect', () => {
      console.log('📞 Call disconnected')
      this.handleCallEnd()
    })

    call.on('cancel', () => {
      console.log('❌ Call cancelled')
      this.handleCallEnd()
    })

    call.on('error', (error: TwilioError | Error | unknown) => {
      logDetailedError('Call Error', error)
      this.handleCallEnd()
      if (this.toast) {
        const errorMessage = error instanceof Error ? error.message : 
                            (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') ? 
                            (error as any).message : 'Call failed'
        this.toast({
          title: 'Call Error',
          description: errorMessage,
          variant: 'destructive',
        })
      }
    })
  }

  private async handleCallEnd() {
    const { currentCall: _currentCall, callSid, callStartTime, isRecording: _isRecording } = this.state

    if (callSid && callStartTime) {
      try {
        // Log call to database
        await this.logCallToDatabase(callSid, callStartTime, new Date())
      } catch (error) {
        console.error('Failed to log call:', error)
      }
    }

    this.updateState({
      currentCall: null,
      callStartTime: null,
      callSid: null,
      isRecording: false,
      recordingConsent: false
    })
  }

  private async logCallToDatabase(callSid: string, startTime: Date, endTime: Date) {
    try {
      const response = await fetch('/api/call-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callSid,
          startedAt: startTime.toISOString(),
          endedAt: endTime.toISOString(),
          duration: Math.floor((endTime.getTime() - startTime.getTime()) / 1000),
          status: 'completed'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to log call')
      }

      console.log('✅ Call logged to database')
    } catch (error) {
      console.error('❌ Failed to log call to database:', error)
    }
  }

  async startRecording(): Promise<boolean> {
    if (!this.state.currentCall) {
      throw new Error('No active call to record')
    }

    if (!this.state.recordingConsent) {
      throw new Error('Recording consent not given')
    }

    try {
      // Note: Twilio Voice SDK doesn't support starting recording mid-call
      // Recording must be enabled when making the call
      console.log('⚠️ Recording must be enabled when making the call')
      return false
    } catch (error) {
      logDetailedError('Start Recording Error', error)
      throw error
    }
  }

  async stopRecording(): Promise<boolean> {
    if (!this.state.currentCall || !this.state.isRecording) {
      return false
    }

    try {
      // Note: Twilio Voice SDK doesn't support stopping recording mid-call
      // Recording will stop when call ends
      console.log('⚠️ Recording will stop when call ends')
      return true
    } catch (error) {
      logDetailedError('Stop Recording Error', error)
      throw error
    }
  }

  setRecordingConsent(consent: boolean) {
    this.updateState({ recordingConsent: consent })
    
    if (this.toast) {
      this.toast({
        title: consent ? 'Recording Consent Given' : 'Recording Consent Revoked',
        description: consent 
          ? 'Calls can now be recorded with consent' 
          : 'Recording consent has been revoked',
        variant: consent ? 'default' : 'destructive',
      })
    }
  }

  hangupCall() {
    if (this.state.currentCall) {
      try {
        this.state.currentCall.disconnect()
      } catch (error) {
        console.error('Error hanging up call:', error)
      }
    }
  }

  getCurrentCall() {
    return this.state.currentCall
  }

  getCallState() {
    return {
      currentCall: this.state.currentCall,
      isRecording: this.state.isRecording,
      recordingConsent: this.state.recordingConsent,
      callStartTime: this.state.callStartTime,
      callSid: this.state.callSid
    }
  }

  destroy() {
    if (this.state.device && isRealDevice(this.state.device)) {
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
      retryCount: 0,
      currentCall: null,
      isRecording: false,
      recordingConsent: false,
      callStartTime: null,
      callSid: null
    })
    
    this.listeners.clear()
    this.initializationPromise = null
  }
}

export default TwilioDeviceManager
export { isRealDevice, isMockDevice, type TwilioDevice, type DeviceState }