
"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Lock, Star, Users, CheckCircle } from "lucide-react"

export default function OffMarketPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budgetRange: "$500k - $750k",
    preferredAreas: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/BsBEKMz2Dy57PRbfOSXz/webhook-trigger/H72d52wmeVAUwEmZxaTv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          budgetRange: formData.budgetRange,
          preferredAreas: formData.preferredAreas,
          timestamp: new Date().toISOString(),
          source: 'Off-Market Property Registration'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error('Failed to submit form:', response.statusText)
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
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
                <h1 className="text-4xl font-light sm:text-5xl text-brown-800">Welcome to Our Exclusive Network!</h1>
                <p className="text-xl text-brown-700 font-light leading-relaxed">
                  Your off-market property registration has been submitted successfully.
                </p>
                <p className="text-brown-600 font-light">
                  We'll notify you at <strong>{formData.email}</strong> as soon as exclusive properties matching your criteria become available.
                </p>
              </div>

              <div className="bg-brown-50 rounded-2xl p-8 space-y-4">
                <h3 className="text-xl font-light text-brown-800">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="bg-brown-200 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-xs font-medium">1</div>
                    <p className="text-brown-700 font-light">We'll create your exclusive buyer profile</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-brown-200 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-xs font-medium">2</div>
                    <p className="text-brown-700 font-light">You'll receive first access to matching off-market properties</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-brown-200 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-xs font-medium">3</div>
                    <p className="text-brown-700 font-light">Our team will contact you within 24 hours</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-brown-200 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 text-xs font-medium">4</div>
                    <p className="text-brown-700 font-light">We'll arrange private inspections for suitable properties</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-brown-600 font-light">
                  Questions? Contact us at <a href="tel:(+61) 467 048 837" className="text-brown-800 underline">(+61) 467 048 837</a>
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      budgetRange: "$500k - $750k",
                      preferredAreas: ""
                    })
                  }}
                  variant="outline"
                  className="border-brown-300 text-brown-800 hover:bg-brown-50"
                >
                  Register Another Profile
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
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Exclusive Access</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                    Off-Market
                    <span className="block font-light text-brown-700 mt-2">Property</span>
                    <span className="block font-extralight text-brown-600 mt-2">Listings</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Access exclusive properties before they hit the public market. Our off-market network gives you
                    first opportunity on premium properties.
                  </p>
                </div>
              </div>
              <Card className="border border-brown-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-brown-900 font-light">Access Off-Market Properties</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Register to receive exclusive off-market property opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-brown-900">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="border-brown-200 focus:border-brown-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-brown-900">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="border-brown-200 focus:border-brown-400"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-brown-900">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="border-brown-200 focus:border-brown-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-brown-900">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(07) 1234 5678"
                        className="border-brown-200 focus:border-brown-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetRange" className="text-sm font-medium text-brown-900">Budget Range *</Label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm focus:border-brown-400"
                        required
                      >
                        <option value="$500k - $750k">$500k - $750k</option>
                        <option value="$750k - $1M">$750k - $1M</option>
                        <option value="$1M - $1.5M">$1M - $1.5M</option>
                        <option value="$1.5M - $2M">$1.5M - $2M</option>
                        <option value="$2M+">$2M+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredAreas" className="text-sm font-medium text-brown-900">Preferred Areas</Label>
                      <Input
                        id="preferredAreas"
                        name="preferredAreas"
                        value={formData.preferredAreas}
                        onChange={handleInputChange}
                        placeholder="New Farm, Teneriffe, South Brisbane"
                        className="border-brown-200 focus:border-brown-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 h-auto font-light tracking-wide disabled:opacity-50"
                    >
                      {isSubmitting ? 'Registering...' : 'Register for Off-Market Access'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Why Off-Market Properties?</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Exclusive Access</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    See properties before they're advertised to the general public.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Less Competition</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Fewer buyers competing means better negotiating position.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Premium Properties</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Access to high-quality properties in sought-after locations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Privacy</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Discreet sales process without public marketing exposure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready for Exclusive Access?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Join our exclusive network and be the first to know about premium off-market opportunities.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Register Now
              </Button>
            </div>
          </div>
        </section>
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
