
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Star, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ManagementFeesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Transparent Pricing</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Management
                <span className="block font-light text-brown-700 mt-2">Services</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Competitive, transparent pricing with no hidden costs. Our fees are structured to align with your
                success across South-East Queensland.
              </p>
            </div>
          </div>
        </section>

        {/* Service Packages */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Tailored Management Solutions</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Choose the management package that best suits your investment goals. Get in touch to discuss options that work for you.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {/* Essential Plan */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center pb-8">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Shield className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-2xl text-brown-900 font-light">Essential</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Perfect for first-time investors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-sm mb-8">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Tenant screening & placement</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Rent collection & arrears</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Routine inspections</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Monthly financial reports</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Basic maintenance coordination</span>
                    </li>
                  </ul>
                  <Link href="/manage/speak-specialist#contact-form" className="w-full">
                    <Button className="w-full bg-brown-800 hover:bg-brown-900 text-cream">Get in Touch to Discuss Options</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="border-2 border-brown-300 hover:shadow-xl transition-all duration-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brown-800 text-cream px-4 py-1 rounded-full text-sm">Most Popular</div>
                </div>
                <CardHeader className="text-center pb-8">
                  <div className="bg-brown-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Star className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-2xl text-brown-900 font-light">Premium</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Our most comprehensive service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-sm mb-8">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Everything in Essential</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">24/7 emergency maintenance</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Property styling consultation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Market rent reviews</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Dedicated property manager</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Annual tax summary</span>
                    </li>
                  </ul>
                  <Link href="/manage/speak-specialist#contact-form" className="w-full">
                    <Button className="w-full bg-brown-800 hover:bg-brown-900 text-cream">Get in Touch to Discuss Options</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Elite Plan */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center pb-8">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <DollarSign className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-2xl text-brown-900 font-light">Elite</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    For serious property investors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-sm mb-8">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Everything in Premium</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Investment strategy consultation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Property improvement advice</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Quarterly portfolio reviews</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Priority support</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Concierge services</span>
                    </li>
                  </ul>
                  <Link href="/manage/speak-specialist#contact-form" className="w-full">
                    <Button className="w-full bg-brown-800 hover:bg-brown-900 text-cream">Get in Touch to Discuss Options</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Get Started?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Contact us today for a free consultation and rental appraisal to discuss the best management options for your property.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/manage/rental-appraisal#appraisal-form">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                  >
                    Get Free Appraisal
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 h-auto border-cream text-cream hover:bg-cream hover:text-brown-900 bg-transparent"
                >
                  Call (+61) 437 139 314
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
                <li>(+61) 437 139 314</li>
                <li>connor.reilly@altoproperty.com.au</li>
                <li> Level 2, 8 Clunies Ross Court Eight Mile Plains QLD 4113</li>
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
