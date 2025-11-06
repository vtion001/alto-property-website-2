"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Upload, CheckCircle } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"
import { useState } from "react"

export default function ApplyNowPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    occupation: '',
    currentAddress: '',
    rentAmount: '',
    tenancyLength: '',
    employer: '',
    position: '',
    income: '',
    employmentLength: '',
    preferredProperty: '',
    moveInDate: '',
    leaseLength: '',
    pets: '',
    landlordName: '',
    landlordPhone: '',
    referenceName: '',
    referencePhone: '',
    additionalInfo: '',
    terms: false,
    marketing: false
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required'
    if (!formData.currentAddress.trim()) newErrors.currentAddress = 'Current address is required'
    if (!formData.employer.trim()) newErrors.employer = 'Employer is required'
    if (!formData.position.trim()) newErrors.position = 'Position is required'
    if (!formData.income.trim()) newErrors.income = 'Annual income is required'
    if (!formData.moveInDate) newErrors.moveInDate = 'Preferred move-in date is required'
    if (!formData.terms) newErrors.terms = 'You must agree to the terms and conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center space-y-8 max-w-2xl mx-auto p-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            <h1 className="text-4xl font-light text-brown-800">Application Submitted Successfully!</h1>
            <p className="text-xl text-brown-700 font-light">
              Thank you for your rental application. We will review your application and contact you within 48 hours.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)} 
              className="bg-brown-800 hover:bg-brown-900 text-cream"
            >
              Submit Another Application
            </Button>
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
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Rental Application</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Apply
                    <span className="block font-light text-brown-700 mt-2">Online</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Submit your rental application quickly and securely online. Our streamlined process makes it easy to
                    apply for your next home.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dbviya1rj/image/upload/v1758178205/bqhrhmy5oc1mrbgc9cpr.jpg?height=700&width=600"
                    alt="ALTO Online Rental Application"
                    width={600}
                    height={700}
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-8 mb-16">
                <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Rental Application Form</h2>
                <p className="text-xl font-light text-brown-700">
                  Complete all sections to submit your application. All fields marked with * are required.
                </p>
              </div>

              <Card className="border border-brown-100">
                <CardContent className="p-12">
                  <form className="space-y-12" onSubmit={handleSubmit} noValidate>
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-brown-800 border-b border-brown-100 pb-4">
                        Personal Information
                      </h3>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Enter your first name" 
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={errors.firstName ? 'border-red-500' : ''}
                          />
                          {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Enter your last name" 
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={errors.lastName ? 'border-red-500' : ''}
                          />
                          {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input 
                            id="phone" 
                            placeholder="Enter your phone number" 
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={errors.phone ? 'border-red-500' : ''}
                          />
                          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                          <Input 
                            id="dateOfBirth" 
                            type="date" 
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            className={errors.dateOfBirth ? 'border-red-500' : ''}
                          />
                          {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="occupation">Occupation *</Label>
                          <Input 
                            id="occupation" 
                            placeholder="Enter your occupation" 
                            value={formData.occupation}
                            onChange={(e) => handleInputChange('occupation', e.target.value)}
                            className={errors.occupation ? 'border-red-500' : ''}
                          />
                          {errors.occupation && <p className="text-sm text-red-500 mt-1">{errors.occupation}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Current Address */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-brown-800 border-b border-brown-100 pb-4">
                        Current Address
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="currentAddress">Current Address *</Label>
                        <Input 
                          id="currentAddress" 
                          placeholder="Enter your current address" 
                          value={formData.currentAddress}
                          onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                          className={errors.currentAddress ? 'border-red-500' : ''}
                        />
                        {errors.currentAddress && <p className="text-sm text-red-500 mt-1">{errors.currentAddress}</p>}
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="rentAmount">Current Rent (per week)</Label>
                          <Input 
                            id="rentAmount" 
                            placeholder="$500" 
                            value={formData.rentAmount}
                            onChange={(e) => handleInputChange('rentAmount', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tenancyLength">Length of Tenancy</Label>
                          <Input 
                            id="tenancyLength" 
                            placeholder="2 years" 
                            value={formData.tenancyLength}
                            onChange={(e) => handleInputChange('tenancyLength', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Employment Information */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-brown-800 border-b border-brown-100 pb-4">
                        Employment Information
                      </h3>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="employer">Employer *</Label>
                          <Input 
                            id="employer" 
                            placeholder="Enter employer name" 
                            value={formData.employer}
                            onChange={(e) => handleInputChange('employer', e.target.value)}
                            className={errors.employer ? 'border-red-500' : ''}
                          />
                          {errors.employer && <p className="text-sm text-red-500 mt-1">{errors.employer}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position *</Label>
                          <Input 
                            id="position" 
                            placeholder="Enter your position" 
                            value={formData.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            className={errors.position ? 'border-red-500' : ''}
                          />
                          {errors.position && <p className="text-sm text-red-500 mt-1">{errors.position}</p>}
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="income">Annual Income *</Label>
                          <Input 
                            id="income" 
                            placeholder="$75,000" 
                            value={formData.income}
                            onChange={(e) => handleInputChange('income', e.target.value)}
                            className={errors.income ? 'border-red-500' : ''}
                          />
                          {errors.income && <p className="text-sm text-red-500 mt-1">{errors.income}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employmentLength">Length of Employment</Label>
                          <Input 
                            id="employmentLength" 
                            placeholder="3 years" 
                            value={formData.employmentLength}
                            onChange={(e) => handleInputChange('employmentLength', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Property Preferences */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-brown-800 border-b border-brown-100 pb-4">
                        Property Preferences
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="preferredProperty">Preferred Property Address (if specific)</Label>
                        <Input
                          id="preferredProperty"
                          placeholder="Enter property address if applying for a specific property"
                          value={formData.preferredProperty}
                          onChange={(e) => handleInputChange('preferredProperty', e.target.value)}
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="moveInDate">Preferred Move-in Date *</Label>
                          <Input 
                            id="moveInDate" 
                            type="date" 
                            value={formData.moveInDate}
                            onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                            className={errors.moveInDate ? 'border-red-500' : ''}
                          />
                          {errors.moveInDate && <p className="text-sm text-red-500 mt-1">{errors.moveInDate}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leaseLength">Preferred Lease Length</Label>
                          <Select 
                            value={formData.leaseLength}
                            onValueChange={(value) => handleInputChange('leaseLength', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6months">6 months</SelectItem>
                              <SelectItem value="12months">12 months</SelectItem>
                              <SelectItem value="18months">18 months</SelectItem>
                              <SelectItem value="24months">24 months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pets">Do you have pets?</Label>
                          <Select 
                            value={formData.pets}
                            onValueChange={(value) => handleInputChange('pets', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="yes">Yes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* References */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-brown-800 border-b border-brown-100 pb-4">References</h3>

                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                          <h4 className="text-lg font-light text-brown-800">Previous Landlord/Agent</h4>
                          <div className="space-y-2">
                            <Label htmlFor="landlordName">Name</Label>
                            <Input 
                              id="landlordName" 
                              placeholder="Enter name" 
                              value={formData.landlordName}
                              onChange={(e) => handleInputChange('landlordName', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="landlordPhone">Phone</Label>
                            <Input 
                              id="landlordPhone" 
                              placeholder="Enter phone number" 
                              value={formData.landlordPhone}
                              onChange={(e) => handleInputChange('landlordPhone', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-light text-brown-800">Character Reference</h4>
                          <div className="space-y-2">
                            <Label htmlFor="referenceName">Name</Label>
                            <Input 
                              id="referenceName" 
                              placeholder="Enter name" 
                              value={formData.referenceName}
                              onChange={(e) => handleInputChange('referenceName', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="referencePhone">Phone</Label>
                            <Input 
                              id="referencePhone" 
                              placeholder="Enter phone number" 
                              value={formData.referencePhone}
                              onChange={(e) => handleInputChange('referencePhone', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-brown-800 border-b border-brown-100 pb-4">
                        Additional Information
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo">Additional Comments</Label>
                        <Textarea
                          id="additionalInfo"
                          placeholder="Any additional information you'd like to provide..."
                          rows={4}
                          value={formData.additionalInfo}
                          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={formData.terms}
                          onCheckedChange={(checked) => handleInputChange('terms', checked)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the terms and conditions and privacy policy *
                        </Label>
                      </div>
                      {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="marketing" 
                          checked={formData.marketing}
                          onCheckedChange={(checked) => handleInputChange('marketing', checked)}
                        />
                        <Label htmlFor="marketing" className="text-sm">
                          I would like to receive marketing communications from ALTO REAL ESTATE
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-24 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Application Process</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Submit Application</h3>
                <p className="text-brown-700 font-light">Complete and submit your online application form.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Document Review</h3>
                <p className="text-brown-700 font-light">We review your application and verify references.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Application Decision</h3>
                <p className="text-brown-700 font-light">
                  Receive notification of your application status within 48 hours.
                </p>
              </div>
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

export const metadata: Metadata = {
  title: "Apply Now — Online Rental Application",
  description:
    "Submit your rental application quickly and securely online. Our streamlined process makes it easy to apply for your next home.",
  openGraph: {
    title: "Apply Now — Online Rental Application",
    description:
      "Submit your rental application quickly and securely online. Our streamlined process makes it easy to apply for your next home.",
    url: "/renting/apply-now",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1758178205/bqhrhmy5oc1mrbgc9cpr.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Online Rental Application",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Apply Now — Online Rental Application",
    description:
      "Submit your rental application quickly and securely online. Our streamlined process makes it easy to apply for your next home.",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dbviya1rj/image/upload/v1758178205/bqhrhmy5oc1mrbgc9cpr.jpg"],
  },
}
