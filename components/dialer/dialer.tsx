'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, PhoneMissed, X, Settings, User, History, Key, CheckCircle, AlertCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useToast } from '@/components/ui/use-toast'

// Import Twilio Voice SDK
import { Device, Call } from '@twilio/voice-sdk'

// Type definitions
interface CallLog {
  id: number
  call_sid: string
  from_number: string
  to_number: string
  status: 'queued' | 'ringing' | 'in-progress' | 'completed' | 'busy' | 'failed' | 'no-answer' | 'canceled' | 'connected'
  duration?: number
  started_at?: string
  ended_at?: string
  created_at: string
}

interface CallRecording {
  id: number
  call_log_id: number
  recording_url: string
  recording_sid?: string
  duration?: number
  file_size?: number
  format: string
  consent_given: boolean
  consent_timestamp?: string
  storage_location?: string
  is_processed: boolean
  created_at: string
  updated_at: string
  call_logs?: CallLog
}

interface CallRecording {
  id: number
  call_log_id: number
  recording_url: string
  recording_sid?: string
  duration?: number
  file_size?: number
  format: string
  consent_given: boolean
  consent_timestamp?: string
  storage_location?: string
  is_processed: boolean
  created_at: string
  updated_at: string
  call_logs?: CallLog
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

interface _TwilioConfig {
  id: number
  accountSid: string
  phoneNumber: string
  isActive: boolean
  projectUrl?: string
  createdAt: Date
  updatedAt: Date
}

const dialSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  recordingConsent: z.boolean().default(false),
})

