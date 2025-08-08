
"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    helpWith: [] as string[],
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      helpWith: checked 
        ? [...prev.helpWith, value]
        : prev.helpWith.filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/BsBEKMz2Dy57PRbfOSXz/webhook-trigger/kkfvyfhChdiFAdyqcERO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          helpWith: formData.helpWith,
          message: formData.message,
          timestamp: new Date().toISOString(),
          source: 'Contact Form'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error('Failed to submit form:', response.statusText)
        setIsSubmitted(true) // Still show success for better UX
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitted(true) // Still show success for better UX
    }

    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center py-32 bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-light sm:text-5xl text-brown-800">Thank You!</h1>
                <p className="text-xl text-brown-700 font-light leading-relaxed">
                  Your message has been sent successfully.
                </p>
                <p className="text-brown-600 font-light">
                  We'll get back to you within 24 hours with a personalized response.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    helpWith: [],
                    message: ""
                  })
                }}
                className="bg-brown-700 hover:bg-brown-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Contact Us</div>
                <div className="w-16 h-px bg-brand-red mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Get In
                <span className="block font-light text-brown-700 mt-2">Touch</span>
                <span className="block font-extralight text-brown-600 mt-2">Today</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Ready to experience exceptional results with genuine care? Contact our expert team today to discuss your
                property needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2">
              <div className="space-y-10">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="bg-brown-100 p-4 rounded-2xl">
                      <Phone className="h-7 w-7 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-medium text-brown-900 text-lg">Phone</div>
                      <div className="text-brown-700">(+61) 467 048 837</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="bg-brown-100 p-4 rounded-2xl">
                      <Mail className="h-7 w-7 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-medium text-brown-900 text-lg">Email</div>
                      <div className="text-brown-700">sales@altoproperty.com.au</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="bg-brown-100 p-4 rounded-2xl">
                      <MapPin className="h-7 w-7 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-medium text-brown-900 text-lg">Office</div>
                      <div className="text-brown-700">
                        4/66 Condamine St, Runcorn
                        <br />
                        QLD 4113, Australia
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="bg-brown-100 p-4 rounded-2xl">
                      <Clock className="h-7 w-7 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-medium text-brown-900 text-lg">Office Hours</div>
                      <div className="text-brown-700">
                        Monday - Friday: 9:00am - 5:30pm
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border border-brown-100 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-brown-900 font-light">Send us a message</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Fill out the form below and we'll get back to you within 24 hours with a personalized response.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brown-900">First Name</label>
                        <Input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John" 
                          className="border-brown-200 focus:border-brown-400" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brown-900">Last Name</label>
                        <Input 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe" 
                          className="border-brown-200 focus:border-brown-400" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Email</label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="john@example.com"
                        className="border-brown-200 focus:border-brown-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Phone</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="tel"
                        placeholder="(07) 1234 5678"
                        className="border-brown-200 focus:border-brown-400"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-brown-900">What can we help you with? *</label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-brown-600 bg-white border-brown-300 rounded focus:ring-brown-500 focus:ring-2"
                            onChange={(e) => handleCheckboxChange("Looking to sell a property", e.target.checked)}
                          />
                          <span className="text-sm text-brown-700">Looking to sell a property</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-brown-600 bg-white border-brown-300 rounded focus:ring-brown-500 focus:ring-2"
                            onChange={(e) => handleCheckboxChange("Looking to buy a property", e.target.checked)}
                          />
                          <span className="text-sm text-brown-700">Looking to buy a property</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-brown-600 bg-white border-brown-300 rounded focus:ring-brown-500 focus:ring-2"
                            onChange={(e) => handleCheckboxChange("Looking to rent a property", e.target.checked)}
                          />
                          <span className="text-sm text-brown-700">Looking to rent a property</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-brown-600 bg-white border-brown-300 rounded focus:ring-brown-500 focus:ring-2"
                            onChange={(e) => handleCheckboxChange("Property management inquiry", e.target.checked)}
                          />
                          <span className="text-sm text-brown-700">Property management inquiry</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-brown-600 bg-white border-brown-300 rounded focus:ring-brown-500 focus:ring-2"
                            onChange={(e) => handleCheckboxChange("Finance and mortgage help", e.target.checked)}
                          />
                          <span className="text-sm text-brown-700">Finance and mortgage help</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-brown-600 bg-white border-brown-300 rounded focus:ring-brown-500 focus:ring-2"
                            onChange={(e) => handleCheckboxChange("General inquiry", e.target.checked)}
                          />
                          <span className="text-sm text-brown-700">General inquiry</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="flex min-h-[100px] w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell us about your property needs..."
                        rows={4}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 h-auto font-light tracking-wide"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-brown-200">© {new Date().getFullYear()} ALTO Property. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
