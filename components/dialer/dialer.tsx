'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, PhoneOutgoing, PhoneMissed, X, Settings, User, History, Mic, MicOff, Volume2, VolumeX, ChevronDown, Key, Link2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

// Import Twilio Voice SDK
import { Device, Call } from '@twilio/voice-sdk'

// Type definitions
interface CallLog {
  id: string
  call_sid: string      // Database uses snake_case
  from_number: string   // Database uses snake_case
  to_number: string     // Database uses snake_case
  status: 'queued' | 'ringing' | 'in-progress' | 'completed' | 'busy' | 'failed' | 'no-answer' | 'canceled' | 'connected'
  duration?: number
  started_at?: string   // Database uses snake_case and returns ISO string
  ended_at?: string     // Database uses snake_case and returns ISO string
  created_at: string
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

type callStatus = 'idle' | 'dialing' | 'ringing' | 'connected' | 'ended'

export default function Dialer() {
  const [isCalling, setIsCalling] = useState(false)
  const [callStatus, setCallStatus] = useState<callStatus>('idle')
  const [twilioConfig, setTwilioConfig] = useState<any>(null)
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentCallSid, setCurrentCallSid] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingConsent, setRecordingConsent] = useState(false)
  const { toast } = useToast()

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
      recordingConsent: false,
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

  // Initialize Audio Context (required for WebRTC)
  const initializeAudioContext = async () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      await audioContext.resume()
      setAudioContextInitialized(true)
      toast({
        title: "Audio Enabled",
        description: "Browser audio permissions granted. You can now make calls.",
      })
      return true
    } catch (error) {
      console.error('Failed to initialize audio context:', error)
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
      }
    } catch (error) {
      console.error('Error fetching call logs:', error)
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
    } catch (error) {
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
            {!audioContextInitialized && (
              <Button
                onClick={initializeAudioContext}
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                🔊 Enable Audio (Required First)
              </Button>
            )}

            <Button
              onClick={initializeDevice}
              variant="outline"
              size="sm"
              disabled={!audioContextInitialized || deviceState.status === 'initializing'}
            >
              {deviceState.status === 'initializing' ? '⏳ Initializing...' : '🔄 Initialize Device'}
            </Button>

            {deviceState.error && (
              <div className="text-sm text-red-600 mt-2">
                Error: {deviceState.error}
              </div>
            )}
          </div>
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
                          disabled={isCalling || (callStatus as any) === 'connected' || !deviceState.isReady}
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

                  <FormField
                    control={dialForm.control}
                    name="recordingConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Enable call recording
                          </FormLabel>
                          <FormDescription>
                            I consent to recording this call for quality and training purposes
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

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
                        <FormDescription>The Twilio phone number you'll be calling from</FormDescription>
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
                      <li>Purchase a Twilio phone number if you don't have one</li>
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
                      <li>Click <strong>"Create API Key"</strong></li>
                      <li>Give it a friendly name (e.g., "Voice SDK Key")</li>
                      <li>Set key type to <strong>"Standard"</strong></li>
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
                      <li>Click <strong>"Create new TwiML App"</strong></li>
                      <li>Give it a friendly name (e.g., "Dialer App")</li>
                      <li>For <strong>Voice URL</strong>, enter: <code className="bg-gray-100 px-1 rounded">{`${process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'}/api/twilio/voice`}</code></li>
                      <li>Leave other fields empty for now</li>
                      <li>Click <strong>"Save"</strong> and copy the <strong>App SID</strong></li>
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
                        Account SID starts with "AC"
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        API Key SID starts with "SK"
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        TwiML App SID starts with "AP"
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
                        <p className="font-medium">{log.to_number}</p>
                        <p className="text-sm text-gray-600">
                          {log.created_at ? new Date(log.created_at).toLocaleString() : 'Unknown date'}
                        </p>
                        {log.started_at && (
                          <p className="text-xs text-gray-500">
                            Started: {new Date(log.started_at).toLocaleString()}
                          </p>
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
    </div>
  )
}