'use client'

import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    Twilio: any
  }
}

// Type definitions
interface CallLog {
  id: number
  callSid: string
  fromNumber: string
  toNumber: string
  status: 'queued' | 'ringing' | 'in-progress' | 'completed' | 'busy' | 'failed' | 'no-answer' | 'canceled' | 'connected'
  duration?: number
  startedAt?: Date
  endedAt?: Date
  createdAt: Date
}

interface Contact {
  id: number
  name: string
  phoneNumber: string
  email?: string
  notes?: string
  tags?: string[]
  isFavorite?: boolean
  createdAt: Date
  updatedAt: Date
}

interface TwilioConfig {
  id: number
  accountSid: string
  phoneNumber: string
  isActive: boolean
  projectUrl?: string
  createdAt: Date
  updatedAt: Date
}

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, PhoneOutgoing, PhoneMissed, Settings, User, History, X, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'

const dialSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

const twilioConfigSchema = z.object({
  accountSid: z.string().min(1, 'Account SID is required'),
  authToken: z.string().min(1, 'Auth token is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

// DTMF tone frequencies (dual-tone multi-frequency)
const dtmfFrequencies: Record<string, [number, number]> = {
  '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
  '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
  '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
  '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
}

export default function Dialer() {
  const [isCalling, setIsCalling] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'dialing' | 'ringing' | 'connected' | 'ended' | 'busy'>('idle')
  const [twilioConfig, setTwilioConfig] = useState<any>(null)
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentCallSid, setCurrentCallSid] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [audioLevel, setAudioLevel] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isInCall, setIsInCall] = useState(false)
  const [currentPhone, setCurrentPhone] = useState('')
  const [device, setDevice] = useState<any>(null)
  const [isDeviceReady, setIsDeviceReady] = useState(false)
  const [deviceStatus, setDeviceStatus] = useState<'initializing' | 'connecting' | 'ready' | 'error' | 'retrying' | 'failed' | 'disconnected'>('initializing')
  const [deviceError, setDeviceError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  
  // Toast hook
  const { toast } = useToast()
  
  // Utility function to generate unique call IDs
  const generateCallId = () => {
    return `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  // Audio context and references
  const audioContextRef = useRef<AudioContext | null>(null)
  const ringingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const callStatusIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const remoteStreamRef = useRef<MediaStream | null>(null)
  const localAudioRef = useRef<HTMLAudioElement>(null)
  const remoteAudioRef = useRef<HTMLAudioElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataChannelRef = useRef<RTCDataChannel | null>(null)

  // Twilio WebRTC
  const [twilioToken, setTwilioToken] = useState<string>('')
  const deviceRef = useRef<any>(null)
  const currentConnectionRef = useRef<any>(null)

  const dialForm = useForm<z.infer<typeof dialSchema>>({
    resolver: zodResolver(dialSchema),
    defaultValues: { phoneNumber: '' },
  })

  const configForm = useForm<z.infer<typeof twilioConfigSchema>>({
    resolver: zodResolver(twilioConfigSchema),
    defaultValues: { accountSid: '', authToken: '', phoneNumber: '' },
  })

  // Initialize audio context on user interaction
  const initAudioContext = async () => {
    if (!audioContextRef.current) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        const context = new AudioContext()
        audioContextRef.current = context
        console.log('Audio context initialized:', context)
        
        // Resume context if suspended (required by some browsers)
        if (context.state === 'suspended') {
          await context.resume()
        }
      } catch (error) {
        console.warn('Web Audio API not supported:', error)
      }
    } else if (audioContextRef.current.state === 'suspended') {
      // Resume if suspended
      try {
        await audioContextRef.current.resume()
      } catch (error) {
        console.warn('Failed to resume audio context:', error)
      }
    }
  }

  // Generate DTMF tone
  const playDTMFTone = (digit: string) => {
    if (!audioContextRef.current) return
    
    const context = audioContextRef.current
    const [freq1, freq2] = dtmfFrequencies[digit] || [697, 1209]
    
    const oscillator1 = context.createOscillator()
    const oscillator2 = context.createOscillator()
    const gainNode = context.createGain()
    
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(context.destination)
    
    oscillator1.frequency.setValueAtTime(freq1, context.currentTime)
    oscillator2.frequency.setValueAtTime(freq2, context.currentTime)
    
    gainNode.gain.setValueAtTime(0.1, context.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1)
    
    oscillator1.start(context.currentTime)
    oscillator2.start(context.currentTime)
    oscillator1.stop(context.currentTime + 0.1)
    oscillator2.stop(context.currentTime + 0.1)
  }

  // Generate ringing tone with different patterns for different states
  const playRingingTone = async (toneType: 'ringing' | 'connected' | 'busy' = 'ringing') => {
    if (!audioContextRef.current) {
      await initAudioContext()
      if (!audioContextRef.current) return
    }
    
    const context = audioContextRef.current
    
    // Ensure context is running
    if (context.state === 'suspended') {
      await context.resume()
    }
    
    // Stop any existing ringing tone
    stopRingingTone()
    
    const playRing = () => {
      try {
        // Create new oscillator and gain node for each ring
        const oscillator = context.createOscillator()
        const gainNode = context.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(context.destination)
        
        if (toneType === 'ringing') {
          // Standard ringing tone: 440Hz A4 note, 2 seconds on, 4 seconds off
          oscillator.frequency.setValueAtTime(440, context.currentTime)
          oscillator.type = 'sine'
          gainNode.gain.setValueAtTime(0.4, context.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 2)
          oscillator.start(context.currentTime)
          oscillator.stop(context.currentTime + 2)
        } else if (toneType === 'connected') {
          // Connected tone: brief confirmation beep
          oscillator.frequency.setValueAtTime(800, context.currentTime)
          oscillator.type = 'sine'
          gainNode.gain.setValueAtTime(0.3, context.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.2)
          oscillator.start(context.currentTime)
          oscillator.stop(context.currentTime + 0.2)
        } else if (toneType === 'busy') {
          // Busy tone: 480Hz + 620Hz, 0.5s on, 0.5s off
          const osc1 = context.createOscillator()
          const osc2 = context.createOscillator()
          const gain = context.createGain()
          
          osc1.connect(gain)
          osc2.connect(gain)
          gain.connect(context.destination)
          
          osc1.frequency.setValueAtTime(480, context.currentTime)
          osc2.frequency.setValueAtTime(620, context.currentTime)
          gain.gain.setValueAtTime(0.3, context.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5)
          
          osc1.start(context.currentTime)
          osc2.start(context.currentTime)
          osc1.stop(context.currentTime + 0.5)
          osc2.stop(context.currentTime + 0.5)
        }
      } catch (error) {
        console.warn('Error playing ringing tone:', error)
      }
    }
    
    // Play immediately, then set up interval based on tone type
    playRing()
    
    if (toneType === 'ringing') {
      // Standard ringing pattern: 2s on, 4s off
      ringingIntervalRef.current = setInterval(playRing, 6000)
    } else if (toneType === 'busy') {
      // Busy tone pattern: 0.5s on, 0.5s off
      ringingIntervalRef.current = setInterval(playRing, 1000)
    }
    // Connected tone only plays once (no interval)
  }

  // Stop ringing tone
  const stopRingingTone = () => {
    if (ringingIntervalRef.current) {
      clearInterval(ringingIntervalRef.current)
      ringingIntervalRef.current = null
    }
  }

  // Check call status with better feedback
  const checkCallStatus = async (callSid: string) => {
    try {
      const response = await fetch(`/api/call-status?callSid=${callSid}`)
      if (response.ok) {
        const statusData = await response.json()
        const status = statusData.status
        
        console.log('Call status check:', statusData)
        
        if (status === 'completed' || status === 'failed' || status === 'busy' || status === 'no-answer') {
          setCallStatus('ended')
          if (status === 'busy') {
            await playRingingTone('busy')
          }
          stopRingingTone()
          stopCallStatusChecking()
          cleanupAudioStreams()
          setCurrentCallSid(null)
          setIsMuted(false)
          setIsSpeakerOn(true)
          setAudioLevel(0)
        } else if (status === 'in-progress') {
          setCallStatus('connected')
          await playRingingTone('connected')
          stopRingingTone()
          // Audio streams should already be set up, but ensure they're working
          console.log('Call connected - audio streams ready')
        } else if (status === 'ringing') {
          // Keep ringing tone playing
          if (callStatus !== 'dialing') {
            setCallStatus('dialing')
            await playRingingTone('ringing')
          }
        }
      }
    } catch (error) {
      console.error('Error checking call status:', error)
    }
  }

  // Start call status checking
  const startCallStatusChecking = (callSid: string) => {
    stopCallStatusChecking() // Clear any existing interval
    callStatusIntervalRef.current = setInterval(() => {
      checkCallStatus(callSid)
    }, 2000) // Check every 2 seconds
  }

  // Stop call status checking
  const stopCallStatusChecking = () => {
    if (callStatusIntervalRef.current) {
      clearInterval(callStatusIntervalRef.current)
      callStatusIntervalRef.current = null
    }
  }

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/twilio/config')
        if (response.ok) {
          const config = await response.json()
          setTwilioConfig(config)
          configForm.reset({ accountSid: config.accountSid, authToken: '', phoneNumber: config.phoneNumber })
        }
      } catch {}
    }
    const fetchCallLogs = async () => {
      try {
        const response = await fetch('/api/call-logs')
        if (response.ok) setCallLogs(await response.json())
      } catch {}
    }
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contacts')
        if (response.ok) setContacts(await response.json())
      } catch {}
    }
    fetchConfig(); fetchCallLogs(); fetchContacts(); generateTwilioToken()
  }, [configForm])

  // Enhanced error logging utility
  const logDetailedError = (context: string, error: any) => {
    console.group(`❌ ${context}`)
    console.error('Error object:', error)
    console.error('Error type:', typeof error)
    console.error('Error constructor:', error?.constructor?.name)
    console.error('Error code:', error?.code)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    
    // Log all enumerable properties
    if (error && typeof error === 'object') {
      console.error('All error properties:', Object.getOwnPropertyNames(error))
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          console.error(`  ${key}:`, error[key])
        }
      }
    }
    
    // Check for nested error information
    if (error?.details) console.error('Error details:', error.details)
    if (error?.cause) console.error('Error cause:', error.cause)
    if (error?.info) console.error('Error info:', error.info)
    
    console.groupEnd()
  }

  // WebSocket connection state monitoring
  const monitorWebSocketState = (device: any) => {
    if (device && device._stream && device._stream._transport) {
      const transport = device._stream._transport
      console.log('🔍 WebSocket state:', {
        readyState: transport.readyState,
        url: transport.url,
        protocol: transport.protocol,
        extensions: transport.extensions
      })
      
      // Monitor WebSocket events
      if (transport.addEventListener) {
        transport.addEventListener('open', () => {
          console.log('🟢 WebSocket connection opened')
        })
        
        transport.addEventListener('close', (event: any) => {
          console.log('🔴 WebSocket connection closed:', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          })
        })
        
        transport.addEventListener('error', (event: any) => {
          logDetailedError('WebSocket Error', event)
        })
      }
    }
  }

  // Initialize Twilio Device when token is available
  useEffect(() => {
    const maxRetries = 3
    const retryDelay = 2000 // 2 seconds

    const initializeTwilioDevice = async () => {
      if (twilioToken && !deviceRef.current) {
        try {
          console.log('🔄 Initializing Twilio Device...')
          setDeviceStatus('connecting')
          setDeviceError(null)
          
          // Validate token before initialization
          if (!twilioToken || twilioToken === 'mock_access_token_for_development') {
            if (twilioToken === 'mock_access_token_for_development') {
              console.log('🧪 Mock mode detected - simulating device ready state')
              setIsDeviceReady(true)
              setDeviceStatus('ready')
              return
            } else {
              throw new Error('Invalid or missing access token')
            }
          }
          
          // Load Twilio Client SDK
          const Twilio = await loadTwilioClient() as any
          
          // Create and setup Twilio Device with enhanced configuration
          const device = new Twilio.Device(twilioToken, {
            codecPreferences: ['opus', 'pcmu'],
            fakeLocalDTMF: true,
            enableRingingState: true,
            allowIncomingWhileBusy: false,
            closeProtection: false,
            // Enhanced audio configuration
            sounds: {
              incoming: false,
              outgoing: false,
              disconnect: false
            },
            // Add connection options for better reliability
            edge: 'sydney', // Use closest edge location
            debug: true, // Enable debug logging
            logLevel: 'debug'
          })

          // Monitor WebSocket connection
          setTimeout(() => monitorWebSocketState(device), 1000)

          // Setup device event handlers with enhanced error handling
          device.on('ready', () => {
              console.log('✅ Twilio Device ready for calls')
              console.log('📊 Device capabilities:', {
                canMakeOutgoingCalls: device.canMakeOutgoingCalls,
                canReceiveIncomingCalls: device.canReceiveIncomingCalls,
                identity: device.identity,
                edge: device.edge
              })
              setIsDeviceReady(true)
              setDeviceStatus('ready')
              setDeviceError(null)
              setRetryCount(0) // Reset retry count on success
            toast({
              title: 'Device Ready',
              description: 'Twilio device is ready for calls',
              variant: 'default',
            })
          })

          device.on('error', (error: any) => {
            logDetailedError('Twilio Device Error', error)
            setIsDeviceReady(false)
            setDeviceStatus('error')
            
            // Enhanced error handling with specific error codes and detailed analysis
            let errorMessage = 'Unknown device error'
            let errorCategory = 'unknown'
            
            if (error && typeof error === 'object') {
              // Handle different error structures
              const errorCode = error.code || error.errorCode || error.status
              const errorMsg = error.message || error.description || error.error
              
              if (errorCode) {
                errorCategory = 'coded_error'
                switch (errorCode) {
                  case 31205:
                    errorMessage = 'TwiML application configuration error. Please check your webhook URLs in the Twilio Console.'
                    break
                  case 31206:
                    errorMessage = 'Invalid access token. The token may be expired or malformed.'
                    break
                  case 31208:
                    errorMessage = 'WebSocket connection failed. Check your network connection and firewall settings.'
                    break
                  case 31209:
                    errorMessage = 'Signaling connection error. Verify your TwiML application setup and webhook accessibility.'
                    break
                  case 31301:
                    errorMessage = 'Microphone access denied. Please allow microphone permissions.'
                    break
                  case 31400:
                    errorMessage = 'Bad request. Check your Twilio configuration and credentials.'
                    break
                  case 31401:
                    errorMessage = 'Unauthorized. Verify your Twilio Account SID and API credentials.'
                    break
                  case 31403:
                    errorMessage = 'Forbidden. Check your Twilio account permissions and TwiML app configuration.'
                    break
                  case 31404:
                    errorMessage = 'TwiML application not found. Verify your TWILIO_TWIML_APP_SID.'
                    break
                  case 31500:
                    errorMessage = 'Internal server error. This may be a temporary Twilio service issue.'
                    break
                  default:
                    errorMessage = `Device error (${errorCode}): ${errorMsg || 'Unknown error'}`
                }
              } else if (errorMsg) {
                errorCategory = 'message_error'
                errorMessage = errorMsg
              } else if (Object.keys(error).length === 0) {
                errorCategory = 'empty_error'
                errorMessage = 'Empty error object received. This often indicates a WebSocket/signaling connection issue. Check your TwiML application webhook configuration.'
              } else {
                errorCategory = 'complex_error'
                errorMessage = `Complex error: ${JSON.stringify(error)}`
              }
            } else if (typeof error === 'string') {
              errorCategory = 'string_error'
              errorMessage = error
            }
            
            console.log(`🏷️ Error category: ${errorCategory}`)
            setDeviceError(errorMessage)

            toast({
              title: 'Device Error',
              description: errorMessage,
              variant: 'destructive',
            })

            // Retry logic with exponential backoff (only for certain error types)
            const retryableErrors = ['empty_error', 'WebSocket', 'signaling', 'network']
            const shouldRetry = retryableErrors.some(type => 
              errorCategory.includes(type) || errorMessage.toLowerCase().includes(type)
            )
            
            if (shouldRetry && retryCount < maxRetries) {
              setRetryCount(prev => prev + 1)
              setDeviceStatus('retrying')
              const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s
              console.log(`🔄 Retrying device initialization in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})...`)
              setTimeout(() => {
                if (deviceRef.current) {
                  deviceRef.current.destroy()
                  deviceRef.current = null
                  setDevice(null)
                }
                initializeTwilioDevice()
              }, delay)
            } else {
              console.error('❌ Max retry attempts reached or non-retryable error. Device initialization failed.')
              setDeviceStatus('failed')
            }
          })

          device.on('disconnect', (connection: any) => {
            console.log('📞 Call disconnected')
            if (connection) {
              logDetailedError('Disconnect Event', connection)
            }
            setCallStatus('ended')
            setIsCalling(false)
            stopRingingTone()
            cleanupAudioStreams()
          })

          device.on('incoming', (connection: any) => {
            console.log('📞 Incoming call received')
            console.log('📊 Incoming call details:', {
              callSid: connection.parameters.CallSid,
              from: connection.parameters.From,
              to: connection.parameters.To,
              direction: connection.parameters.Direction
            })
            // Handle incoming calls if needed
            toast({
              title: 'Incoming Call',
              description: `Call from ${connection.parameters.From}`,
              variant: 'default',
            })
          })

          // Additional event listeners for comprehensive monitoring
          device.on('connect', (connection: any) => {
            console.log('🔗 Call connected:', connection.parameters)
          })
          
          device.on('cancel', () => {
            console.log('❌ Call cancelled')
          })
          
          device.on('presence', (presenceEvent: any) => {
            console.log('👤 Presence event:', presenceEvent)
          })

          // Store device reference
          deviceRef.current = device
          setDevice(device)
          console.log('🚀 Twilio Device initialized successfully')

        } catch (error: any) {
          logDetailedError('Device Initialization Error', error)
          setIsDeviceReady(false)
          setDeviceStatus('error')
          
          let errorMessage = 'Could not initialize Twilio device for calling'
          if (error.message?.includes('TwiML')) {
            errorMessage = 'TwiML application not configured. Please check the setup guide.'
          } else if (error.message?.includes('token')) {
            errorMessage = 'Invalid access token. Please check your Twilio credentials.'
          }
          
          setDeviceError(`Initialization failed: ${error.message || 'Unknown error'}`)
          toast({
            title: 'Device Initialization Failed',
            description: errorMessage,
            variant: 'destructive',
          })

          // Attempt retry for network-related errors
          if (retryCount < maxRetries && error.message?.includes('network')) {
            setRetryCount(prev => prev + 1)
            console.log(`🔄 Retrying device initialization (${retryCount + 1}/${maxRetries})...`)
            setTimeout(initializeTwilioDevice, retryDelay * (retryCount + 1))
          }
        }
      }
    }

    if (twilioToken) {
      initializeTwilioDevice()
    }

    // Cleanup function
    return () => {
      if (deviceRef.current) {
        deviceRef.current.destroy()
        deviceRef.current = null
        setDevice(null)
        setIsDeviceReady(false)
      }
    }
  }, [twilioToken, toast])

  // JWT token validation utilities
  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }
      
      const payload = JSON.parse(atob(parts[1]))
      return payload
    } catch (error) {
      console.error('❌ Failed to decode JWT:', error)
      return null
    }
  }

  const validateToken = (token: string) => {
    if (!token || token === 'mock_access_token_for_development') {
      return { valid: token === 'mock_access_token_for_development', mock: true }
    }

    const payload = decodeJWT(token)
    if (!payload) {
      return { valid: false, error: 'Invalid token format' }
    }

    const now = Math.floor(Date.now() / 1000)
    const exp = payload.exp
    const iat = payload.iat
    const nbf = payload.nbf

    console.log('🔍 Token validation:', {
      issued: new Date(iat * 1000).toISOString(),
      expires: new Date(exp * 1000).toISOString(),
      notBefore: nbf ? new Date(nbf * 1000).toISOString() : 'N/A',
      currentTime: new Date(now * 1000).toISOString(),
      timeToExpiry: exp - now,
      identity: payload.sub || payload.identity,
      grants: payload.grants
    })

    if (exp && now >= exp) {
      return { valid: false, error: 'Token expired', expired: true }
    }

    if (nbf && now < nbf) {
      return { valid: false, error: 'Token not yet valid' }
    }

    // Check if token expires within 5 minutes (300 seconds)
    const expiresWithin5Min = exp && (exp - now) < 300

    return { 
      valid: true, 
      payload, 
      expiresWithin5Min,
      timeToExpiry: exp - now
    }
  }

  // Token refresh mechanism
  const refreshTokenIfNeeded = async (currentToken: string) => {
    const validation = validateToken(currentToken)
    
    if (!validation.valid || validation.expiresWithin5Min) {
      console.log('🔄 Token needs refresh:', validation.error || 'Expires soon')
      await generateTwilioToken()
      return true
    }
    
    return false
  }

  // Generate Twilio token for WebRTC with enhanced validation
  const generateTwilioToken = async () => {
    try {
      console.log('🔄 Generating Twilio access token...')
      
      const response = await fetch('/api/twilio/access-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: `user_${Date.now()}` })
      })
      
      if (response.ok) {
        const data = await response.json()
        
        // Check if we're in mock mode
        if (data.mock) {
          console.log('🧪 Twilio mock mode enabled - device will simulate ready state')
          setTwilioToken(data.accessToken)
          setIsDeviceReady(true) // Simulate device ready in mock mode
          setDeviceStatus('ready')
          setDeviceError(null)
          toast({
            title: 'Mock Mode Active',
            description: 'Twilio is running in mock mode for development',
            variant: 'default',
          })
          return
        }

        // Validate the received token
        const validation = validateToken(data.accessToken)
        if (!validation.valid) {
          throw new Error(`Invalid token received: ${validation.error}`)
        }

        console.log('✅ Twilio access token generated and validated successfully')
         if (validation.timeToExpiry) {
           console.log(`⏰ Token expires in ${Math.floor(validation.timeToExpiry / 60)} minutes`)
         }
         
         setTwilioToken(data.accessToken)
         
         // Set up automatic token refresh
         if (validation.timeToExpiry && validation.timeToExpiry > 300) { // If more than 5 minutes left
           const refreshTime = (validation.timeToExpiry - 300) * 1000 // Refresh 5 minutes before expiry
           console.log(`⏰ Scheduling token refresh in ${Math.floor(refreshTime / 60000)} minutes`)
           
           setTimeout(async () => {
             console.log('🔄 Auto-refreshing token...')
             await generateTwilioToken()
           }, refreshTime)
         }
        
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('❌ Failed to generate Twilio access token:', errorData.error)
        
        // Provide helpful error messages
        let description = errorData.error || 'Failed to generate Twilio access token'
        if (errorData.error?.includes('Missing Twilio configuration')) {
          description = 'Please check your .env.local file for Twilio credentials'
        }
        
        toast({
          title: 'Token Generation Failed',
          description,
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      console.error('❌ Error generating Twilio access token:', error)
      toast({
        title: 'Network Error',
        description: error.message || 'Could not connect to token service. Please check if the server is running.',
        variant: 'destructive',
      })
    }
  }

  // Load Twilio Client SDK dynamically
  const loadTwilioClient = () => {
    return new Promise((resolve, reject) => {
      if ((window as any).Twilio) {
        resolve((window as any).Twilio)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://sdk.twilio.com/js/client/v1.15/twilio.min.js'
      script.onload = () => {
        if ((window as any).Twilio) {
          resolve((window as any).Twilio)
        } else {
          reject(new Error('Twilio SDK loaded but not available'))
        }
      }
      script.onerror = () => reject(new Error('Failed to load Twilio SDK'))
      document.head.appendChild(script)
    })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRingingTone()
      stopCallStatusChecking()
      cleanupAudioStreams()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Audio stream management functions
  const setupAudioStreams = async () => {
    try {
      // Get user media for microphone
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }, 
        video: false 
      })
      
      localStreamRef.current = stream
      
      // Create audio elements for local and remote audio
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream
        localAudioRef.current.muted = true // Local audio should be muted to prevent feedback
      }
      
      // Setup audio level monitoring
      setupAudioLevelMonitoring(stream)
      
      console.log('Audio streams setup successfully')
    } catch (error) {
      console.error('Failed to setup audio streams:', error)
      throw new Error('Could not access microphone. Please check permissions.')
    }
  }

  const setupAudioLevelMonitoring = (stream: MediaStream) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    
    const source = audioContextRef.current.createMediaStreamSource(stream)
    const analyser = audioContextRef.current.createAnalyser()
    analyser.fftSize = 256
    
    source.connect(analyser)
    analyserRef.current = analyser
    
    // Monitor audio levels
    const monitorAudio = () => {
      if (!analyserRef.current) return
      
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(dataArray)
      
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length
      setAudioLevel(average / 255) // Normalize to 0-1
      
      if (callStatus === 'connected') {
        requestAnimationFrame(monitorAudio)
      }
    }
    
    monitorAudio()
  }

  const cleanupAudioStreams = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop())
      localStreamRef.current = null
    }
    
    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach(track => track.stop())
      remoteStreamRef.current = null
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }
    
    if (dataChannelRef.current) {
      dataChannelRef.current.close()
      dataChannelRef.current = null
    }
    
    setAudioLevel(0)
  }

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsMuted(!audioTrack.enabled)
      }
    }
  }

  const toggleSpeaker = () => {
    if (remoteAudioRef.current) {
      remoteAudioRef.current.muted = !remoteAudioRef.current.muted
      setIsSpeakerOn(!remoteAudioRef.current.muted)
    }
  }

  // Enhanced makeCall function with Twilio WebRTC
  const makeCall = async (phoneNumber: string) => {
    try {
      // Validate phone number
      if (!phoneNumber || !/^\+?[\d\s\-\(\)]+$/.test(phoneNumber)) {
        throw new Error('Invalid phone number format')
      }
      
      setCallStatus('dialing')
      setCurrentPhone(phoneNumber)
      
      // Setup audio streams first
      await setupAudioStreams()
      
      // Try Twilio WebRTC first if we have a token and device is ready
      if (twilioToken && deviceRef.current && isDeviceReady) {
        try {
          console.log('Attempting Twilio WebRTC call...')
          
          const params = {
            To: phoneNumber,
            From: twilioConfig?.phoneNumber || '+1234567890'
          }
          
          const connection = await deviceRef.current.connect({ params })
          currentConnectionRef.current = connection
          
          // Setup connection event handlers
          connection.on('accept', () => {
            console.log('Twilio call connected')
            setCallStatus('connected')
            setCurrentCallSid(connection.parameters.CallSid)
            
            // Setup remote audio stream for Twilio
            if (remoteAudioRef.current && connection.getRemoteStream) {
              const remoteStream = connection.getRemoteStream()
              if (remoteStream) {
                remoteAudioRef.current.srcObject = remoteStream
                remoteStreamRef.current = remoteStream
                console.log('Remote audio stream connected')
              }
            }
          })
          
          connection.on('disconnect', () => {
            console.log('Twilio call disconnected')
            endCall()
          })
          
          connection.on('error', (error: any) => {
            console.error('Twilio call error:', error)
            toast({
              title: 'Call Error',
              description: error.message || 'Call failed',
              variant: 'destructive',
            })
            endCall()
          })
          
          // Handle audio streams for Twilio connection
          connection.on('volume', (inputVolume: number, outputVolume: number) => {
            setAudioLevel(inputVolume)
          })
          
          // Additional event for audio stream setup
          connection.on('sample', () => {
            // This event fires when audio samples are being transmitted
            if (remoteAudioRef.current && !remoteAudioRef.current.srcObject) {
              // Try to get the remote stream again
              const remoteStream = connection.getRemoteStream?.() || connection.mediaStream
              if (remoteStream) {
                remoteAudioRef.current.srcObject = remoteStream
                remoteStreamRef.current = remoteStream
                console.log('Remote audio stream connected via sample event')
              }
            }
          })
          
          // Set up audio output device for Twilio
          if (deviceRef.current && deviceRef.current.audio) {
            deviceRef.current.audio.speakerDevices.set('default')
          }
          
          console.log('Twilio call initiated successfully')
          return // Success, exit function
          
        } catch (twilioError: any) {
          console.error('Twilio WebRTC failed, falling back to standard WebRTC:', twilioError)
          toast({
            title: 'Twilio Connection Failed',
            description: 'Falling back to standard WebRTC',
            variant: 'default',
          })
          // Continue to fallback WebRTC
        }
      }
      
      // Fallback to standard WebRTC
      console.log('Falling back to standard WebRTC...')
      await makeCallWebRTC(phoneNumber)
      
    } catch (error: any) {
      console.error('Call failed:', error)
      toast({
        title: 'Call Failed',
        description: error.message || 'Could not initiate call',
        variant: 'destructive',
      })
      endCall()
    }
  }
  
  // Traditional Twilio call implementation
  const makeCallWebRTC = async (phoneNumber: string) => {
    try {
      
      // Send call request to backend
      const response = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          to: phoneNumber,
          from: twilioConfig?.phoneNumber
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to initiate call')
      }
      
      const data = await response.json()
      
      // Handle traditional Twilio response
      setIsInCall(true)
      setIsConnecting(false)
      setCallStatus('connected')
      setCurrentCallSid(data.sid)
      
      // Add call to call logs
      const newCallLog: CallLog = {
        id: Date.now(),
        callSid: data.sid,
        fromNumber: twilioConfig?.phoneNumber || '',
        toNumber: phoneNumber,
        status: 'connected',
        startedAt: new Date(),
        createdAt: new Date()
      }
      setCallLogs(prev => [newCallLog, ...prev])
      
    } catch (error: any) {
      console.error('Call failed:', error)
      toast({
        title: 'Call Failed',
        description: error.message || 'Could not initiate call',
        variant: 'destructive',
      })
      setCallStatus('ended')
      setIsConnecting(false)
    }
  }

  const onDial = async (values: z.infer<typeof dialSchema>) => {
    if (!twilioConfig) {
      toast({
        title: 'Configuration Required',
        description: 'Please configure Twilio settings first',
        variant: 'destructive',
      })
      return
    }
    
    // Initialize audio context on first dial (async)
    await initAudioContext()
    
    setIsCalling(true)
    setCallStatus('dialing')
    
    console.log('Starting call to:', values.phoneNumber)
    console.log('Using Twilio config:', twilioConfig)
    
    try {
      // Setup audio streams for two-way communication
      await setupAudioStreams()
      
      // Use the new makeCall function
      await makeCall(values.phoneNumber)
      
      // Start ringing tone and status checking
      await playRingingTone('ringing')
      
      console.log('Audio streams ready for two-way communication')
    } catch (e) {
      console.error('Dial error:', e)
      setCallStatus('ended')
      stopRingingTone()
      cleanupAudioStreams()
      toast({
        title: 'Call Failed',
        description: e instanceof Error ? e.message : 'Failed to make call. Please check your Twilio configuration.',
        variant: 'destructive',
      })
    } finally {
      setIsCalling(false)
    }
  }

  const onConfigSubmit = async (values: z.infer<typeof twilioConfigSchema>) => {
    try {
      const response = await fetch('/api/twilio/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountSid: values.accountSid, authToken: values.authToken, phoneNumber: values.phoneNumber, isActive: true }),
      })
      if (response.ok) {
        const config = await response.json()
        setTwilioConfig(config)
        toast({
          title: 'Configuration Saved',
          description: 'Twilio configuration saved successfully!',
        })
      } else throw new Error('Failed to save configuration')
    } catch (e) {
      toast({
        title: 'Configuration Error',
        description: 'Failed to save configuration. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const endCall = async () => {
    try {
      // Disconnect Twilio connection if exists
      if (currentConnectionRef.current) {
        currentConnectionRef.current.disconnect()
        currentConnectionRef.current = null
      }
      
      // Stop audio streams
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop())
        localStreamRef.current = null
      }
      
      // Clean up remote audio
      if (remoteStreamRef.current) {
        remoteStreamRef.current.getTracks().forEach(track => track.stop())
        remoteStreamRef.current = null
      }
      
      // Clear audio element sources
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = null
      }
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = null
      }
      
      // Close peer connection
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
        peerConnectionRef.current = null
      }
      
      // Stop ringing tone
      stopRingingTone()
      
      // Update call status if we have a call SID
      if (currentCallSid) {
        try {
          const response = await fetch(`/api/call/${currentCallSid}`, { method: 'DELETE' })
          if (!response.ok) {
            console.warn('Failed to end call via API:', response.status, response.statusText)
          }
        } catch (error) {
          console.warn('Error ending call via API:', error)
          // Don't throw - we still want to clean up the UI state
        }
      }
      
      // Reset state
      setCallStatus('ended')
      setCurrentCallSid(null)
      setIsMuted(false)
      setIsSpeakerOn(true)
      setAudioLevel(0)
      
      // Clean up remote audio
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = null
      }
      
    } catch (error) {
      console.error('Error ending call:', error)
      setCallStatus('ended')
      stopRingingTone()
      stopCallStatusChecking()
      cleanupAudioStreams()
      setCurrentCallSid(null)
      setIsMuted(false)
      setIsSpeakerOn(true)
      setAudioLevel(0)
    }
  }

  const appendChar = async (ch: string) => {
    await initAudioContext() // Initialize audio context on first interaction
    playDTMFTone(ch) // Play DTMF tone for the pressed key
    
    const current = dialForm.getValues('phoneNumber') || ''
    if (ch === '+') {
      if (!current.startsWith('+')) dialForm.setValue('phoneNumber', `+${current}`)
      return
    }
    const next = `${current}${ch}`
    dialForm.setValue('phoneNumber', next)
  }

  const backspace = () => {
    const current = dialForm.getValues('phoneNumber') || ''
    if (current.length === 0) return
    dialForm.setValue('phoneNumber', current.slice(0, -1))
  }

  return (
    <div className="p-2 sm:p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Twilio Dialing System</h2>
      <Tabs defaultValue="dialer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dialer" className="flex items-center gap-2"><Phone className="h-4 w-4" />Dialer</TabsTrigger>
          <TabsTrigger value="api-config" className="flex items-center gap-2"><Settings className="h-4 w-4" />API Config</TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2"><History className="h-4 w-4" />Call History</TabsTrigger>
        </TabsList>

        <TabsContent value="dialer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Dial a Number
                <div className={`flex items-center gap-2 text-sm ${
                  deviceStatus === 'ready' ? 'text-green-600' : 
                  deviceStatus === 'error' ? 'text-red-600' : 
                  deviceStatus === 'retrying' ? 'text-yellow-600' : 
                  'text-orange-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    deviceStatus === 'ready' ? 'bg-green-500 animate-pulse' : 
                    deviceStatus === 'error' ? 'bg-red-500' : 
                    deviceStatus === 'retrying' ? 'bg-yellow-500 animate-spin' : 
                    'bg-orange-500 animate-pulse'
                  }`}></div>
                  {deviceStatus === 'ready' ? 'Device Ready' : 
                   deviceStatus === 'error' ? `Error: ${deviceError}` : 
                   deviceStatus === 'retrying' ? `Retrying... (${retryCount}/3)` : 
                   deviceStatus === 'connecting' ? 'Connecting...' : 
                   'Initializing...'}
                </div>
              </CardTitle>
              <CardDescription>Enter a phone number to make a call</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...dialForm}>
                <form onSubmit={dialForm.handleSubmit(onDial)} className="space-y-4">
                  <FormField
                    control={dialForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormDescription>Include country code (e.g., +1 for US)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-3 max-w-sm">
                    {['1','2','3','4','5','6','7','8','9','*','0','#'].map((d) => (
                      <Button key={d} type="button" variant="outline" className="h-14 text-lg rounded-full" onClick={async () => await appendChar(d)}>
                        {d}
                      </Button>
                    ))}
                    <Button type="button" variant="outline" className="h-14 text-lg rounded-full" onClick={async () => await appendChar('+')}>+</Button>
                    <Button 
                      type="submit" 
                      disabled={isCalling || callStatus === 'connected' || !isDeviceReady} 
                      className="h-14 text-lg rounded-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                      title={!isDeviceReady ? 'Device is initializing...' : 'Make a call'}
                    >
                      <Phone className="h-5 w-5 mr-1" />
                      {!isDeviceReady ? 'Initializing...' : 'Call'}
                    </Button>
                    <Button type="button" variant="outline" className="h-14 text-lg rounded-full" onClick={backspace}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  {(callStatus === 'dialing' || callStatus === 'connected') && (
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="destructive" 
                        onClick={endCall} 
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 text-lg"
                      >
                        <PhoneMissed className="h-5 w-5" />
                        {callStatus === 'dialing' ? 'Cancel Call' : 'End Call'}
                      </Button>
                    </div>
                  )}
                  {callStatus !== 'idle' && (
                    <div className={`mt-4 p-4 rounded-lg border-2 ${
                      callStatus === 'connected' ? 'bg-green-50 border-green-200 text-green-800' :
                      callStatus === 'dialing' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                      callStatus === 'ended' ? 'bg-gray-50 border-gray-200 text-gray-800' :
                      callStatus === 'busy' ? 'bg-red-50 border-red-200 text-red-800' :
                      'bg-yellow-50 border-yellow-200 text-yellow-800'
                    }`}>
                      <div className="flex items-center gap-2">
                        {callStatus === 'dialing' && <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>}
                        {callStatus === 'connected' && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                        {callStatus === 'busy' && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                        <p className="font-semibold capitalize">{callStatus.replace('-', ' ')}</p>
                      </div>
                      {callStatus === 'connected' && (<p className="text-sm mt-1">✅ Call connected - you should hear the other party</p>)}
                      {callStatus === 'dialing' && (<p className="text-sm mt-1">📞 Ringing... waiting for the other party to answer</p>)}
                      {callStatus === 'busy' && (<p className="text-sm mt-1">❌ Line is busy - the other party may be on another call</p>)}
                      {callStatus === 'ended' && (<p className="text-sm mt-1">📴 Call has ended</p>)}
                      
                      {/* Audio Controls - Only show when connected */}
                      {callStatus === 'connected' && (
                        <div className="mt-4 flex items-center gap-2 flex-wrap">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={toggleMute}
                            className={`${isMuted ? 'bg-red-100 border-red-300 text-red-800' : 'bg-white'}`}
                          >
                            {isMuted ? <MicOff className="h-4 w-4 mr-1" /> : <Mic className="h-4 w-4 mr-1" />}
                            {isMuted ? 'Unmute' : 'Mute'}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={toggleSpeaker}
                            className={`${!isSpeakerOn ? 'bg-red-100 border-red-300 text-red-800' : 'bg-white'}`}
                          >
                            {isSpeakerOn ? <Volume2 className="h-4 w-4 mr-1" /> : <VolumeX className="h-4 w-4 mr-1" />}
                            {isSpeakerOn ? 'Speaker On' : 'Speaker Off'}
                          </Button>
                          {audioLevel > 0 && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              Audio Active
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
              <CardDescription>Your saved contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => { dialForm.setValue('phoneNumber', contact.phoneNumber); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Call</Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No contacts found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Twilio API Configuration</CardTitle>
              <CardDescription>Configure your Twilio account settings to enable calling functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...configForm}>
                <form onSubmit={configForm.handleSubmit(onConfigSubmit)} className="space-y-4">
                  <FormField control={configForm.control} name="accountSid" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account SID</FormLabel>
                      <FormControl><Input placeholder="Enter your Twilio Account SID" {...field} /></FormControl>
                      <FormDescription>Found in your Twilio Console dashboard</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={configForm.control} name="authToken" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Auth Token</FormLabel>
                      <FormControl><Input type="password" placeholder="Enter your Twilio Auth Token" {...field} /></FormControl>
                      <FormDescription>Found in your Twilio Console dashboard</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={configForm.control} name="phoneNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twilio Phone Number</FormLabel>
                      <FormControl><Input placeholder="Enter your Twilio phone number" {...field} /></FormControl>
                      <FormDescription>The Twilio phone number you'll be calling from</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit">Save Configuration</Button>
                </form>
              </Form>
              {twilioConfig && (
                <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
                  <h3 className="font-medium text-green-800">Configuration Status</h3>
                  <p className="text-sm text-green-700">Twilio is {twilioConfig.isActive ? 'connected and ready' : 'configured but inactive'}.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
              <CardDescription>How to get your Twilio credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ol className="list-decimal pl-5 space-y-2">
                <li>Sign up for a Twilio account at <a href="https://www.twilio.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">twilio.com</a></li>
                <li>Navigate to your Console Dashboard</li>
                <li>Copy your Account SID and Auth Token</li>
                <li>Purchase a Twilio phone number if you don't have one</li>
                <li>Enter the credentials above and save your configuration</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call History</CardTitle>
              <CardDescription>Recent calls made through the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {callLogs.length > 0 ? (
                  callLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{log.toNumber}</p>
                        <p className="text-sm text-gray-600">{new Date(log.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${log.status === 'connected' ? 'bg-green-100 text-green-800' : log.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{log.status}</span>
                        {log.duration && (<span className="text-sm text-gray-600">{log.duration}s</span>)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No call history found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Hidden audio elements for WebRTC */}
      <audio 
        ref={localAudioRef} 
        autoPlay 
        muted 
        style={{ display: 'none' }}
      />
      <audio 
        ref={remoteAudioRef} 
        autoPlay 
        style={{ display: 'none' }}
      />
    </div>
  )
}


