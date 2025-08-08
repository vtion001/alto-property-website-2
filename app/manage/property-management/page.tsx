
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, TrendingUp, CheckCircle, Settings, Shield, Clock, FileText, Phone, Calculator, Home, Camera, Wrench } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PropertyManagementPage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">
                      Professional Property Management
                    </div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Expert
                    <span className="block font-light text-brown-700 mt-2">Property</span>
                    <span className="block font-extralight text-brown-600 mt-2">Management</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Maximize your investment returns with our comprehensive property management services across South-East Queensland. We handle everything so you don't have to.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                  >
                    Get Free Appraisal
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Get in Touch to Discuss Options
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=700&width=600"
                    alt="Professional property management"
                    width={600}
                    height={700}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Management Solutions */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Complete Management</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">The Alto Property Advantage</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                From tenant acquisition to property maintenance, we provide end-to-end management services for your
                investment property. Our strategic approach consistently delivers exceptional results through genuine care.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Users className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Tenant Management</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Complete tenant lifecycle management from screening to move-out.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Rigorous tenant screening</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Lease preparation & management</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Rent collection & arrears</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Tenant communication & support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Wrench className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Property Maintenance</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Proactive maintenance and repairs to protect your investment value.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">24/7 emergency maintenance</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Regular property inspections</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Trusted contractor network</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Preventive maintenance programs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <FileText className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Financial Reporting</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Detailed financial reporting and tax-ready documentation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Monthly financial statements</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Annual tax summaries</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Online owner portal</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Real-time financial tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Camera className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Property Inspections</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Regular inspections to monitor property condition and compliance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Quarterly routine inspections</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Detailed photo reports</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Compliance monitoring</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Issue identification & resolution</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Calculator className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Rent Collection</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Efficient rent collection and arrears management systems.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Automated rent collection</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Arrears management</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Payment tracking & reporting</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Legal action coordination</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Phone className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">24/7 Support</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Round-the-clock support for both property owners and tenants.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Emergency contact service</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Dedicated property manager</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Multi-channel communication</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Priority response times</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Alto Advantage Features */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="bg-brown-50 w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                  <TrendingUp className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Higher Returns</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Our strategic approach consistently delivers above-market rental returns for our clients.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-brown-50 w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                  <Clock className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Faster Leasing</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Average vacancy period of just 14 days through our extensive marketing network.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-brown-50 w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                  <Shield className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Asset Protection</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Comprehensive insurance and maintenance programs protect your investment.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-brown-50 w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                  <Home className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Value-Added Services</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Property styling, market analysis, insurance coordination, and concierge services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rental Appraisal Form */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-8 mb-16">
                <div className="inline-block">
                  <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Free Rental Appraisal</div>
                  <div className="w-16 h-px bg-brown-300 mx-auto"></div>
                </div>
                <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Get Your Property Valued</h2>
                <p className="text-xl font-light text-brown-700">
                  Discover your property's rental potential with our comprehensive market analysis.
                </p>
              </div>

              <Card className="border border-brown-100 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl text-brown-900 font-light">Rental Appraisal Request</CardTitle>
                  <CardDescription className="text-brown-700 font-light text-lg">
                    Provide your details for a comprehensive rental assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <form className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="border-brown-200 focus:border-brown-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="border-brown-200 focus:border-brown-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="border-brown-200 focus:border-brown-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Property Address *</Label>
                      <Input
                        id="address"
                        placeholder="Enter the complete property address"
                        className="border-brown-200 focus:border-brown-400"
                        required
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to receive my rental appraisal report and marketing communications from Alto Property *
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base"
                      >
                        Get My Free Rental Appraisal
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Maximize Your Investment?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get in touch to discuss your property management options and discover how we can help you achieve exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                >
                  Get Free Appraisal
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 h-auto border-cream text-cream hover:bg-cream hover:text-brown-900 bg-transparent"
                >
                  Call (+61) 467 048 837
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Image src="/alto-logo.png" alt="Alto Property" width={40} height={40} className="h-10 w-10" />
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-wider">ALTO</span>
                  <span className="text-xs text-brown-200 tracking-widest">PROPERTY</span>
                </div>
              </div>
              <p className="text-brown-200 leading-relaxed">
                South-East Queensland's premier property management company, delivering exceptional results through genuine care.
              </p>
              <div className="text-sm text-brown-300 italic">"Exceptional Results. Genuine Care."</div>
            </div>

            <div className="space-y-6">
              <h3 className="font-medium text-lg">Services</h3>
              <ul className="space-y-3 text-brown-200">
                <li>
                  <Link href="/manage" className="hover:text-cream transition-colors">
                    Property Management
                  </Link>
                </li>
                <li>
                  <Link href="/selling" className="hover:text-cream transition-colors">
                    Property Sales
                  </Link>
                </li>
                <li>
                  <Link href="/buying" className="hover:text-cream transition-colors">
                    Property Buying
                  </Link>
                </li>
                <li>
                  <Link href="/renting" className="hover:text-cream transition-colors">
                    Rental Services
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-medium text-lg">Company</h3>
              <ul className="space-y-3 text-brown-200">
                <li>
                  <Link href="/contact/about-alto" className="hover:text-cream transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-cream transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/contact/join-team" className="hover:text-cream transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-cream transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-medium text-lg">Contact Info</h3>
              <ul className="space-y-3 text-brown-200">
                <li>(+61) 467 048 837</li>
                <li>sales@altoproperty.com.au</li>
                <li>
                  4/66 Condamine St, Runcorn
                  <br />
                  QLD 4113, Australia
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brown-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-brown-200">© {new Date().getFullYear()} Alto Property. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 sm:mt-0">
              <Link href="#" className="text-brown-200 hover:text-cream transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-brown-200 hover:text-cream transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
