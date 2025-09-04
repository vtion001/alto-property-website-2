'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, PhoneOutgoing, PhoneMissed, Settings, User, History, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const dialSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

const twilioConfigSchema = z.object({
  accountSid: z.string().min(1, 'Account SID is required'),
  authToken: z.string().min(1, 'Auth token is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

export default function Dialer() {
  const [isCalling, setIsCalling] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'dialing' | 'connected' | 'ended'>('idle')
  const [twilioConfig, setTwilioConfig] = useState<any>(null)
  const [callLogs, setCallLogs] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])

  const dialForm = useForm<z.infer<typeof dialSchema>>({
    resolver: zodResolver(dialSchema),
    defaultValues: { phoneNumber: '' },
  })

  const configForm = useForm<z.infer<typeof twilioConfigSchema>>({
    resolver: zodResolver(twilioConfigSchema),
    defaultValues: { accountSid: '', authToken: '', phoneNumber: '' },
  })

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
    fetchConfig(); fetchCallLogs(); fetchContacts()
  }, [configForm])

  const onDial = async (values: z.infer<typeof dialSchema>) => {
    if (!twilioConfig) {
      alert('Please configure Twilio settings first')
      return
    }
    setIsCalling(true)
    setCallStatus('dialing')
    try {
      const response = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: values.phoneNumber, from: twilioConfig.phoneNumber }),
      })
      if (response.ok) {
        const callData = await response.json()
        setCallStatus('connected')
        setCallLogs([
          { id: callLogs.length + 1, callSid: callData.sid, fromNumber: twilioConfig.phoneNumber, toNumber: values.phoneNumber, status: 'connected', startedAt: new Date(), createdAt: new Date() },
          ...callLogs,
        ])
      } else throw new Error('Failed to make call')
    } catch (e) {
      setCallStatus('ended')
      alert('Failed to make call. Please check your Twilio configuration.')
    } finally {
      setIsCalling(false)
      setTimeout(() => setCallStatus('ended'), 10000)
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
        alert('Twilio configuration saved successfully!')
      } else throw new Error('Failed to save configuration')
    } catch (e) {
      alert('Failed to save configuration. Please try again.')
    }
  }

  const endCall = async () => {
    if (callStatus === 'connected') setCallStatus('ended')
  }

  const appendChar = (ch: string) => {
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
                  <div className="grid grid-cols-3 gap-3 max-w-sm">
                    {['1','2','3','4','5','6','7','8','9','*','0','#'].map((d) => (
                      <Button key={d} type="button" variant="outline" className="h-14 text-lg rounded-full" onClick={() => appendChar(d)}>
                        {d}
                      </Button>
                    ))}
                    <Button type="button" variant="outline" className="h-14 text-lg rounded-full" onClick={() => appendChar('+')}>+</Button>
                    <Button type="submit" disabled={isCalling || callStatus === 'connected'} className="h-14 text-lg rounded-full bg-green-600 hover:bg-green-700">
                      <Phone className="h-5 w-5 mr-1" />
                      Call
                    </Button>
                    <Button type="button" variant="outline" className="h-14 text-lg rounded-full" onClick={backspace}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  {callStatus === 'connected' && (
                    <div className="flex gap-2">
                      <Button type="button" variant="destructive" onClick={endCall} className="flex items-center gap-2">
                        <PhoneMissed className="h-4 w-4" />End Call
                      </Button>
                    </div>
                  )}
                  {callStatus !== 'idle' && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-md">
                      <p className="font-medium">Call Status: {callStatus}</p>
                      {callStatus === 'connected' && (<p className="text-sm text-gray-600">Call in progress...</p>)}
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


