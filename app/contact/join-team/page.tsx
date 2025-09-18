"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Award, Heart } from "lucide-react"
import { useState } from "react"

export default function JoinTeamPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validate field on change
    if (value.trim() !== '') {
      validateField(name, value)
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateField = (fieldName: string, value: string) => {
    const newErrors = { ...errors }
    
    switch (fieldName) {
      case 'firstName':
        if (value.trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters'
        } else {
          delete newErrors.firstName
        }
        break
      case 'lastName':
        if (value.trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters'
        } else {
          delete newErrors.lastName
        }
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'phone':
        const phoneRegex = /^(\+?61|0)[2-9][0-9]{8}$|^(\([0-9]{2,3}\)\s?[0-9]{3,4}\s?[0-9]{3,4})$/
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid Australian phone number'
        } else {
          delete newErrors.phone
        }
        break
      case 'position':
        if (value === '' || value === 'Select a position') {
          newErrors.position = 'Please select a position'
        } else {
          delete newErrors.position
        }
        break
      case 'coverLetter':
        if (value.trim().length < 50) {
          newErrors.coverLetter = 'Cover letter must be at least 50 characters'
        } else {
          delete newErrors.coverLetter
        }
        break
    }
    
    setErrors(newErrors)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // First Name validation
    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }
    
    // Last Name validation
    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    const phoneRegex = /^(\+?61|0)[2-9][0-9]{8}$|^(\([0-9]{2,3}\)\s?[0-9]{3,4}\s?[0-9]{3,4})$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Australian phone number'
    }
    
    // Position validation
    if (formData.position === '' || formData.position === 'Select a position') {
      newErrors.position = 'Please select a position'
    }
    
    // Cover Letter validation
    if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = 'Cover letter must be at least 50 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid = () => {
    return (
      formData.firstName.trim().length >= 2 &&
      formData.lastName.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      /^(\+?61|0)[2-9][0-9]{8}$|^(\([0-9]{2,3}\)\s?[0-9]{3,4}\s?[0-9]{3,4})$/.test(formData.phone.replace(/\s/g, '')) &&
      formData.position !== '' &&
      formData.position !== 'Select a position' &&
      formData.coverLetter.trim().length >= 50 &&
      Object.keys(errors).length === 0
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Here you would typically send the data to your API
      console.log('Form submitted:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show thank you message
      setShowThankYou(true)
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        coverLetter: ''
      })
      setErrors({})
      
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Structured and personally strategized career progression with ongoing training and development opportunities.",
    },
    {
      icon: Award,
      title: "Competitive Commission",
      description: "We believe in getting paid fairly for what you do, our commission structure will surprise you.",
    },
    {
      icon: Users,
      title: "Supportive Culture",
      description: "Join a collaborative team that values genuine connections.",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and a culture that values personal wellbeing without sacrificing success.",
    },
  ]

  const openPositions = [
    {
      title: "Mortgage Broker",
      type: "Full-time",
      location: "Brisbane CBD",
      description:
        "Work closely with our sales team to deliver finance solutions for buyers. Access 40+ lenders, warm lead flow, and strong support to help clients secure the best outcomes.",
    },
    {
      title: "Sales Associate",
      type: "Full-time",
      location: "Brisbane CBD",
      description:
        "Opportunity for an ambitious sales professional to work with luxury properties and high-net-worth clients.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Careers</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Join Our
                <span className="block font-light text-brown-700 mt-2">Exceptional</span>
                <span className="block font-extralight text-brown-600 mt-2">Team</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Build your career with Brisbane's most trusted property specialists. We're looking for passionate
                professionals who share our commitment to exceptional results and genuine care.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Alto - Joshua's Story */}
        <section className="py-32 bg-gradient-to-br from-brown-50 to-stone-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Why Join Alto</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">A Life-Changing Opportunity</h2>
            </div>
            
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="bg-white p-12 rounded-lg shadow-lg border border-brown-100">
                <blockquote className="text-xl font-light text-brown-800 leading-relaxed italic mb-8">
                  "Having come from humble beginnings, Joshua had $500 left in his bank account before. Real estate changed his life, and he is committed to make sure to help others achieve the same."
                </blockquote>
                <p className="text-lg font-light text-brown-700 leading-relaxed">
                  If you're committed to improving yourself, genuine, eager to learn and go to the next level, you've come to the right place. We pride ourselves in collaboration, with the support of innovative systems, processes, structure and strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us - Benefits */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Why Work With Us</h2>
              <p className="text-xl text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Join a team that invests in your success and provides the tools you need to thrive.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border border-brown-100 hover:shadow-xl transition-all duration-500 text-center"
                >
                  <CardContent className="p-8">
                    <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="h-10 w-10 text-brown-700" />
                    </div>
                    <h3 className="text-xl font-light text-brown-900 mb-4">{benefit.title}</h3>
                    <p className="text-brown-700 font-light leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-32 bg-gradient-to-br from-brown-50 to-stone-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Current Opportunities</h2>
              <p className="text-xl text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Explore our current openings and take the next step in your property career.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                {openPositions.map((position, index) => (
                  <Card key={index} className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-brown-900 font-light">{position.title}</CardTitle>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="secondary" className="bg-brown-100 text-brown-800">
                              {position.type}
                            </Badge>
                            <span className="text-sm text-brown-600">{position.location}</span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-brown-700 font-light mt-4">
                        {position.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream font-light">
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Application Form */}
              <Card className="border border-brown-100 shadow-xl h-fit">
                <CardHeader>
                  <CardTitle className="text-2xl text-brown-900 font-light">Apply Today</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Submit your application and we'll be in touch within 48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {showThankYou ? (
                    <div className="text-center space-y-6 py-8">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex justify-center mb-4">
                          <div className="bg-green-100 rounded-full p-3">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-light text-green-800 mb-2">Thank You for Your Application!</h3>
                        <p className="text-green-700 font-light leading-relaxed mb-4">
                          We've received your application and will be in touch within 48 hours. We're excited to learn more about you and your interest in joining the Alto team.
                        </p>
                        <Button 
                          onClick={() => setShowThankYou(false)}
                          className="bg-brown-900 hover:bg-brown-800 text-cream font-light"
                        >
                          Submit Another Application
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-brown-900">First Name *</label>
                          <Input 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John" 
                            className={`${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-brown-200 focus:border-brown-400'}`}
                            required
                          />
                          {errors.firstName && (
                            <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-brown-900">Last Name *</label>
                          <Input 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe" 
                            className={`${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-brown-200 focus:border-brown-400'}`}
                            required
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brown-900">Email *</label>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          type="email"
                          placeholder="john@example.com"
                          className={`${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-brown-200 focus:border-brown-400'}`}
                          required
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brown-900">Phone *</label>
                        <Input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(07) 1234 5678" 
                          className={`${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-brown-200 focus:border-brown-400'}`}
                          required
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brown-900">Position of Interest *</label>
                        {errors.position && (
                          <p className="text-sm text-red-600 mb-1">{errors.position}</p>
                        )}
                        <select 
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ${errors.position ? 'border-red-500 focus:ring-red-500' : 'border-brown-200'}`}
                          required
                        >
                          <option value="">Select a position</option>
                          <option value="Mortgage Broker">Mortgage Broker</option>
                          <option value="Sales Associate">Sales Associate</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brown-900">Cover Letter *</label>
                        <textarea
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          className={`flex min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.coverLetter ? 'border-red-500 focus:ring-red-500' : 'border-brown-200 focus:ring-brown-400'}`}
                          placeholder="Tell us why you'd like to join the Alto team..."
                          rows={4}
                          required
                        />
                        {errors.coverLetter && (
                          <p className="text-sm text-red-600 mt-1">{errors.coverLetter}</p>
                        )}
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 h-auto font-light tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting || !isFormValid()}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
