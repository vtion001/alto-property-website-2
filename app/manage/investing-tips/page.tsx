import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  DollarSign,
  Home,
  Calculator,
  Shield,
  Target,
  Star,
  ArrowRight,
  BookOpen,
  Users,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InvestingTipsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Investment Guidance</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Top 10 Tips
                <span className="block font-light text-brown-700 mt-2">to Investing</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Expert insights and proven strategies to help you build a successful property investment portfolio in
                South East Queensland.
              </p>
            </div>
          </div>
        </section>

        {/* Top 10 Tips */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Expert Advice</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Investment Success Strategies</h2>
            </div>

            <div className="grid gap-8 max-w-4xl mx-auto">
              {/* Tip 1 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      1
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Location is Everything</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Choose properties in areas with strong infrastructure, good transport links, schools, and
                        amenities. South East Queensland's key areas like Brisbane's inner suburbs, Gold Coast, and Sunshine Coast consistently
                        outperform due to their proximity to major centers and lifestyle offerings.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <Target className="h-5 w-5" />
                        <span className="text-sm font-light">Focus on growth corridors and established suburbs</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 2 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      2
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Understand Your Numbers</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Calculate rental yield, cash flow, and potential capital growth before purchasing. Aim for
                        properties with a rental yield of at least 4-5% in South East Queensland's current market. Factor in all
                        costs including management fees, maintenance, and vacancy periods.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <Calculator className="h-5 w-5" />
                        <span className="text-sm font-light">Use our rental calculator for accurate projections</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 3 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      3
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Start with Quality, Not Quantity</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        It's better to own one high-quality property in a great location than multiple properties in
                        poor areas. Quality properties attract better tenants, require less maintenance, and appreciate
                        more consistently over time.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <Star className="h-5 w-5" />
                        <span className="text-sm font-light">
                          Quality properties = quality tenants = better returns
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 4 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      4
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Professional Property Management</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Engage a professional property manager from day one. They'll help you achieve higher rents, find
                        quality tenants faster, and handle maintenance issues efficiently. The cost is tax-deductible
                        and often pays for itself through better outcomes.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <Users className="h-5 w-5" />
                        <span className="text-sm font-light">Professional management = peace of mind</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 5 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      5
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Diversify Your Portfolio</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Don't put all your eggs in one basket. Consider different property types (apartments, houses,
                        townhouses) and locations within South East Queensland. This spreads risk and can provide more stable returns
                        across different market cycles.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <Shield className="h-5 w-5" />
                        <span className="text-sm font-light">Diversification reduces risk and volatility</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 6 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      6
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Think Long-Term</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Property investment is a long-term strategy. Plan to hold properties for at least 7-10 years to
                        ride out market cycles and benefit from compound growth. Short-term fluctuations are normal and
                        shouldn't drive investment decisions.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <Clock className="h-5 w-5" />
                        <span className="text-sm font-light">Time in the market beats timing the market</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 7 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      7
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Maintain Your Properties</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Regular maintenance preserves property value and attracts quality tenants willing to pay premium
                        rents. Budget 1-2% of the property value annually for maintenance and improvements. Preventive
                        maintenance is always cheaper than reactive repairs.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <Home className="h-5 w-5" />
                        <span className="text-sm font-light">Well-maintained properties command higher rents</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 8 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      8
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Understand Tax Benefits</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Property investment offers significant tax advantages including negative gearing, depreciation
                        allowances, and capital gains tax concessions. Consult with a qualified accountant to maximize
                        these benefits and structure your investments tax-effectively.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <DollarSign className="h-5 w-5" />
                        <span className="text-sm font-light">Professional tax advice can save thousands</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 9 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      9
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Stay Informed About the Market</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Keep up with local market trends, infrastructure developments, and economic indicators.
                        Subscribe to property reports, attend seminars, and maintain relationships with industry
                        professionals. Knowledge is power in property investment.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <BookOpen className="h-5 w-5" />
                        <span className="text-sm font-light">Stay informed to make better investment decisions</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip 10 */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-xl flex-shrink-0">
                      10
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-light text-brown-800">Have an Exit Strategy</h3>
                      <p className="text-brown-700 font-light leading-relaxed">
                        Plan your exit strategy before you buy. Whether it's holding for rental income, renovating for
                        capital growth, or eventual sale, having a clear strategy helps guide your decisions and ensures
                        you're working toward specific financial goals.
                      </p>
                      <div className="flex items-center space-x-2 text-brown-600">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-sm font-light">Clear goals lead to better investment outcomes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Market Data</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">South East Queensland Investment Insights</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white border border-brown-100">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="h-12 w-12 text-brown-700 mx-auto mb-4" />
                  <div className="text-3xl font-extralight text-brown-800 mb-2">12.5%</div>
                  <div className="text-brown-600 font-light">Annual Growth</div>
                  <div className="text-brown-500 text-sm mt-2">South East Queensland median house price</div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100">
                <CardContent className="p-8 text-center">
                  <DollarSign className="h-12 w-12 text-brown-700 mx-auto mb-4" />
                  <div className="text-3xl font-extralight text-brown-800 mb-2">4.2%</div>
                  <div className="text-brown-600 font-light">Rental Yield</div>
                  <div className="text-brown-500 text-sm mt-2">Average gross yield</div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100">
                <CardContent className="p-8 text-center">
                  <Home className="h-12 w-12 text-brown-700 mx-auto mb-4" />
                  <div className="text-3xl font-extralight text-brown-800 mb-2">28</div>
                  <div className="text-brown-600 font-light">Days on Market</div>
                  <div className="text-brown-500 text-sm mt-2">Average selling time</div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100">
                <CardContent className="p-8 text-center">
                  <Target className="h-12 w-12 text-brown-700 mx-auto mb-4" />
                  <div className="text-3xl font-extralight text-brown-800 mb-2">96%</div>
                  <div className="text-brown-600 font-light">Occupancy Rate</div>
                  <div className="text-brown-500 text-sm mt-2">Rental market strength</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Resources</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Investment Tools & Guides</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <Calculator className="h-12 w-12 text-brown-700 mb-6" />
                  <h3 className="text-xl font-light text-brown-800 mb-4">Investment Calculator</h3>
                  <p className="text-brown-700 font-light leading-relaxed mb-6">
                    Calculate potential returns, cash flow, and tax benefits for your investment property.
                  </p>
                  <Button
                    variant="outline"
                    className="border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Use Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <BookOpen className="h-12 w-12 text-brown-700 mb-6" />
                  <h3 className="text-xl font-light text-brown-800 mb-4">Investment Guide</h3>
                  <p className="text-brown-700 font-light leading-relaxed mb-6">
                    Download our comprehensive guide to property investment in South East Queensland.
                  </p>
                  <Button
                    variant="outline"
                    className="border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Download Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <Users className="h-12 w-12 text-brown-700 mb-6" />
                  <h3 className="text-xl font-light text-brown-800 mb-4">Expert Consultation</h3>
                  <p className="text-brown-700 font-light leading-relaxed mb-6">
                    Book a free consultation with our investment specialists.
                  </p>
                  <Button
                    variant="outline"
                    className="border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Start Your Investment Journey?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Let our experts help you build a successful property investment portfolio in South East Queensland.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/manage/speak-specialist#contact-form">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                  >
                    Get Investment Advice
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 h-auto border-cream text-cream hover:bg-cream hover:text-brown-900 bg-transparent"
                >
                  Call (61) 437 139 314
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
                South East Queensland's premier all-in-one real estate agency, consistently building lifelong relationships through delivering outstanding results and service.
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
                <li>(61) 437 139 314</li>
                <li>connor.reilly@altoproperty.com.au</li>
                <li> Level 2, 8 Clunies Ross Court Eight Mile Plains QLD 4113</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brown-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-brown-200">© {new Date().getFullYear()} ALTO REAL ESTATE. All rights reserved.</p>
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
