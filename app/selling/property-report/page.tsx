"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calculator, TrendingUp, FileText, MapPin, Clock, Award, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function PropertyReportPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formSectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    reportType: "market-analysis",
    streetAddress: "",
    city: "",
    state: "",
    country: "Australia",
    postalCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreeToTerms: false
  })

  // Handle scroll to form on navigation with hash
  useEffect(() => {
    if (window.location.hash === '#report-form') {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleReportTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      reportType: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save to Admin Inquiries
      try {
        await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            subject: 'Property Report Request',
            message: `Report type: ${formData.reportType}`,
            source: 'Property Report',
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            postalCode: formData.postalCode,
          })
        })
      } catch {}

      // Submit form data to webhook
      const response = await fetch('https://services.leadconnectorhq.com/hooks/BsBEKMz2Dy57PRbfOSXz/webhook-trigger/LnbHjtYQ91aMmN4maWrA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportType: formData.reportType,
          streetAddress: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          agreeToTerms: formData.agreeToTerms,
          timestamp: new Date().toISOString(),
          source: 'Property Report Request'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error('Failed to submit form:', response.statusText)
        // Still show success message to user for better UX
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Still show success message to user for better UX
      setIsSubmitted(true)
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
                  Your {formData.reportType === 'property-appraisal' ? 'Property Appraisal' : 'Market Analysis'} request has been submitted successfully.
                </p>
                <p className="text-brown-600 font-light">
                  We&apos;ll prepare your comprehensive report and send it to <strong>{formData.email}</strong> within 24 hours.
                </p>
              </div>

              <div className="bg-brown-50 rounded-2xl p-8 space-y-4">
                <h3 className="text-xl font-light text-brown-800">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="bg-brown-200 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-xs font-medium">1</div>
                    <p className="text-brown-700 font-light">Our property specialists will analyze your request</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-brown-200 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-xs font-medium">2</div>
                    <p className="text-brown-700 font-light">We&apos;ll prepare your detailed report with market insights</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-brown-200 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-xs font-medium">3</div>
                    <p className="text-brown-700 font-light">Your report will be emailed within 24 hours</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-brown-200 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-xs font-medium">4</div>
                    <p className="text-brown-700 font-light">A specialist will follow up to discuss your options</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-brown-600 font-light">
                  Questions? Contact us at <a href="tel:0730000000" className="text-brown-800 underline">(07) 3000 0000</a>
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      reportType: "market-analysis",
                      streetAddress: "",
                      city: "",
                      state: "",
                      country: "Australia",
                      postalCode: "",
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      agreeToTerms: false
                    })
                  }}
                  variant="outline"
                  className="border-brown-300 text-brown-800 hover:bg-brown-50"
                >
                  Submit Another Request
                </Button>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-brown-900 text-cream py-16">
          <div className="container">
            <div className="text-center">
              <p className="text-brown-200">© {new Date().getFullYear()} ALTO REAL ESTATE. All rights reserved.</p>
            </div>
          </div>
        </footer>
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
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Property Analysis</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Comprehensive
                    <span className="block font-light text-brown-700 mt-2">Market</span>
                    <span className="block font-extralight text-brown-600 mt-2">Analysis</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Get a detailed Comparative Market Analysis (CMA) report including recent sales data, market trends,
                    property condition assessment, and strategic pricing recommendations.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                    onClick={() => document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Free Report
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    View Sample Report
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dbviya1rj/image/upload/v1758168347/jtq5vygiy1bsjw1jvcg9.jpg"
                    alt="Professional property analysis and market report"
                    width={500}
                    height={600}
                    priority
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Request Form */}
        <section id="report-form" ref={formSectionRef} className="py-32 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-8 mb-16">
                <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Request Your Property Report</h2>
                <p className="text-xl font-light text-brown-700">
                  Complete this form to receive a comprehensive market analysis report within 24 hours, including
                  comparable sales data and strategic recommendations.
                </p>
              </div>

              <Card className="border border-brown-100 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl text-brown-900 font-light">Property Analysis Request</CardTitle>
                  <CardDescription className="text-brown-700 font-light text-lg">
                    Provide detailed property information for accurate market analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Report Type Selection */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Report Type
                      </h3>

                      <RadioGroup
                        value={formData.reportType}
                        onValueChange={handleReportTypeChange}
                        className="space-y-4"
                      >
                        <div className="flex items-start space-x-3 p-4 border border-brown-100 rounded-lg hover:bg-brown-50 transition-colors">
                          <RadioGroupItem value="market-analysis" id="market-analysis" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="market-analysis" className="text-base font-medium text-brown-900 cursor-pointer">
                              Comprehensive Market Analysis Report
                            </Label>
                            <p className="text-sm text-brown-600 mt-1">
                              Detailed analysis of recent sales, market trends, comparable properties, and strategic pricing recommendations for your property.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-4 border border-brown-100 rounded-lg hover:bg-brown-50 transition-colors">
                          <RadioGroupItem value="property-appraisal" id="property-appraisal" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="property-appraisal" className="text-base font-medium text-brown-900 cursor-pointer">
                              Property Appraisal Report
                            </Label>
                            <p className="text-sm text-brown-600 mt-1">
                              Professional property valuation with current market value assessment, condition analysis, and improvement recommendations.
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Property Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Property Information
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="streetAddress">Street Address *</Label>
                        <Input
                          id="streetAddress"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                          placeholder="e.g., 32 Veronica Avenue"
                          className="border-brown-200 focus:border-brown-400"
                          required
                        />
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g., Daisy Hill"
                            className="border-brown-200 focus:border-brown-400"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="e.g., QLD"
                            className="border-brown-200 focus:border-brown-400"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code *</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="e.g., 4127"
                            className="border-brown-200 focus:border-brown-400"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="e.g., Australia"
                            className="border-brown-200 focus:border-brown-400"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Contact Information
                      </h3>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            className="border-brown-200 focus:border-brown-400"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            className="border-brown-200 focus:border-brown-400"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="border-brown-200 focus:border-brown-400"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="border-brown-200 focus:border-brown-400"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: !!checked }))}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to receive my property report and marketing communications from ALTO REAL ESTATE *
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || !formData.agreeToTerms}
                        className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : `Submit ${formData.reportType === 'property-appraisal' ? 'Appraisal' : 'Analysis'} Request`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What&apos;s Included Section */}
        <section className="py-24 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">What&apos;s Included in Your Report</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                Our comprehensive market analysis provides everything you need to make informed property decisions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Comparative Market Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Detailed analysis of recent sales, current listings, and market trends in your area with comparable
                    properties.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Market Trends &amp; Forecasting</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Current market conditions, price trends, and future market predictions for your suburb and property
                    type.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Location Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Comprehensive location assessment including amenities, transport, schools, and development plans.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Strategic Recommendations</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Expert advice on pricing strategy, timing, and property improvements to maximize your return.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Market Timing Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Optimal timing recommendations based on seasonal trends, market cycles, and economic indicators.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Professional Consultation</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Follow-up consultation with our property specialists to discuss your report and answer questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready for Your Property Analysis?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get comprehensive market insights and strategic recommendations from Brisbane&apos;s property specialists.
                Your detailed report will be ready within 24 hours.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                onClick={() => document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Free Property Report
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-brown-200">© {new Date().getFullYear()} ALTO REAL ESTATE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Metadata moved to route layout to satisfy Next.js rule