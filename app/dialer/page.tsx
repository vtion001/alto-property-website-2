'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, PhoneOutgoing, PhoneMissed, Settings, User, History, Mic, MicOff, Square, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import TwilioDeviceManager, { isRealDevice, type TwilioDevice } from '@/lib/twilio-device-manager'

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
  const [twilioConfig, setTwilioConfig] = useState<any>(null)
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [deviceState, setDeviceState] = useState<any>(null)
  const { toast } = useToast()

  // Get device manager instance
  const deviceManager = TwilioDeviceManager.getInstance()

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

  // Subscribe to device manager state
  useEffect(() => {
    const unsubscribe = deviceManager.subscribe((state) => {
      console.log('📱 Device state updated:', state)
      setDeviceState(state)
    })

    return unsubscribe
  }, [deviceManager])

  // Initialize device when component mounts
  useEffect(() => {
    const initializeDevice = async () => {
      try {
        // Fetch access token
        const response = await fetch('/api/twilio/token')
        if (response.ok) {
          const { accessToken } = await response.json()
          console.log('🔑 Got access token, initializing device...')
          await deviceManager.initialize(accessToken, toast)
        } else {
          console.error('❌ Failed to fetch access token')
          toast({
            title: 'Device Error',
            description: 'Failed to get access token for Twilio device',
            variant: 'destructive',
          })
        }
      } catch (error) {
        console.error('❌ Error initializing device:', error)
        toast({
          title: 'Device Error',
          description: 'Failed to initialize Twilio device',
          variant: 'destructive',
        })
      }
    }

    initializeDevice()
  }, [deviceManager, toast])

  // Fetch Twilio config on component mount
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

  const onDial = async (values: z.infer<typeof dialSchema>) => {
    if (!twilioConfig) {
      toast({
        title: 'Configuration Required',
        description: 'Please configure your Twilio settings first.',
        variant: 'destructive',
      })
      return
    }

    if (!deviceState?.isReady) {
      toast({
        title: 'Device Not Ready',
        description: 'Twilio device is not ready. Please wait for initialization to complete.',
        variant: 'destructive',
      })
      return
    }

    setIsCalling(true)
    setCallStatus('dialing')

    try {
      // Use the new makeCall method from device manager
      await deviceManager.makeCall(values.phoneNumber, values.recordingConsent)
      
      // Update call status based on device state
      setCallStatus('connected')
      
      // Refresh call logs after call
      setTimeout(() => {
        fetchCallLogs()
      }, 1000)
    } catch (error) {
      console.error('Error making call:', error)
      toast({
        title: 'Call Failed',
        description: 'Failed to initiate the call. Please try again.',
        variant: 'destructive',
      })
      setCallStatus('ended')
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
        
        // Reinitialize device with new config
        try {
          const tokenResponse = await fetch('/api/twilio/token')
          if (tokenResponse.ok) {
            const { accessToken } = await tokenResponse.json()
            await deviceManager.initialize(accessToken, toast)
          }
        } catch (error) {
          console.error('Error reinitializing device:', error)
        }
      } else {
        throw new Error('Failed to save configuration')
      }
    } catch (error) {
      console.error('Error saving config:', error)
      toast({
        title: 'Configuration Error',
        description: 'Failed to save configuration. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const endCall = async () => {
    if (callStatus === 'connected') {
      try {
        // Stop recording if active
        if (deviceState?.isRecording) {
          await deviceManager.stopRecording()
        }
        
        // End the call
        deviceManager.hangupCall()
        
        setCallStatus('ended')
        setIsCalling(false)
        
        // Refresh call logs
        setTimeout(() => {
          fetchCallLogs()
        }, 1000)
      } catch (error) {
        console.error('Error ending call:', error)
        toast({
          title: 'Error',
          description: 'Failed to end call properly',
          variant: 'destructive',
        })
      }
    }
  }

  const handleStartRecording = async () => {
    try {
      await deviceManager.startRecording()
      toast({
        title: 'Recording Started',
        description: 'Call recording has been started',
      })
    } catch (error) {
      console.error('Error starting recording:', error)
      toast({
        title: 'Recording Error',
        description: 'Failed to start recording',
        variant: 'destructive',
      })
    }
  }

  const handleStopRecording = async () => {
    try {
      await deviceManager.stopRecording()
      toast({
        title: 'Recording Stopped',
        description: 'Call recording has been stopped',
      })
    } catch (error) {
      console.error('Error stopping recording:', error)
      toast({
        title: 'Recording Error',
        description: 'Failed to stop recording',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Twilio Dialing System</h1>
        
        {/* Device Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            deviceState?.status === 'ready' ? 'bg-green-500' :
            deviceState?.status === 'connecting' || deviceState?.status === 'initializing' ? 'bg-yellow-500' :
            deviceState?.status === 'error' || deviceState?.status === 'failed' ? 'bg-red-500' :
            'bg-gray-500'
          }`} />
          <span className="text-sm font-medium">
            Device: {deviceState?.status || 'Unknown'}
          </span>
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
                          <Input placeholder="Enter phone number" {...field} />
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
                    <Button type="submit" disabled={isCalling || callStatus === 'connected'} className="flex items-center gap-2">
                      {isCalling ? (<><div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />Dialing...</>) : (<><PhoneOutgoing className="h-4 w-4" />Call</>)}
                    </Button>
                    {callStatus === 'connected' && (
                      <>
                        <Button type="button" variant="destructive" onClick={endCall} className="flex items-center gap-2">
                          <PhoneMissed className="h-4 w-4" />End Call
                        </Button>
                        {deviceState?.recordingConsent && (
                          <>
                            {!deviceState?.isRecording ? (
                              <Button type="button" variant="outline" onClick={handleStartRecording} className="flex items-center gap-2">
                                <Mic className="h-4 w-4" />Start Recording
                              </Button>
                            ) : (
                              <Button type="button" variant="outline" onClick={handleStopRecording} className="flex items-center gap-2">
                                <Square className="h-4 w-4 text-red-500" />Stop Recording
                              </Button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {callStatus !== 'idle' && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-md">
                      <p className="font-medium">Call Status: {callStatus}</p>
                      {callStatus === 'connected' && (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Call in progress...</p>
                          {deviceState?.callStartTime && (
                            <p className="text-sm text-gray-600">
                              Duration: {Math.floor((Date.now() - new Date(deviceState.callStartTime).getTime()) / 1000)}s
                            </p>
                          )}
                          {deviceState?.isRecording && (
                            <div className="flex items-center gap-2 text-red-600">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              <span className="text-sm font-medium">Recording in progress</span>
                            </div>
                          )}
                          {deviceState?.callSid && (
                            <p className="text-xs text-gray-500">Call SID: {deviceState.callSid}</p>
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
    </div>
  )
}


