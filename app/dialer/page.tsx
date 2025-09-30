'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, PhoneOutgoing, PhoneMissed, Settings, User, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

const dialSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  recordingConsent: z.boolean().default(false),
})

const twilioConfigSchema = z.object({
  accountSid: z.string().min(1, 'Account SID is required'),
  authToken: z.string().min(1, 'Auth token is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

export default function DialerPage() {
  const [isCalling, setIsCalling] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'dialing' | 'ringing' | 'connected' | 'ended'>('idle')
  const [twilioConfig, setTwilioConfig] = useState<TwilioConfig | null>(null)
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentCallSid, setCurrentCallSid] = useState<string | null>(null)
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
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
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
  // Replace your initializeDevice function with this corrected version:
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
        answerOnBridge: true,
        audioConstraints: {
          optional: [
            { googEchoCancellation: true },
            { googNoiseSuppression: true },
            { googAutoGainControl: true }
          ]
        }
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
      }, 10000) // Reduced to 10 seconds for faster testing

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

  const fetchTwilioConfig = useCallback(async () => {
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
  }, [configForm])

  const fetchCallLogs = useCallback(async () => {
    try {
      const response = await fetch('/api/call-logs')
      if (response.ok) {
        const logs = await response.json()
        setCallLogs(logs)
      }
    } catch (error) {
      console.error('Error fetching call logs:', error)
    }
  }, [])

  const fetchContacts = useCallback(async () => {
    try {
      const response = await fetch('/api/contacts')
      if (response.ok) {
        const contactsData = await response.json()
        setContacts(contactsData)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }, [])

  // Fetch functions on component mount
  useEffect(() => {
    fetchTwilioConfig()
    fetchCallLogs()
    fetchContacts()
  }, [fetchTwilioConfig, fetchCallLogs, fetchContacts])

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
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Twilio Dialing System</h1>

        {/* Device Status Indicator */}
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

      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">🔍 Debug Information</h3>
        <div className="text-sm space-y-1">
          <div>Audio Context: {audioContextInitialized ? '✅ Ready' : '❌ Not Ready'}</div>
          <div>Device State: {deviceState.status}</div>
          <div>Device Ready: {deviceState.isReady ? '✅ True' : '❌ False'}</div>
          <div>Device Instance: {device ? '✅ Exists' : '❌ Missing'}</div>
          <div>Button Disabled: {(isCalling || callStatus === 'connected' || !deviceState.isReady) ? '❌ Yes' : '✅ No'}</div>
          {deviceState.error && <div className="text-red-600">Error: {deviceState.error}</div>}
        </div>

        {/* Force enable button for testing */}
        <div className="mt-2">
          <Button
            onClick={() => {
              console.log('Force enabling device state for testing')
              setDeviceState({ status: 'ready', isReady: true })
            }}
            variant="outline"
            size="sm"
          >
            🔧 Force Enable (Debug)
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">🎧 Device Controls</h3>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => {
              console.log('🔍 Environment Variables Check:')
              console.log('TWILIO_ACCOUNT_SID:', process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID ? 'Set' : 'Missing')
              console.log('Current TwiML App SID from token API:', 'Checking...')

              // Test token generation with debug info
              fetch('/api/twilio/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identity: 'debug-user' })
              })
                .then(res => res.json())
                .then(data => {
                  console.log('Token API Response:', data)
                  if (data.token) {
                    // Decode JWT to see the app SID
                    const payload = JSON.parse(atob(data.token.split('.')[1]))
                    console.log('JWT Payload:', payload)
                    console.log('TwiML App SID in token:', payload.grants?.voice?.outgoing?.application_sid)
                  }
                })
                .catch(err => console.error('Token test failed:', err))

              toast({
                title: "Debug Info",
                description: "Check console for environment variable details",
              })
            }}
            variant="outline"
            size="sm"
          >
            🔍 Debug Config
          </Button>
          <Button
            onClick={async () => {
              try {
                const response = await fetch('https://chet-kinematical-verdie.ngrok-free.dev/api/twilio/voice', {
                  method: 'GET',
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'User-Agent': 'TwilioWebhookTest/1.0'
                  }
                })
                const text = await response.text()
                console.log('Webhook test response:', text)
                toast({
                  title: "Webhook Test",
                  description: text.includes('Twilio Voice Webhook is working!') ? '✅ Webhook Working!' : `Response: ${text.substring(0, 100)}...`,
                })
              } catch (error) {
                console.error('Webhook test failed:', error)
                toast({
                  title: "Webhook Error",
                  description: "Failed to reach webhook",
                  variant: "destructive"
                })
              }
            }}
            variant="outline"
            size="sm"
          >
            🔍 Test Webhook
          </Button>
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



      <Tabs defaultValue="dialer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dialer" className="flex items-center gap-2"><Phone className="h-4 w-4" />Dialer</TabsTrigger>
          <TabsTrigger value="api-config" className="flex items-center gap-2"><Settings className="h-4 w-4" />API Config</TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2"><History className="h-4 w-4" />Call History</TabsTrigger>
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

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={isCalling || callStatus === 'connected' || !deviceState.isReady}
                      className="flex items-center gap-2"
                    >
                      {isCalling ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Dialing...
                        </>
                      ) : (
                        <>
                          <PhoneOutgoing className="h-4 w-4" />
                          Call
                        </>
                      )}
                    </Button>

                    {callStatus === 'connected' && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={endCall}
                        className="flex items-center gap-2"
                      >
                        <PhoneMissed className="h-4 w-4" />
                        End Call
                      </Button>
                    )}
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${log.status === 'connected' ? 'bg-green-100 text-green-800' :
                          log.status === 'failed' ? 'bg-red-100 text-red-800' :
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