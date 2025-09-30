"use client"

import type React from "react"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, TrendingUp, Home, Shield, Users, Calculator } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Script from "next/script"

export default function FinancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    primaryPurpose: [] as string[],
    preferredContactTime: "Morning (8am - 12pm)"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      primaryPurpose: checked 
        ? [...prev.primaryPurpose, value]
        : prev.primaryPurpose.filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/BsBEKMz2Dy57PRbfOSXz/webhook-trigger/TlSEqEA1jPx2S3lnznNK', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Finance Page Consultation'
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
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-brown-50">
        <Navigation />
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-light sm:text-5xl text-brown-800">Thank You!</h1>
              <p className="text-xl text-brown-700 font-light leading-relaxed">
                Your consultation request has been submitted successfully.
              </p>
              <p className="text-brown-600 font-light">
                Our finance specialist will contact you within 24 hours to schedule your free consultation.
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
                  message: "",
                  primaryPurpose: [],
                  preferredContactTime: "Morning (8am - 12pm)"
                })
              }}
              className="bg-brown-700 hover:bg-brown-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Submit Another Request
            </button>
          </div>
        </div>
        <footer className="bg-brown-800 py-8 text-center">
          <div className="container mx-auto px-4">
            <p className="text-brown-200">© {new Date().getFullYear()} ALTO Property. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-brown-50">
      <Navigation />
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-brown-800 to-brown-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold-500 text-brown-900 mb-4">No Obligation Consultation</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert Mortgage & Finance Solutions</h1>
            <p className="text-xl mb-8 text-brown-100">
              Through our trusted referral network, we connect you with experienced mortgage brokers and finance specialists for seamless property financing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Free Financial Health Check</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No Upfront Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Benefits */}
          <div>
            <h2 className="text-3xl font-bold text-brown-900 mb-8">Why Choose Our Finance Referral Network?</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-brown-100 p-3 rounded-full flex-shrink-0">
                  <Calculator className="h-6 w-6 text-brown-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brown-900 mb-2">Free Financial Health Check</h3>
                  <p className="text-brown-700">
                    Comprehensive assessment of your financial position with personalized recommendations for
                    improvement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brown-100 p-3 rounded-full flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-brown-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brown-900 mb-2">Strategic Planning Before You Buy</h3>
                  <p className="text-brown-700">
                    Learn how to position yourself for property success with pre-approval strategies and market timing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brown-100 p-3 rounded-full flex-shrink-0">
                  <Home className="h-6 w-6 text-brown-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brown-900 mb-2">Investment Portfolio Growth</h3>
                  <p className="text-brown-700">
                    Expert advice on building and expanding your property investment portfolio for long-term wealth.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brown-100 p-3 rounded-full flex-shrink-0">
                  <Shield className="h-6 w-6 text-brown-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brown-900 mb-2">First Home Buyers Guide</h3>
                  <p className="text-brown-700">
                    Navigate grants, schemes, and strategies specifically designed for first-time property buyers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brown-100 p-3 rounded-full flex-shrink-0">
                  <Users className="h-6 w-6 text-brown-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brown-900 mb-2">Trusted Referral Network</h3>
                  <p className="text-brown-700">
                    Access our carefully selected network of experienced mortgage brokers and finance specialists who understand the property market inside and out.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 p-6 bg-brown-50 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-brown-900">500+</div>
                <div className="text-sm text-brown-600">Loans Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brown-900">$200M+</div>
                <div className="text-sm text-brown-600">Loans Settled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brown-900">4.9★</div>
                <div className="text-sm text-brown-600">Client Rating</div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold text-brown-900">What's Included Through Our Referral Network</h3>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-brown-900">Expert Broker Matching</p>
                    <p className="text-sm text-brown-700">We'll connect you with the most suitable broker from our network based on your specific needs and circumstances.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-brown-900">Borrowing Capacity Assessment</p>
                    <p className="text-sm text-brown-700">Understand exactly how much you can borrow based on your current financial position.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-brown-900">Loan Structure Optimization</p>
                    <p className="text-sm text-brown-700">Learn about different loan structures that could save you thousands in interest.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-brown-900">Government Grants & Schemes</p>
                    <p className="text-sm text-brown-700">Discover available grants, stamp duty concessions, and first home buyer benefits.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-brown-900">Pre-Approval Strategy</p>
                    <p className="text-sm text-brown-700">Position yourself as a strong buyer with conditional approval before you start searching.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-8 p-6 bg-gradient-to-br from-brown-50 to-cream rounded-xl border border-brown-100">
              <div className="flex items-start gap-4">
                <div className="bg-brown-700 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">"</span>
                </div>
                <div>
                  <p className="text-brown-800 italic mb-3">
                    "Through the referral network, we connected with an amazing broker who helped us secure our first investment property with a strategy that saved us $40,000 in the first year alone."
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold text-brown-900">Sarah & Michael Chen</p>
                    <p className="text-brown-600">First-time investors, Paddington</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 p-4 bg-brown-50 rounded-lg">
              <h4 className="font-semibold text-brown-900 mb-2">Ready to Get Started?</h4>
              <div className="space-y-1 text-sm text-brown-700">
                <p>Complete the form to connect with a specialist from our trusted referral network. We'll match you with the right expert for your specific needs.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-brown-50 to-cream text-center">
              <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-brown-700" />
              </div>
              <CardTitle className="text-2xl text-brown-900">Connect With Our Referral Network</CardTitle>
              <CardDescription className="text-brown-600">
                Get matched with trusted finance specialists • No obligation • Expert guidance
              </CardDescription>
            </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Tell me more about yourself */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Tell me more about yourself</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="flex min-h-[100px] w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
                      placeholder="Share your current situation, goals, or any specific questions you have..."
                      rows={4}
                    />
                  </div>

                  {/* Client Purpose Checkboxes */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-brown-900">What's your primary purpose? (Select all that apply)</label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="first-home-buyer"
                          checked={formData.primaryPurpose.includes("first-home-buyer")}
                          onChange={(e) => handleCheckboxChange("first-home-buyer", e.target.checked)}
                          className="h-4 w-4 rounded border-brown-300 text-brown-600 focus:ring-brown-500"
                        />
                        <label htmlFor="first-home-buyer" className="text-sm text-brown-800">
                          First home buyer
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="rate-review"
                          checked={formData.primaryPurpose.includes("rate-review")}
                          onChange={(e) => handleCheckboxChange("rate-review", e.target.checked)}
                          className="h-4 w-4 rounded border-brown-300 text-brown-600 focus:ring-brown-500"
                        />
                        <label htmlFor="rate-review" className="text-sm text-brown-800">
                          Rate review
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="cashing-out"
                          checked={formData.primaryPurpose.includes("cashing-out")}
                          onChange={(e) => handleCheckboxChange("cashing-out", e.target.checked)}
                          className="h-4 w-4 rounded border-brown-300 text-brown-600 focus:ring-brown-500"
                        />
                        <label htmlFor="cashing-out" className="text-sm text-brown-800">
                          Cashing out
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="investing"
                          checked={formData.primaryPurpose.includes("investing")}
                          onChange={(e) => handleCheckboxChange("investing", e.target.checked)}
                          className="h-4 w-4 rounded border-brown-300 text-brown-600 focus:ring-brown-500"
                        />
                        <label htmlFor="investing" className="text-sm text-brown-800">
                          Investing in another one
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="sell-to-buy"
                          checked={formData.primaryPurpose.includes("sell-to-buy")}
                          onChange={(e) => handleCheckboxChange("sell-to-buy", e.target.checked)}
                          className="h-4 w-4 rounded border-brown-300 text-brown-600 focus:ring-brown-500"
                        />
                        <label htmlFor="sell-to-buy" className="text-sm text-brown-800">
                          Sell to buy
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Preferred Contact Time */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Preferred Contact Time</label>
                    <select 
                      name="preferredContactTime"
                      value={formData.preferredContactTime}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
                    >
                      <option>Morning (8am - 12pm)</option>
                      <option>Afternoon (12pm - 5pm)</option>
                      <option>Evening (5pm - 7pm)</option>
                      <option>Any time</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brown-700 hover:bg-brown-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Free Consultation'}
                  </button>

                  <p className="text-xs text-brown-600 text-center">
                    By submitting this form, you agree to receive marketing communications from Alto Property. We respect your privacy and you can unsubscribe at any time.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-16 bg-brown-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-900 mb-4">Our Simple 3-Step Process</h2>
            <p className="text-lg text-brown-700">
              From consultation to settlement, we guide you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-brown-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-brown-900 mb-3">Free Consultation</h3>
              <p className="text-brown-700">
                Discuss your goals, assess your financial position, and explore your options with no obligation.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brown-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-brown-900 mb-3">Tailored Strategy</h3>
              <p className="text-brown-700">
                Receive a personalized finance strategy and pre-approval to strengthen your property search.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brown-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-brown-900 mb-3">Seamless Settlement</h3>
              <p className="text-brown-700">
                Coordinated support through property purchase, loan approval, and settlement process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-brown-800 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-brown-200">© {new Date().getFullYear()} ALTO Property. All rights reserved.</p>
        </div>
      </footer>

      <Script 
        src="https://link.msgsndr.com/js/form_embed.js" 
        type="text/javascript"
        strategy="afterInteractive"
      />
    </div>
  )
}