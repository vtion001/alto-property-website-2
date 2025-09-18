"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Star, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function SpeakSpecialistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    suburb: '',
    inquiry: '',
    message: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required'
    }

    if (!formData.suburb.trim()) {
      newErrors.suburb = 'Suburb is required'
    }

    if (!formData.inquiry) {
      newErrors.inquiry = 'Inquiry type is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const isFormValid = formData.firstName.trim() && 
                     formData.lastName.trim() && 
                     formData.email.trim() && 
                     formData.phone.trim() && 
                     formData.propertyType && 
                     formData.suburb.trim() && 
                     formData.inquiry && 
                     formData.message.trim() &&
                     Object.keys(errors).length === 0

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="container max-w-2xl">
            <Card className="border border-brown-100 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-green-700" />
                </div>
                <h2 className="text-3xl font-light text-brown-900 mb-4">Thank You!</h2>
                <p className="text-brown-700 font-light leading-relaxed mb-8">
                  We've received your consultation request. Our expert team will contact you within 24 hours to discuss your needs.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-brown-300 text-brown-700 hover:bg-brown-50"
                >
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
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
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Expert Consultation</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Speak to a<span className="block font-light text-brown-700 mt-2">Specialist</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Get personalized advice from our property management experts. Book a consultation to discuss your
                investment goals.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Contact Form */}
              <div id="contact-form">
                <div className="space-y-8 mb-12">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Get In Touch</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h2 className="text-4xl font-extralight text-brown-800">Book Your Consultation</h2>
                  <p className="text-lg font-light text-brown-700 leading-relaxed">
                    Fill out the form below and one of our specialists will contact you within 24 hours.
                  </p>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-brown-800 font-light">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        className={`border-brown-200 focus:border-brown-400 ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-brown-800 font-light">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        className={`border-brown-200 focus:border-brown-400 ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-brown-800 font-light">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      className={`border-brown-200 focus:border-brown-400 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-brown-800 font-light">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className={`border-brown-200 focus:border-brown-400 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="text-brown-800 font-light">
                      Property Type *
                    </Label>
                    <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger className={`border-brown-200 focus:border-brown-400 ${errors.propertyType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="unit">Unit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.propertyType && (
                      <p className="text-sm text-red-600 mt-1">{errors.propertyType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="suburb" className="text-brown-800 font-light">
                      Property Suburb *
                    </Label>
                    <Input
                      id="suburb"
                      value={formData.suburb}
                      onChange={(e) => handleInputChange('suburb', e.target.value)}
                      placeholder="Enter property suburb"
                      className={`border-brown-200 focus:border-brown-400 ${errors.suburb ? 'border-red-500' : ''}`}
                    />
                    {errors.suburb && (
                      <p className="text-sm text-red-600 mt-1">{errors.suburb}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry" className="text-brown-800 font-light">
                      Inquiry Type *
                    </Label>
                    <Select value={formData.inquiry} onValueChange={(value) => handleInputChange('inquiry', value)}>
                      <SelectTrigger className={`border-brown-200 focus:border-brown-400 ${errors.inquiry ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="management">Property Management</SelectItem>
                        <SelectItem value="appraisal">Rental Appraisal</SelectItem>
                        <SelectItem value="investment">Investment Advice</SelectItem>
                        <SelectItem value="maintenance">Maintenance Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.inquiry && (
                      <p className="text-sm text-red-600 mt-1">{errors.inquiry}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-brown-800 font-light">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your property and what you'd like to discuss..."
                      rows={4}
                      className={`border-brown-200 focus:border-brown-400 ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Consultation'}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <div className="space-y-8 mb-12">
                    <div className="inline-block">
                      <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Contact Info</div>
                      <div className="w-16 h-px bg-brown-300"></div>
                    </div>
                    <h2 className="text-4xl font-extralight text-brown-800">Get In Touch</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-brown-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-brown-800 mb-2">Phone</h3>
                        <p className="text-brown-700">(+61) 437 139 314</p>
                        <p className="text-brown-600 text-sm">Monday - Friday: 9:00am - 5:30pm</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-brown-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-brown-800 mb-2">Email</h3>
                        <p className="text-brown-700">connor.reilly@altoproperty.com.au</p>
                        <p className="text-brown-600 text-sm">We respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-brown-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-brown-800 mb-2">Office</h3>
                        <p className="text-brown-700">Office address coming soon</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-brown-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-brown-800 mb-2">Business Hours</h3>
                        <p className="text-brown-700">Monday - Friday: 9:00am - 5:30pm</p>
                        <p className="text-brown-700">Saturday: 9:00am - 4:00pm</p>
                        <p className="text-brown-700">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <Card className="border border-brown-200 bg-brown-50">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <div className="bg-brown-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <Phone className="h-8 w-8 text-cream" />
                      </div>
                      <h3 className="text-xl font-light text-brown-800">24/7 Emergency Line</h3>
                      <p className="text-brown-700 font-medium text-lg">(+61) 437 139 314</p>
                      <p className="text-brown-600 text-sm">For urgent maintenance or security issues</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Specialists */}
        <section className="py-32 bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container">
            <div className="text-center space-y-12 mb-20">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Team</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight text-brown-800">Meet Our Specialists</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Our experienced team is here to help you achieve your property goals with personalized service and expert advice.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 bg-white">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="bg-brown-100 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                    <Star className="h-12 w-12 text-brown-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-brown-800 mb-2">Property Management</h3>
                    <p className="text-brown-700 font-light">Expert management services to maximize your investment returns.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 bg-white">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="bg-brown-100 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                    <Search className="h-12 w-12 text-brown-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-brown-800 mb-2">Market Analysis</h3>
                    <p className="text-brown-700 font-light">Comprehensive market insights and rental appraisals.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 bg-white">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="bg-brown-100 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                    <Phone className="h-12 w-12 text-brown-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-brown-800 mb-2">24/7 Support</h3>
                    <p className="text-brown-700 font-light">Round-the-clock assistance for all your property needs.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center space-y-12 mb-20">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">FAQ</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight text-brown-800">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-8">
              <div className="border border-brown-100 rounded-lg p-8">
                <h3 className="text-xl font-light text-brown-800 mb-4">How quickly will I hear back after submitting the form?</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  We aim to respond to all consultation requests within 24 hours during business days. For urgent matters, please call our 24/7 emergency line.
                </p>
              </div>

              <div className="border border-brown-100 rounded-lg p-8">
                <h3 className="text-xl font-light text-brown-800 mb-4">What should I prepare for the consultation?</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  It's helpful to have information about your property ready, including the address, type of property, and any specific questions or concerns you'd like to discuss.
                </p>
              </div>

              <div className="border border-brown-100 rounded-lg p-8">
                <h3 className="text-xl font-light text-brown-800 mb-4">Is the consultation really free?</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Yes, our initial consultation is completely free with no obligation. We believe in providing value upfront to help you make informed decisions about your property.
                </p>
              </div>

              <div className="border border-brown-100 rounded-lg p-8">
                <h3 className="text-xl font-light text-brown-800 mb-4">Can I speak to someone immediately?</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  For immediate assistance, please call our main office number. If all lines are busy, leave a voicemail and we'll return your call as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-brown-800 to-brown-900">
          <div className="container text-center">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-cream/70 uppercase mb-2">Ready to Start?</div>
                <div className="w-16 h-px bg-cream/50 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight text-cream leading-tight">
                Transform Your Property Investment Today
              </h2>
              <p className="text-xl font-light text-cream/90 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of satisfied property owners who trust Alto Property with their investments. Let's discuss how we can help you achieve your goals.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="border-cream text-brown-800 hover:bg-cream hover:text-brown-800 font-light tracking-wide px-8 py-6 h-auto text-base bg-white"
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Book Your Free Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
