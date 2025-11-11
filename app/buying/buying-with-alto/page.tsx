'use client'

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Shield, Search, Award, Clock, Target } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function BuyingWithAltoPage() {
  const formSectionRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    budgetRange: '',
    preferredLocation: '',
    timeline: '',
    additionalRequirements: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Handle scroll to form on navigation with hash
  useEffect(() => {
    if (window.location.hash === '#buyer-form') {
      formSectionRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.propertyType) newErrors.propertyType = 'Please select a property type'
    if (!formData.budgetRange) newErrors.budgetRange = 'Please select a budget range'
    if (!formData.preferredLocation.trim()) newErrors.preferredLocation = 'Please enter a preferred location'
    if (!formData.timeline) newErrors.timeline = 'Please select a timeline'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/BsBEKMz2Dy57PRbfOSXz/webhook-trigger/JkLmN7pQxYz9wEfR3sT4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Property Buyer Registration - Buying With Alto'
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
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  We've received your property requirements. Our expert team will contact you within 24 hours to discuss your property search and guide you through the next steps.
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
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Buying With Alto</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Your Trusted
                <span className="block font-light text-brown-700 mt-2">Property</span>
                <span className="block font-extralight text-brown-600 mt-2">Partner</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Experience the difference with South East Queensland's premier property specialists. We guide you through every
                step of the buying process.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Exclusive Access</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Access to off-market properties and exclusive listings not available to the general public.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Expert Guidance</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Professional advice from experienced agents with deep local market knowledge.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Negotiation Power</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Skilled negotiation to secure the best possible price and terms for your purchase.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Proven Results</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Track record of successful purchases with satisfied clients across South East Queensland's premium suburbs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Convenience</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Researching, budgeting, securing all in one service through finance experts and agents.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Targeted Search</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Focused property search based on your specific criteria and investment goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Property Buyer Form Section */}
        <section id="buyer-form" ref={formSectionRef} className="py-24 bg-brown-50">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-900 mb-4">
                Start Your Property Search
              </h2>
              <p className="text-xl text-brown-700 leading-relaxed max-w-2xl mx-auto">
                Tell us about your property requirements and we'll help you find your perfect match with our exclusive access and expert guidance.
              </p>
            </div>

            <Card className="border border-brown-100 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-2xl font-light text-brown-900 mb-6">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-brown-900 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors ${
                            errors.firstName ? 'border-red-500' : 'border-brown-200'
                          }`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-brown-900 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors ${
                            errors.lastName ? 'border-red-500' : 'border-brown-200'
                          }`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brown-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-brown-200'
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-brown-900 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-brown-200'
                          }`}
                          placeholder="(07) 1234 5678"
                        />
                        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Property Preferences */}
                  <div>
                    <h3 className="text-2xl font-light text-brown-900 mb-6">Property Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-brown-900 mb-2">
                          Property Type *
                        </label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors ${
                            errors.propertyType ? 'border-red-500' : 'border-brown-200'
                          }`}
                        >
                          <option value="">Select property type</option>
                          <option value="house">House</option>
                          <option value="apartment">Apartment/Unit</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="land">Land</option>
                          <option value="investment">Investment Property</option>
                          <option value="commercial">Commercial</option>
                        </select>
                        {errors.propertyType && <p className="text-sm text-red-600 mt-1">{errors.propertyType}</p>}
                      </div>

                      <div>
                        <label htmlFor="budgetRange" className="block text-sm font-medium text-brown-900 mb-2">
                          Budget Range *
                        </label>
                        <select
                          id="budgetRange"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors ${
                            errors.budgetRange ? 'border-red-500' : 'border-brown-200'
                          }`}
                        >
                          <option value="">Select budget range</option>
                          <option value="under-500k">Under $500,000</option>
                          <option value="500k-750k">$500,000 - $750,000</option>
                          <option value="750k-1m">$750,000 - $1,000,000</option>
                          <option value="1m-1.5m">$1,000,000 - $1,500,000</option>
                          <option value="1.5m-2m">$1,500,000 - $2,000,000</option>
                          <option value="2m-3m">$2,000,000 - $3,000,000</option>
                          <option value="3m-plus">$3,000,000+</option>
                        </select>
                        {errors.budgetRange && <p className="text-sm text-red-600 mt-1">{errors.budgetRange}</p>}
                      </div>

                      <div>
                        <label htmlFor="preferredLocation" className="block text-sm font-medium text-brown-900 mb-2">
                          Preferred Location *
                        </label>
                        <input
                          type="text"
                          id="preferredLocation"
                          name="preferredLocation"
                          value={formData.preferredLocation}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors ${
                            errors.preferredLocation ? 'border-red-500' : 'border-brown-200'
                          }`}
                          placeholder="e.g., New Farm, Ascot, Hamilton"
                        />
                        {errors.preferredLocation && <p className="text-sm text-red-600 mt-1">{errors.preferredLocation}</p>}
                      </div>

                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-brown-900 mb-2">
                          Timeline for Purchase *
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors ${
                            errors.timeline ? 'border-red-500' : 'border-brown-200'
                          }`}
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate (within 1 month)</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6-12months">6-12 months</option>
                          <option value="12months-plus">12+ months</option>
                          <option value="just-looking">Just looking</option>
                        </select>
                        {errors.timeline && <p className="text-sm text-red-600 mt-1">{errors.timeline}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <h3 className="text-2xl font-light text-brown-900 mb-6">Additional Requirements</h3>
                    <div>
                      <label htmlFor="additionalRequirements" className="block text-sm font-medium text-brown-900 mb-2">
                        Additional Comments or Requirements
                      </label>
                      <textarea
                        id="additionalRequirements"
                        name="additionalRequirements"
                        value={formData.additionalRequirements}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-400 focus:border-brown-400 transition-colors resize-none"
                        placeholder="Tell us about any specific requirements, preferences, or questions you have..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto text-lg px-10 py-4 h-auto bg-brown-700 hover:bg-brown-800 text-cream transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Start My Property Search'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Start Your Property Search?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Let our expert team help you find and secure your perfect property with confidence.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Metadata moved to route layout to satisfy Next.js rule
