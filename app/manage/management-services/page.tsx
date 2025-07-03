import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Settings,
  FileText,
  Phone,
  CheckCircle,
  Home,
  Shield,
  Clock,
  Camera,
  Wrench,
  Calculator,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ManagementServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Comprehensive Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Management
                <span className="block font-light text-brown-700 mt-2">Services</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                From tenant management to property maintenance, we provide comprehensive services to maximize your
                investment returns.
              </p>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Core Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">What We Do</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                      <span className="text-brown-800 font-light">Comprehensive tenant screening</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Lease preparation & execution</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Move-in & move-out inspections</span>
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
                    <Wrench className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Maintenance & Repairs</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Proactive maintenance to protect your investment value.
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
                      <span className="text-brown-800 font-light">Preventive maintenance programs</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Trusted contractor network</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Cost-effective solutions</span>
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
                    <FileText className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Financial Reporting</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Comprehensive financial reporting and tax documentation.
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
                      <span className="text-brown-800 font-light">Online owner portal access</span>
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
                    <Phone className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">24/7 Support</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Round-the-clock support for owners and tenants.
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
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Additional Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Value-Added Services</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                  <Home className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Property Styling</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Professional styling services to maximize rental appeal and achieve higher rents.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                  <Settings className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Market Analysis</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Regular market rent reviews and investment performance analysis.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                  <Shield className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Insurance Coordination</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Assistance with insurance claims and coordination with providers.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
                  <Clock className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Concierge Services</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Premium concierge services for elite property management clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Experience Full-Service Management</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Let us handle every aspect of your property investment while you enjoy the returns.
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
                  Call (07) 3000 0000
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
                <Image src="/alto-logo.png" alt="Alto Property Group" width={40} height={40} className="h-10 w-10" />
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-wider">ALTO</span>
                  <span className="text-xs text-brown-200 tracking-widest">PROPERTY GROUP</span>
                </div>
              </div>
              <p className="text-brown-200 leading-relaxed">
                Brisbane's premier property management company, delivering exceptional results through genuine care.
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
                <li>(07) 3000 0000</li>
                <li>info@altopropertygroup.com.au</li>
                <li>
                  Level 5, 123 Queen Street
                  <br />
                  Brisbane QLD 4000
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brown-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-brown-200">© {new Date().getFullYear()} Alto Property Group. All rights reserved.</p>
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
