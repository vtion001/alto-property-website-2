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

export default function ApplyNowPage() {
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
                    src="/placeholder.svg?height=700&width=600"
                    alt="Online rental application"
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
                  <form className="space-y-12">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-light text-brown-800 border-b border-brown-100 pb-4">
                        Personal Information
                      </h3>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" placeholder="Enter your first name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" placeholder="Enter your last name" required />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" placeholder="Enter your email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input id="phone" placeholder="Enter your phone number" required />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                          <Input id="dateOfBirth" type="date" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="occupation">Occupation *</Label>
                          <Input id="occupation" placeholder="Enter your occupation" required />
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
                        <Input id="currentAddress" placeholder="Enter your current address" required />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="rentAmount">Current Rent (per week)</Label>
                          <Input id="rentAmount" placeholder="$500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tenancyLength">Length of Tenancy</Label>
                          <Input id="tenancyLength" placeholder="2 years" />
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
                          <Input id="employer" placeholder="Enter employer name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position *</Label>
                          <Input id="position" placeholder="Enter your position" required />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="income">Annual Income *</Label>
                          <Input id="income" placeholder="$75,000" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employmentLength">Length of Employment</Label>
                          <Input id="employmentLength" placeholder="3 years" />
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
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="moveInDate">Preferred Move-in Date *</Label>
                          <Input id="moveInDate" type="date" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leaseLength">Preferred Lease Length</Label>
                          <Select>
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
                          <Select>
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
                            <Input id="landlordName" placeholder="Enter name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="landlordPhone">Phone</Label>
                            <Input id="landlordPhone" placeholder="Enter phone number" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-light text-brown-800">Character Reference</h4>
                          <div className="space-y-2">
                            <Label htmlFor="referenceName">Name</Label>
                            <Input id="referenceName" placeholder="Enter name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="referencePhone">Phone</Label>
                            <Input id="referencePhone" placeholder="Enter phone number" />
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
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the terms and conditions and privacy policy *
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing" />
                        <Label htmlFor="marketing" className="text-sm">
                          I would like to receive marketing communications from Alto Property Group
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base"
                    >
                      Submit Application
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
            <p className="text-brown-200">© {new Date().getFullYear()} Alto Property Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