const twilioConfigSchema = z.object({
  accountSid: z.string().min(1, 'Account SID is required'),
  authToken: z.string().min(1, 'Auth token is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  apiKeySid: z.string().min(1, 'API Key SID is required'),
  apiKeySecret: z.string().min(1, 'API Key Secret is required'),
  twimlAppSid: z.string().min(1, 'TwiML App SID is required'),
})

type CallStatusType = 'idle' | 'dialing' | 'ringing' | 'connected' | 'ended'

export default function Dialer() {
  const [isCalling, setIsCalling] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatusType>('idle')
  const [twilioConfig, setTwilioConfig] = useState<{
    accountSid: string
    authToken: string
    phoneNumber: string
    apiKeySid: string
    apiKeySecret: string
    twimlAppSid: string
    isActive?: boolean
  } | null>(null)
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentCallSid, setCurrentCallSid] = useState<string | null>(null)
  const [callRecordings, setCallRecordings] = useState<CallRecording[]>([])
  const [_recordingConsent, _setRecordingConsent] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const { toast } = useToast()
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false)
  const [isRecordingsCollapsed, setIsRecordingsCollapsed] = useState(false)
  // Last refresh indicators for logs and recordings
  const [lastLogsRefresh, setLastLogsRefresh] = useState<Date | null>(null)
  const [lastRecordingsRefresh, setLastRecordingsRefresh] = useState<Date | null>(null)

  // Twilio Device Manager State
  const [device, setDevice] = useState<Device | null>(null)
  const [deviceState, setDeviceState] = useState<{
    status: 'initializing' | 'ready' | 'connecting' | 'error' | 'offline'
    isReady: boolean
    error?: string
  }>({
    status: 'offline',
    isReady: false
  })
  const [currentCall, setCurrentCall] = useState<Call | null>(null)
  const [audioContextInitialized, setAudioContextInitialized] = useState(false)

  const deviceRef = useRef<Device | null>(null)

  const dialForm = useForm<z.infer<typeof dialSchema>>({
    resolver: zodResolver(dialSchema),
    defaultValues: {
      phoneNumber: '',
      recordingConsent: true,
    },
  })

  const configForm = useForm<z.infer<typeof twilioConfigSchema>>({
    resolver: zodResolver(twilioConfigSchema),
    defaultValues: {
      accountSid: '',
      authToken: '',
      phoneNumber: '',
    },
  })

  // Helpers for recording playback via public proxy
  const getRecordingSid = (recording: CallRecording): string | null => {
    if (recording.recording_sid) return recording.recording_sid
    const url = recording.recording_url || ''
    const regexMatch = url.match(/Recordings\/([A-Za-z0-9]+)\.mp3/i)
    if (regexMatch && regexMatch[1]) return regexMatch[1]
    const last = url.split('/').pop()
    return last ? last.replace('.mp3', '') : null
  }

  const getPlaybackUrl = (recording: CallRecording): string => {
    const sid = getRecordingSid(recording)
    // Use our proxy endpoint if SID can be derived (no login required)
    if (sid) return `/api/recordings/${sid}`
    // Fallback to original URL if no SID available
    return recording.recording_url
  }

  const playRecording = (recording: CallRecording) => {
    const url = getPlaybackUrl(recording)
    const audio = new Audio(url)
    // Attempt inline playback; if blocked, open in new tab as fallback
    audio.play().catch(() => {
      window.open(url, '_blank')
    })
  }

  // Initialize Audio Context (required for WebRTC)
  const initializeAudioContext = async () => {
    try {
      const audioContext = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
      await audioContext.resume()

      console.log('✅ Audio context initialized successfully')

      toast({
        title: "Audio Enabled",
        description: "Browser audio permissions granted. Initializing device...",
      })

      // Set audio context as initialized and immediately initialize device
      // Don't rely on state update timing - call initializeDevice directly
      setAudioContextInitialized(true)

      // Call initializeDevice with a flag to bypass the audio check
      setTimeout(() => {
        initializeDeviceWithAudio()
      }, 100) // Very short delay to ensure state update

      return true
    } catch (_error) {
      console.error('Failed to initialize audio context:', _error)
      toast({
        title: "Audio Error",
        description: "Failed to enable browser audio. Please check permissions.",
        variant: "destructive"
      })
      return false
    }
  }

  // Fetch Access Token from your backend
  const fetchAccessToken = async (): Promise<string | null> => {
    try {
      const response = await fetch('/api/twilio/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.token
    } catch (error) {
      console.error('Error fetching access token:', error)
      toast({
        title: "Token Error",
        description: "Failed to get Twilio access token. Check your configuration.",
        variant: "destructive"
      })
      return null
    }
  }

  // Initialize Twilio Device
  const initializeDeviceWithAudio = async () => {
    console.log('🔄 Starting device initialization with audio context ready...')

    try {
      console.log('📱 Setting device state to initializing...')
      setDeviceState({ status: 'initializing', isReady: false })

      console.log('🔑 Fetching access token...')
      const token = await fetchAccessToken()
      console.log('🔑 Token received:', token ? 'Yes' : 'No')

      if (!token) {
        console.log('❌ No token received')
        setDeviceState({
          status: 'error',
          isReady: false,
          error: 'Failed to get access token'
        })
        return
      }

      // Clean up existing device
      if (deviceRef.current) {
        console.log('🧹 Cleaning up existing device...')
        try {
          deviceRef.current.destroy()
        } catch (e) {
          console.log('⚠️ Error cleaning up device:', e)
        }
        deviceRef.current = null
        setDevice(null)
      }

      console.log('🆕 Creating new Twilio Device...')
      // Create new device
      const newDevice = new Device(token, {
        logLevel: 'debug',
      })

      console.log('📡 Setting up device event listeners BEFORE registration...')

      // Add timeout for device ready
      const readyTimeout = setTimeout(() => {
        console.log('⏰ Device ready timeout after 10 seconds')
        setDeviceState({
          status: 'error',
          isReady: false,
          error: 'Device initialization timeout - check TwiML App configuration'
        })
      }, 10000)

      // Set up ALL event listeners BEFORE registration
      newDevice.on('ready', () => {
        console.log('✅ Twilio Device is ready for connections!')
        clearTimeout(readyTimeout)

        setDeviceState({ status: 'ready', isReady: true })
        setDevice(newDevice)
        deviceRef.current = newDevice

        console.log('🎉 Device state updated to ready!')

        toast({
          title: "Device Ready! 🎉",
          description: "Twilio device is ready to make calls.",
        })
      })

      newDevice.on('error', (error) => {
        console.error('❌ Twilio Device error:', error)
        clearTimeout(readyTimeout)

        setDeviceState({
          status: 'error',
          isReady: false,
          error: error.message
        })
        toast({
          title: "Device Error",
          description: error.message,
          variant: "destructive"
        })
      })

      newDevice.on('offline', () => {
        console.log('📴 Device went offline')
        setDeviceState({
          status: 'offline',
          isReady: false,
          error: 'Device is offline'
        })
      })

      newDevice.on('registered', () => {
        console.log('🎯 Device registered event fired!')
        console.log('🔄 Immediately setting device to ready state')

        clearTimeout(readyTimeout)
        setDeviceState({ status: 'ready', isReady: true })
        setDevice(newDevice)
        deviceRef.current = newDevice

        toast({
          title: "Device Ready! 🎉",
          description: "Device registered and ready for calls.",
        })
      })

      newDevice.on('incoming', (call) => {
        console.log('📞 Incoming call:', call)
      })

      newDevice.on('tokenWillExpire', async () => {
        console.log('⏰ Token will expire, refreshing...')
        const newToken = await fetchAccessToken()
        if (newToken && deviceRef.current) {
          deviceRef.current.updateToken(newToken)
        }
      })

      console.log('🔗 Registering device with Twilio...')
      // Register the device AFTER setting up event listeners
      await newDevice.register()
      console.log('📋 Device registration complete!')

      // Force check if device is ready after 2 seconds
      setTimeout(() => {
        if (deviceState.status === 'initializing') {
          console.log('🚀 Force checking device readiness...')
          // Check if WebSocket is connected and device is registered
          if (newDevice.state === 'registered') {
            console.log('✅ Device appears to be ready, updating state')
            clearTimeout(readyTimeout)
            setDeviceState({ status: 'ready', isReady: true })
            setDevice(newDevice)
            deviceRef.current = newDevice

            toast({
              title: "Device Ready! 🎉",
              description: "Device is ready to make calls.",
            })
          }
        }
      }, 2000)

    } catch (error) {
      console.error('💥 Error initializing device:', error)
      setDeviceState({
        status: 'error',
        isReady: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      toast({
        title: "Initialization Error",
        description: "Failed to initialize Twilio device. Check console for details.",
        variant: "destructive"
      })
    }
  }

  // Keep the original initializeDevice for manual retry
  const initializeDevice = async () => {
    console.log('🔄 Starting device initialization...')
    console.log('Audio context initialized:', audioContextInitialized)

    if (!audioContextInitialized) {
      toast({
        title: "Audio Required",
        description: "Please enable audio first by clicking the 'Enable Audio' button.",
        variant: "destructive"
      })
      return
    }

    // Call the same function but with audio context check
    await initializeDeviceWithAudio()
  }

  // Make a call
  const makeCall = async (phoneNumber: string, recordingConsent: boolean) => {
    if (!device || !deviceState.isReady) {
      toast({
        title: "Device Not Ready",
        description: "Please wait for the device to be ready or try reinitializing.",
        variant: "destructive"
      })
      return
    }

    try {
      setIsCalling(true)
      setCallStatus('dialing')

      // Call parameters
      const params = {
        To: phoneNumber,
        Record: recordingConsent.toString(),
      }

      console.log('Making call with params:', params)

      const call = await device.connect({ params })
      setCurrentCall(call)

      // Call event listeners
      call.on('accept', () => {
        console.log('Call accepted')
        setCallStatus('connected')
        setIsCalling(false)
        setCurrentCallSid(call.parameters.CallSid || 'unknown')
        toast({
          title: "Call Connected",
          description: `Connected to ${phoneNumber}`,
        })
      })

      call.on('disconnect', () => {
        console.log('Call disconnected')
        setCallStatus('ended')
        setCurrentCall(null)
        setCurrentCallSid(null)
        setIsCalling(false)

        // Refresh data after call ends (wait a bit for webhooks to process)
        setTimeout(() => {
          fetchCallLogs()
          fetchCallRecordings()
        }, 3000) // Wait 3 seconds for webhooks to complete

        toast({
          title: "Call Ended",
          description: "The call has been disconnected.",
        })

        // Reset to idle after a brief delay
        setTimeout(() => {
          setCallStatus('idle')
        }, 2000)
      })

      call.on('error', (error) => {
        console.error('Call error:', error)
        setCallStatus('ended')
        setCurrentCall(null)
        setIsCalling(false)
        toast({
          title: "Call Error",
          description: error.message,
          variant: "destructive"
        })
      })

      call.on('ringing', () => {
        console.log('Call is ringing')
        setCallStatus('ringing')
      })

    } catch (error) {
      console.error('Error making call:', error)
      setCallStatus('idle')
      setIsCalling(false)
      toast({
        title: "Call Failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive"
      })
    }
  }

  // End current call
  const endCall = () => {
    if (currentCall) {
      currentCall.disconnect()
    }
  }

  // Form submit handler
  const onDial = async (data: z.infer<typeof dialSchema>) => {
    console.log('🎯 Form submitted with data:', data)
    console.log('📱 Device state:', deviceState)
    console.log('🔊 Device instance:', device)
    console.log('📞 Current call status:', callStatus)

    await makeCall(data.phoneNumber, data.recordingConsent)
  }

  // Fetch functions
  useEffect(() => {
    fetchTwilioConfig()
    fetchCallLogs()
    fetchContacts()
    fetchCallRecordings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh call logs and recordings periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCallLogs()
      fetchCallRecordings()
    }, 10000) // refresh every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchTwilioConfig = async () => {
    try {
      const response = await fetch('/api/twilio/config')
      if (response.ok) {
        const config = await response.json()
        setTwilioConfig(config)
        if (config) {
          configForm.reset({
            accountSid: config.accountSid,
            authToken: '', // Don't populate auth token for security
            phoneNumber: config.phoneNumber,
          })
        }
      }
    } catch (error) {
      console.error('Error fetching Twilio config:', error)
    }
  }

  const fetchCallLogs = async () => {
    try {
      const response = await fetch('/api/call-logs')
      if (response.ok) {
        const logs = await response.json()
        setCallLogs(logs)
        setLastLogsRefresh(new Date())
      }
    } catch (error) {
      console.error('Error fetching call logs:', error)
    }
  }

  const fetchCallRecordings = async () => {
    try {
      const response = await fetch('/api/call-recordings')
      if (response.ok) {
        const recordings = await response.json()
        setCallRecordings(recordings)
        setLastRecordingsRefresh(new Date())
      }
    } catch (error) {
      console.error('Error fetching call recordings:', error)
    }
  }

  const syncRecordings = async () => {
    setIsSyncing(true)
    try {
      toast({
        title: "Syncing Recordings",
        description: "Fetching recordings from Twilio...",
      })

      const response = await fetch('/api/call-recordings/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit: 50 // Sync last 50 recordings
        })
      })

      if (response.ok) {
        const result = await response.json()
        
        if (result.success) {
          toast({
            title: "Sync Complete",
            description: result.message,
          })
          
          // Refresh the recordings list
          await fetchCallRecordings()
        } else {
          toast({
            title: "Sync Failed",
            description: result.error || "Failed to sync recordings",
            variant: "destructive"
          })
        }
      } else {
        const errorData = await response.json()
        toast({
          title: "Sync Failed",
          description: errorData.error || "Failed to sync recordings",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error syncing recordings:', error)
      toast({
        title: "Sync Error",
        description: "An error occurred while syncing recordings",
        variant: "destructive"
      })
    } finally {
      setIsSyncing(false)
    }
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts')
      if (response.ok) {
        const contactsData = await response.json()
        setContacts(contactsData)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  // Config form submit handler
  const onConfigSubmit = async (data: z.infer<typeof twilioConfigSchema>) => {
    try {
      const response = await fetch('/api/twilio/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Configuration Saved",
          description: "Twilio configuration has been saved successfully.",
        })
        fetchTwilioConfig()
      } else {
        throw new Error('Failed to save configuration')
      }
    } catch (_error) {
      toast({
        title: "Save Error",
        description: "Failed to save Twilio configuration.",
        variant: "destructive"
      })
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (deviceRef.current) {
        deviceRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="p-2 sm:p-4 w-full">
      {/* Device Status Indicator */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Twilio Dialing System</h2>

        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${deviceState.status === 'ready' ? 'bg-green-500' :
            deviceState.status === 'connecting' || deviceState.status === 'initializing' ? 'bg-yellow-500' :
              deviceState.status === 'error' ? 'bg-red-500' :
                'bg-gray-500'
            }`} />
          <span className="text-sm font-medium">
            Device: {deviceState.status}
          </span>
        </div>
      </div>

      {/* Control Panel - Hide when device is ready */}
      {deviceState.status !== 'ready' && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">🎧 Device Controls</h3>
          <div className="flex gap-2 flex-wrap">
            {!audioContextInitialized && deviceState.status !== 'initializing' && (
              <Button
                onClick={initializeAudioContext}
                variant="default"
                size="sm"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow-md transition"
              >
                <span role="img" aria-label="Enable Audio">🔊</span>
                <span>Enable Audio</span>
              </Button>
            )}

            {/* Show manual initialize button only if audio is ready but device failed to initialize */}
            {audioContextInitialized && deviceState.status === 'error' && (
              <Button
                onClick={initializeDevice}
                variant="outline"
                size="sm"
              >
                🔄 Retry Device Initialization
              </Button>
            )}

            {/* Show status when initializing */}
            {deviceState.status === 'initializing' && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-blue-700 font-medium">Initializing device...</span>
              </div>
            )}

            {/* Show offline status */}
            {deviceState.status === 'offline' && audioContextInitialized && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Device offline</span>
                <Button
                  onClick={initializeDevice}
                  variant="outline"
                  size="sm"
                  className="ml-2"
                >
                  🔄 Reconnect
                </Button>
              </div>
            )}

            {deviceState.error && (
              <div className="text-sm text-red-600 mt-2 p-2 bg-red-50 border border-red-200 rounded">
                <strong>Error:</strong> {deviceState.error}
              </div>
            )}
          </div>

          {/* Progress indicator */}
          {deviceState.status === 'initializing' && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-blue-600 mt-1">Setting up Twilio connection...</p>
            </div>
          )}
        </div>
      )}

      <Tabs defaultValue="dialer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dialer" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />Dialer
          </TabsTrigger>
          <TabsTrigger value="api-config" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />API Config
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />Call History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dialer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dial a Number</CardTitle>
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
                          <Input placeholder="Enter phone number (e.g. +18004321000)" {...field} />
                        </FormControl>
                        <FormDescription>Include country code (e.g., +1 for US)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dialpad UI */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                        <Button
                          key={digit}
                          type="button"
                          variant="outline"
                          className="h-14 text-lg rounded-full hover:bg-gray-100"
                          onClick={() => {
                            const currentValue = dialForm.getValues('phoneNumber')
                            dialForm.setValue('phoneNumber', currentValue + digit)
                          }}
                        >
                          {digit}
                        </Button>
                      ))}

                      {/* Plus button */}
                      <Button
                        type="button"
                        variant="outline"
                        className="h-14 text-lg rounded-full hover:bg-gray-100"
                        onClick={() => {
                          const currentValue = dialForm.getValues('phoneNumber')
                          dialForm.setValue('phoneNumber', currentValue + '+')
                        }}
                      >
                        +
                      </Button>

                      {/* Call button - show when not connected */}
                      {callStatus !== 'connected' && (
                        <Button
                          type="submit"
                          disabled={isCalling || !deviceState.isReady}
                          className="h-14 text-lg rounded-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                          title={!deviceState.isReady ? 'Device is initializing...' : 'Make a call'}
                        >
                          <Phone className="h-5 w-5 mr-1" />
                          {isCalling ? 'Dialing...' : !deviceState.isReady ? 'Initializing...' : 'Call'}
                        </Button>
                      )}

                      {/* End Call button - show when connected */}
                      {callStatus === 'connected' && (
                        <Button
                          type="button"
                          onClick={endCall}
                          className="h-14 text-lg rounded-full bg-red-600 hover:bg-red-700"
                          title="End the current call"
                        >
                          <PhoneMissed className="h-5 w-5 mr-1" />
                          End Call
                        </Button>
                      )}

                      {/* Backspace button */}
                      <Button
                        type="button"
                        variant="outline"
                        className="h-14 text-lg rounded-full hover:bg-red-100"
                        onClick={() => {
                          const currentValue = dialForm.getValues('phoneNumber')
                          dialForm.setValue('phoneNumber', currentValue.slice(0, -1))
                        }}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Recording Notice - Always enabled */}
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <p className="text-sm font-medium text-blue-800">Call Recording Enabled</p>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      All calls are automatically recorded for quality and analysis purposes
                    </p>
                  </div>

                  {callStatus !== 'idle' && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-md">
                      <p className="font-medium">Call Status: {callStatus}</p>
                      {callStatus === 'connected' && (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">✅ Call connected - you should hear audio</p>
                          {currentCallSid && (
                            <p className="text-xs text-gray-500">Call SID: {currentCallSid}</p>
                          )}
                        </div>
                      )}
                      {callStatus === 'ringing' && (
                        <p className="text-sm text-gray-600">📞 Ringing... waiting for answer</p>
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          dialForm.setValue('phoneNumber', contact.phoneNumber)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      >
                        Call
                      </Button>
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
                  {/* Basic Twilio Credentials */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Basic Credentials</h4>

                    <FormField control={configForm.control} name="accountSid" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account SID</FormLabel>
                        <FormControl><Input placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" {...field} /></FormControl>
                        <FormDescription>Found in your Twilio Console dashboard</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={configForm.control} name="authToken" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auth Token</FormLabel>
                        <FormControl><Input type="password" placeholder="Enter your Twilio Auth Token" {...field} /></FormControl>
                        <FormDescription>Primary Auth Token from Console dashboard</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={configForm.control} name="phoneNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twilio Phone Number</FormLabel>
                        <FormControl><Input placeholder="+1234567890" {...field} /></FormControl>
                        <FormDescription>The Twilio phone number you&apos;ll be calling from</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* API Keys for Voice SDK */}
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">API Keys (Required for Voice SDK)</h4>

                    <FormField control={configForm.control} name="apiKeySid" render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key SID</FormLabel>
                        <FormControl><Input placeholder="SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" {...field} /></FormControl>
                        <FormDescription>Create in Console → Settings → API Keys & Tokens</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={configForm.control} name="apiKeySecret" render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key Secret</FormLabel>
                        <FormControl><Input type="password" placeholder="Enter your API Key Secret" {...field} /></FormControl>
                        <FormDescription>Secret shown only once when creating API Key</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* TwiML Application */}
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">TwiML Application</h4>

                    <FormField control={configForm.control} name="twimlAppSid" render={({ field }) => (
                      <FormItem>
                        <FormLabel>TwiML App SID</FormLabel>
                        <FormControl><Input placeholder="APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" {...field} /></FormControl>
                        <FormDescription>Create in Console → Voice → TwiML → Apps</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <Button type="submit" className="w-full">Save Configuration</Button>
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
              <CardDescription>Complete guide to get all required Twilio credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="basic-setup">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Basic Twilio Setup
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Sign up for a Twilio account at <a href="https://www.twilio.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">twilio.com</a></li>
                      <li>Navigate to your <strong>Console Dashboard</strong></li>
                      <li>Copy your <strong>Account SID</strong> and <strong>Auth Token</strong></li>
                      <li>Purchase a Twilio phone number if you don&apos;t have one</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="api-keys">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Create API Keys
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Go to <strong>Console → Settings → API Keys & Tokens</strong></li>
                      <li>Click <strong>&ldquo;Create API Key&rdquo;</strong></li>
                      <li>Give it a friendly name (e.g., &ldquo;Voice SDK Key&rdquo;)</li>
                      <li>Set key type to <strong>&ldquo;Standard&rdquo;</strong></li>
                      <li>Copy both the <strong>SID</strong> and <strong>Secret</strong> (secret shown only once!)</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="twiml-app">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Create TwiML Application
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Go to <strong>Console → Voice → TwiML → Apps</strong></li>
                      <li>Click <strong>&ldquo;Create new TwiML App&rdquo;</strong></li>
                      <li>Give it a friendly name (e.g., &ldquo;Dialer App&rdquo;)</li>
                      <li>For <strong>Voice URL</strong>, enter: <code className="bg-gray-100 px-1 rounded">{`${process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'}/api/twilio/voice`}</code></li>
                      <li>Leave other fields empty for now</li>
                      <li>Click <strong>&ldquo;Save&rdquo;</strong> and copy the <strong>App SID</strong></li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="important-notes">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Important Notes
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                      <li><strong>API Key Secret:</strong> Only shown once - save it securely!</li>
                      <li><strong>Webhook URL:</strong> Must be publicly accessible (use ngrok for development)</li>
                      <li><strong>Phone Number:</strong> Must include country code (e.g., +1234567890)</li>
                      <li><strong>Testing:</strong> Use Twilio trial credits for initial testing</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="verification">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Verification Checklist
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Account SID starts with &ldquo;AC&rdquo;
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        API Key SID starts with &ldquo;SK&rdquo;
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        TwiML App SID starts with &ldquo;AP&rdquo;
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Phone number includes country code
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Webhook URL is publicly accessible
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Call History</CardTitle>
                <CardDescription>Recent calls made through the system</CardDescription>
                {lastLogsRefresh && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Last refresh: {lastLogsRefresh.toLocaleTimeString()}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsHistoryCollapsed(v => !v)}
                className="flex items-center gap-1"
                aria-label={isHistoryCollapsed ? "Expand call history" : "Collapse call history"}
              >
                {isHistoryCollapsed ? (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Expand
                  </>
                ) : (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Minimize
                  </>
                )}
              </Button>
            </CardHeader>
            {!isHistoryCollapsed && (
            <CardContent>
              <div className="space-y-2">
                {callLogs.length > 0 ? (
                  callLogs.map((log) => {
                    // Find associated recording
                    const recording = callRecordings.find(r => r.call_log_id === log.id)

                    return (
                      <div key={log.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">
                            {(
                              log.to_number ||
                              ((log as unknown as { to?: string }).to) ||
                              log.from_number ||
                              ((log as unknown as { from?: string }).from) ||
                              'Unknown number'
                            )}
                          </p>
                          <p className="text-sm text-gray-600">
                            {(() => {
                              const created = log.created_at ||
                                ((log as unknown as { startTime?: string }).startTime) ||
                                log.started_at ||
                                ((log as unknown as { endTime?: string }).endTime) ||
                                log.ended_at
                              return created ? new Date(created).toLocaleString() : 'Unknown date'
                            })()}
                          </p>
                            {(() => {
                              const started = log.started_at || ((log as unknown as { startTime?: string }).startTime)
                              return started ? (
                                <p className="text-xs text-gray-500">Started: {new Date(started).toLocaleString()}</p>
                              ) : null
                            })()}
                          {recording && (
                            <div className="flex items-center gap-1 mt-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-xs text-green-600">Recording Available</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${log.status === 'completed' ? 'bg-green-100 text-green-800' :
                            log.status === 'failed' ? 'bg-red-100 text-red-800' :
                              log.status === 'no-answer' ? 'bg-yellow-100 text-yellow-800' :
                                log.status === 'queued' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                            }`}>
                            {log.status}
                          </span>
                          {log.duration && (
                            <span className="text-sm text-gray-600">{log.duration}s</span>
                          )}
                          {recording && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => playRecording(recording)}
                            >
                              Play
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-gray-500">No call history found</p>
                )}
              </div>
            </CardContent>
            )}
          </Card>

          {/* Add new Recordings section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Call Recordings</CardTitle>
                  <CardDescription>Recorded calls with playback options</CardDescription>
                  {lastRecordingsRefresh && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Last refresh: {lastRecordingsRefresh.toLocaleTimeString()}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRecordingsCollapsed(v => !v)}
                    className="flex items-center gap-1"
                    aria-label={isRecordingsCollapsed ? "Expand recordings" : "Collapse recordings"}
                  >
                    {isRecordingsCollapsed ? (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Expand
                      </>
                    ) : (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Minimize
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={syncRecordings}
                    disabled={isSyncing}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Syncing...' : 'Sync from Twilio'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {!isRecordingsCollapsed && (
            <CardContent>
              <div className="space-y-2">
                {callRecordings.length > 0 ? (
                  callRecordings.map((recording) => (
                    <div key={recording.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                      <div>
                        <p className="font-medium">
                          {recording.call_logs?.to_number || 'Unknown Number'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(recording.created_at).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          {recording.duration && (
                            <span>Duration: {recording.duration}s</span>
                          )}
                          <span>Format: {recording.format.toUpperCase()}</span>
                          {recording.consent_given && (
                            <span className="text-green-600">✓ Consent Given</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => playRecording(recording)}
                        >
                          Play
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(recording.recording_url)}
                        >
                          Copy URL
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No recordings found</p>
                )}
              </div>
            </CardContent>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}