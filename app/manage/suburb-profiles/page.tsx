import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Home, Users, Train, GraduationCap, ShoppingBag, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SuburbProfilesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Market Intelligence</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Suburb
                <span className="block font-light text-brown-700 mt-2">Profiles</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Comprehensive market data and insights for Brisbane's most sought-after investment suburbs.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Suburbs */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Top Performers</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Featured Investment Suburbs</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* New Farm */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="New Farm Brisbane"
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Premium</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Star className="h-4 w-4 text-brown-700 fill-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-brown-800 mb-2">New Farm</h3>
                      <p className="text-brown-600 text-sm mb-4">Inner Brisbane, 4005</p>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Trendy riverside suburb with heritage charm, excellent dining, and strong rental demand.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">$1.2M</div>
                        <div className="text-brown-600 text-sm">Median Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">4.1%</div>
                        <div className="text-brown-600 text-sm">Rental Yield</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Train className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">3km to CBD</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Excellent schools nearby</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Powerhouse precinct</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      View Full Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Paddington */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Paddington Brisbane"
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Heritage</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Star className="h-4 w-4 text-brown-700 fill-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-brown-800 mb-2">Paddington</h3>
                      <p className="text-brown-600 text-sm mb-4">Inner Brisbane, 4064</p>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Historic suburb with character homes, boutique shopping, and strong capital growth.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">$950K</div>
                        <div className="text-brown-600 text-sm">Median Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">4.3%</div>
                        <div className="text-brown-600 text-sm">Rental Yield</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Train className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">4km to CBD</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Top-rated schools</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Given Terrace shopping</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      View Full Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* South Bank */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="South Bank Brisbane"
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Cultural</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Star className="h-4 w-4 text-brown-700 fill-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-brown-800 mb-2">South Bank</h3>
                      <p className="text-brown-600 text-sm mb-4">Inner Brisbane, 4101</p>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Cultural precinct with high-rise living, parklands, and excellent transport links.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">$650K</div>
                        <div className="text-brown-600 text-sm">Median Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">5.2%</div>
                        <div className="text-brown-600 text-sm">Rental Yield</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Train className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">1km to CBD</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">QPAC & museums</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Dining & entertainment</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      View Full Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Teneriffe */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Teneriffe Brisbane"
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Waterfront</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Star className="h-4 w-4 text-brown-700 fill-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-brown-800 mb-2">Teneriffe</h3>
                      <p className="text-brown-600 text-sm mb-4">Inner Brisbane, 4005</p>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Converted warehouse district with luxury apartments and river views.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">$850K</div>
                        <div className="text-brown-600 text-sm">Median Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">4.5%</div>
                        <div className="text-brown-600 text-sm">Rental Yield</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Train className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">3km to CBD</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Gasworks Plaza</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Boutique retail</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      View Full Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* West End */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="West End Brisbane"
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Trendy</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Star className="h-4 w-4 text-brown-700 fill-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-brown-800 mb-2">West End</h3>
                      <p className="text-brown-600 text-sm mb-4">Inner Brisbane, 4101</p>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Bohemian suburb with diverse culture, markets, and strong rental demand.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">$750K</div>
                        <div className="text-brown-600 text-sm">Median Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">4.8%</div>
                        <div className="text-brown-600 text-sm">Rental Yield</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Train className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">2km to CBD</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Davies Park Markets</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Boundary Street</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      View Full Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Kangaroo Point */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Kangaroo Point Brisbane"
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Riverside</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Star className="h-4 w-4 text-brown-700 fill-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-brown-800 mb-2">Kangaroo Point</h3>
                      <p className="text-brown-600 text-sm mb-4">Inner Brisbane, 4169</p>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Riverside living with city views, recreational facilities, and excellent connectivity.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">$680K</div>
                        <div className="text-brown-600 text-sm">Median Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-brown-800">4.9%</div>
                        <div className="text-brown-600 text-sm">Rental Yield</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Train className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">2km to CBD</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">Story Bridge access</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-5 w-5 text-brown-600" />
                        <span className="text-brown-700 text-sm">River walks & parks</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      View Full Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Market Data</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Brisbane Market Overview</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white border border-brown-100">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="h-12 w-12 text-brown-700 mx-auto mb-4" />
                  <div className="text-3xl font-extralight text-brown-800 mb-2">15.2%</div>
                  <div className="text-brown-600 font-light">Annual Growth</div>
                  <div className="text-brown-500 text-sm mt-2">Inner Brisbane average</div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100">
                <CardContent className="p-8 text-center">
                  <DollarSign className="h-12 w-12 text-brown-700 mx-auto mb-4" />
                  <div className="text-3xl font-extralight text-brown-800 mb-2">$850K</div>
                  <div className="text-brown-600 font-light">Median Price</div>
                  <div className="text-brown-500 text-sm mt-2">Inner Brisbane units</div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100">
                <CardContent className="p-8 text-center">
                  <Home className="h-12 w-12 text-brown-700 mx-auto mb-4" />
                  <div className="text-3xl font-extralight text-brown-800 mb-2">4.6%</div>
                  <div className="text-brown-600 font-light">Rental Yield</div>
                  <div className="text-brown-500 text-sm mt-2">Average gross yield</div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-brown-700 mx-auto mb-4" />
                  <div className="text-3xl font-extralight text-brown-800 mb-2">97%</div>
                  <div className="text-brown-600 font-light">Occupancy</div>
                  <div className="text-brown-500 text-sm mt-2">Rental market strength</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Invest in Brisbane?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get detailed suburb analysis and investment advice from our local market experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                >
                  Get Market Report
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 h-auto border-cream text-cream hover:bg-cream hover:text-brown-900 bg-transparent"
                >
                  Speak to Expert
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
                  4/66 Condamine St, Runcorn
                  <br />
                  QLD 4113, Australia
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
