
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Target, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import GoogleReviewsSection from "@/components/reviews/GoogleReviewsSection"

export default function BuyersAgentServicesPage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Professional Guidance</div>
                    <div className="w-16 h-px bg-brand-red"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Buyers Agent
                    <span className="block font-light text-brown-700 mt-2">Services</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Don't navigate the property market alone. Our expert buyers agents protect your interests 
                    and ensure you never overpay or miss out on the perfect opportunity.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-brand-red hover:bg-brand-red/90 text-white font-light tracking-wide px-12 py-6 h-auto text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Speak to a Buyers Agent
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide px-12 py-6 h-auto text-base border-2 border-brown-300 text-brown-800 hover:bg-brown-50 hover:border-brown-400 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dbviya1rj/image/upload/v1753060413/wonnpo3gatludlru78oh.jpg?height=700&width=600"
                    alt="Buyers agent consultation"
                    width={600}
                    height={700}
                    priority
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points & Solutions */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Why You Need Us</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Protect Your Investment</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                The property market is complex and competitive. Without professional representation, 
                you're at a significant disadvantage.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Pain Points */}
              <div className="space-y-8">
                <h3 className="text-3xl font-light text-brown-800 mb-8">Are You Worried About...</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-brown-100">
                    <div className="w-2 h-2 bg-brand-red rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-medium text-brown-900 mb-2">Paying Too Much?</h4>
                      <p className="text-brown-700 font-light">
                        Without market expertise, you could overpay by tens of thousands. Our agents know true market value and negotiate fiercely on your behalf.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-brown-100">
                    <div className="w-2 h-2 bg-brand-red rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-medium text-brown-900 mb-2">Missing Out on Opportunities?</h4>
                      <p className="text-brown-700 font-light">
                        The best properties often sell before they hit the market. We have exclusive access to off-market properties and inside information.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-brown-100">
                    <div className="w-2 h-2 bg-brand-red rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-medium text-brown-900 mb-2">Making Costly Mistakes?</h4>
                      <p className="text-brown-700 font-light">
                        Hidden defects, poor locations, or legal issues can cost you dearly. We conduct thorough due diligence to protect your investment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-brown-100">
                    <div className="w-2 h-2 bg-brand-red rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-medium text-brown-900 mb-2">Losing in Competitive Markets?</h4>
                      <p className="text-brown-700 font-light">
                        Without strong negotiation skills and market relationships, you'll struggle in bidding wars and miss out on your dream property.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-brown-100">
                    <div className="w-2 h-2 bg-brand-red rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-medium text-brown-900 mb-2">Wasting Time on Unsuitable Properties?</h4>
                      <p className="text-brown-700 font-light">
                        Searching without a clear strategy wastes precious time. We pre-screen properties to match your exact criteria and budget.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Solutions */}
              <div className="space-y-8">
                <h3 className="text-3xl font-light text-brown-800 mb-8">How We Protect You</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-brown-900 rounded-2xl text-cream">
                    <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Market Intelligence & Pricing Strategy</h4>
                      <p className="text-brown-100 font-light">
                        Deep market analysis and comparable sales data ensures you pay fair value. We know what properties are really worth and negotiate accordingly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-brown-900 rounded-2xl text-cream">
                    <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Exclusive Access & Early Opportunities</h4>
                      <p className="text-brown-100 font-light">
                        First access to off-market properties and pre-market opportunities before competition arrives. Our network gives you the inside track.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-brown-900 rounded-2xl text-cream">
                    <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Professional Due Diligence</h4>
                      <p className="text-brown-100 font-light">
                        Comprehensive property inspections, legal checks, and market comparisons protect your investment from costly mistakes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-brown-900 rounded-2xl text-cream">
                    <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Expert Negotiation & Winning Strategies</h4>
                      <p className="text-brown-100 font-light">
                        Professional negotiation skills and established relationships give you the competitive edge in any market condition.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-brown-900 rounded-2xl text-cream">
                    <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">Targeted Search & Time Efficiency</h4>
                      <p className="text-brown-100 font-light">
                        Strategic property search based on your exact criteria, budget, and timeline. We do the legwork so you don't waste time on unsuitable properties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        <GoogleReviewsSection />

        {/* How It Works */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Process</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">How We Work For You</h2>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-6">
                <div className="bg-brown-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-light text-brown-800">01</span>
                </div>
                <h3 className="text-xl font-medium text-brown-900">Initial Consultation</h3>
                <p className="text-brown-700 font-light">
                  We understand your needs, budget, timeline, and property preferences in detail.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="bg-brown-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-light text-brown-800">02</span>
                </div>
                <h3 className="text-xl font-medium text-brown-900">Strategic Search</h3>
                <p className="text-brown-700 font-light">
                  We conduct targeted searches using our network and off-market access to find suitable properties.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="bg-brown-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-light text-brown-800">03</span>
                </div>
                <h3 className="text-xl font-medium text-brown-900">Due Diligence</h3>
                <p className="text-brown-700 font-light">
                  Comprehensive property analysis, market research, and professional inspections protect your investment.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="bg-brown-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-light text-brown-800">04</span>
                </div>
                <h3 className="text-xl font-medium text-brown-900">Negotiation & Purchase</h3>
                <p className="text-brown-700 font-light">
                  Expert negotiation and purchase management to secure the best possible outcome for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Have an Expert on Your Side?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Don't go into the property market unprotected. Our buyers agents are here to fight for your interests 
                and secure the best possible outcome.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  Speak to a Buyers Agent Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 h-auto border-2 border-cream text-cream hover:bg-cream/10 hover:border-cream/80 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  Request a Free Consultation
                </Button>
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
