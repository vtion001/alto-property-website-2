"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Mail, Clock, TrendingUp, Home, Shield, Users, Calculator } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function FinancePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-brown-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-brown-900 mb-4">Thank You!</h1>
            <p className="text-lg text-brown-700 mb-6">
              We've received your request for a free financial consultation. Our mortgage broker will contact you within
              24 hours to schedule your no-obligation consultation.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="bg-brown-700 hover:bg-brown-800">
              Submit Another Request
            </Button>
          </div>
        </div>
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
              Partner with Alto Property Group and our trusted mortgage broker for seamless property financing. Get
              expert guidance from property search to settlement.
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
            <h2 className="text-3xl font-bold text-brown-900 mb-8">Why Choose Our Finance Partnership?</h2>

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
                  <h3 className="text-xl font-semibold text-brown-900 mb-2">Seamless Process & Facilitation</h3>
                  <p className="text-brown-700">
                    Coordinated service between property search, finance approval, and settlement for a smoother
                    experience.
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
          </div>

          {/* Right Column - Form */}
          <div>
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-br from-brown-50 to-cream text-center pb-4">
                <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-brown-700" />
                </div>
                <CardTitle className="text-2xl text-brown-900">Book Your Free Consultation</CardTitle>
                <CardDescription className="text-brown-600">
                  No obligation • Expert advice • Personalized solutions
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-brown-800 font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 border-brown-200 focus:border-brown-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-brown-800 font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 border-brown-200 focus:border-brown-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-brown-800 font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 border-brown-200 focus:border-brown-500"
                      placeholder="0400 000 000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredTime" className="text-brown-800 font-medium">
                      Preferred Call Time
                    </Label>
                    <Input
                      id="preferredTime"
                      name="preferredTime"
                      type="text"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="mt-1 border-brown-200 focus:border-brown-500"
                      placeholder="e.g., Weekday mornings, After 6pm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-brown-800 font-medium">
                      How Can We Help? (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 border-brown-200 focus:border-brown-500 resize-none"
                      rows={3}
                      placeholder="Tell us about your property goals or any specific questions..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brown-700 hover:bg-brown-800 text-white py-3 text-lg font-semibold"
                  >
                    Book Free Consultation
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-brown-100">
                  <div className="flex items-center justify-center gap-6 text-sm text-brown-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>24hr Response</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>100% Confidential</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-6 p-4 bg-brown-50 rounded-lg">
              <h4 className="font-semibold text-brown-900 mb-2">Prefer to Call Directly?</h4>
              <div className="space-y-1 text-sm text-brown-700">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Property Specialist: (07) 3000 0000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Mortgage Broker: (07) 3000 0001</span>
                </div>
              </div>
            </div>
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
    </div>
  )
}
