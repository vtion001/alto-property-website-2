import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Bell } from "lucide-react"
import Image from "next/image"

export default function PropertyMatchPage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Property Match</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Find Your
                    <span className="block font-light text-brown-700 mt-2">Perfect</span>
                    <span className="block font-extralight text-brown-600 mt-2">Match</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Let our experts find properties that perfectly match your criteria. We'll notify you of new listings
                    before they hit the market.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=700&width=600"
                    alt="Property matching service"
                    width={600}
                    height={700}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Match Form */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-8 mb-16">
                <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Tell Us What You're Looking For</h2>
                <p className="text-xl font-light text-brown-700">
                  Complete this form and we'll match you with properties that meet your exact requirements.
                </p>
              </div>

              <Card className="border border-brown-100">
                <CardContent className="p-12">
                  <form className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="unit">Unit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bedrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bathrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="minPrice">Minimum Price</Label>
                        <Input id="minPrice" placeholder="$500,000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxPrice">Maximum Price</Label>
                        <Input id="maxPrice" placeholder="$1,000,000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="suburbs">Preferred Suburbs</Label>
                      <Input id="suburbs" placeholder="e.g., New Farm, South Bank, Paddington" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Additional Requirements</Label>
                      <Textarea
                        id="requirements"
                        placeholder="Tell us about any specific features or requirements you're looking for..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base"
                    >
                      Start Property Matching
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">How Property Match Works</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Tell Us Your Preferences</h3>
                <p className="text-brown-700 font-light">Complete our detailed form with your property requirements.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">We Search For You</h3>
                <p className="text-brown-700 font-light">
                  Our experts actively search for properties matching your criteria.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Bell className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Get Notified First</h3>
                <p className="text-brown-700 font-light">
                  Receive alerts for new properties before they're publicly listed.
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
            <p className="text-brown-200">© {new Date().getFullYear()} Alto Property Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
