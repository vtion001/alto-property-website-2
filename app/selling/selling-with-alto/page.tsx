

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Award, Zap, BarChart3, Globe, MessageSquare, Heart, Target, Smartphone, Camera, Monitor, Phone, Mail, FileText } from "lucide-react"
import Link from "next/link"

export default function SellingWithAltoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Selling With Alto</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Why Choose
                <span className="block font-light text-brown-700 mt-2">Alto</span>
                <span className="block font-extralight text-brown-600 mt-2">Property</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Experience the difference with South East Queensland's most trusted property specialists. We deliver exceptional
                results through genuine care and unmatched expertise.
              </p>
              
              {/* CMA Call-to-Action */}
              <div className="bg-white border border-brown-200 rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <FileText className="h-6 w-6 text-brown-700" />
                    <h3 className="text-2xl font-light text-brown-900">Get Your Comparative Market Analysis</h3>
                  </div>
                  <p className="text-brown-700 font-light">
                    Discover your property's true market value with our comprehensive analysis of recent sales and market trends.
                  </p>
                  <Link href="/selling/property-report#report-form">
                    <Button
                      size="lg"
                      className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-8 py-4 h-auto text-base"
                    >
                      Request Free CMA Report
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Statistics Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl">Our Proven Track Record</h2>
              <p className="text-xl text-brown-100 max-w-3xl mx-auto">
                Numbers that speak for themselves - delivering exceptional results for our clients
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-4">
                <div className="text-4xl font-light text-cream">100+</div>
                <div className="text-brown-200">Properties Sold</div>
              </div>
              <div className="text-center space-y-4">
                <div className="text-4xl font-light text-cream">$100M</div>
                <div className="text-brown-200">Sold Value</div>
              </div>
              <div className="text-center space-y-4">
                <div className="text-4xl font-light text-cream">98.5%</div>
                <div className="text-brown-200">Client Satisfaction</div>
              </div>
              <div className="text-center space-y-4">
                <div className="text-4xl font-light text-cream">10+</div>
                <div className="text-brown-200">Years Combined Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Core Features */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">What Sets Us Apart</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                Six key advantages that deliver exceptional results for our clients
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Highly Trained Negotiators */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Highly Trained Negotiators</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Alto Property leads a dedicated and multilingual team that works tirelessly to support every aspect of your property sale. Their combined effort ensures meticulous attention to detail, swift handling of tasks, and unwavering commitment to achieving the best results for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Expert negotiation skills with proven results</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Multilingual team serving diverse communities</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Continuous professional development and training</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">10+ years average experience per agent</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Seamless Selling Process */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Seamless Selling Process</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    We follow a meticulous and proven process to ensure a smooth sale, regardless of location. From the initial consultation to closing, our team efficiently manages open houses, inspections, and offers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Streamlined 6-step selling methodology</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Professional photography and staging advice</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Comprehensive marketing campaign management</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Average 25 days on market vs industry 45 days</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Extensive Client Network */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Globe className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Extensive Client Network</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    We maintain a large and up-to-date client database. This extensive network ensures your property receives maximum exposure, connecting with the right buyers quickly and efficiently.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">10,000+ active buyer database</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">International buyer network connections</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Off-market buyer matching service</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Social media reach of 50,000+ followers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Market Data & Analytics */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <BarChart3 className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Market Data & Analytics</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Our deep understanding of market trends and property values ensures precise pricing and strategic selling. Our expertise helps you make informed decisions, leading to successful and profitable transactions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Real-time market data and analytics</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Comparative market analysis (CMA) reports</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Strategic pricing recommendations</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">96% of asking price achieved on average</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Clear Communication */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <MessageSquare className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Clear Communication & Negotiation</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    We keep you informed at every step through prompt and transparent communication. Our exceptional negotiation skills ensure that we secure the best possible deal for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">24/7 communication and updates</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Weekly progress reports</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Transparent feedback from all inspections</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Professional negotiation strategies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* A Team Who Truly Cares */}
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Heart className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">A Team Who Truly Cares</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Alto Property leads a team that genuinely cares about you and your unique needs. We take the time to understand your goals and concerns, offering personalised support throughout the entire process.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Personalized service for every client</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Dedicated client relationship manager</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Post-sale support and follow-up</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">5-star average client satisfaction rating</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technology & Innovation Section */}
        <section className="py-24 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Cutting-Edge Technology Meets Personal Service</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                Advanced technology solutions that enhance your selling experience
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">AI-Powered Lead Response</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Advanced AI system ensures every inquiry is responded to within 2 minutes, 24/7. Potential buyers never wait, increasing chances of quick sale.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Automated Marketing Campaigns</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Professional marketing sequences that automatically target the right buyers. Maximum exposure across all digital channels.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Real-Time Market Analytics</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Live market data and comparable sales analysis. Pricing recommendations powered by advanced algorithms.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Digital Marketing Excellence</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Professional photography and virtual tours. Social media campaigns and targeted online advertising.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Streamlined Communication</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Automated updates and progress reports. Feedback systems that keep you informed without overwhelming.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Monitor className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Client Portal Access</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    24/7 access to property marketing performance. Buyer feedback and market insights through secure portal.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Excellence Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Our Proven 6-Step Selling Process</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                A systematic approach that ensures maximum results for every property sale
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-lg">01</div>
                    <h3 className="text-xl font-light text-brown-900">Initial Consultation & Market Analysis</h3>
                  </div>
                  <ul className="space-y-2 text-brown-700 ml-16">
                    <li>• Comprehensive property assessment</li>
                    <li>• Market research and pricing strategy</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-lg">02</div>
                    <h3 className="text-xl font-light text-brown-900">Professional Preparation</h3>
                  </div>
                  <ul className="space-y-2 text-brown-700 ml-16">
                    <li>• Property styling and presentation advice</li>
                    <li>• Professional photography and marketing materials</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-lg">03</div>
                    <h3 className="text-xl font-light text-brown-900">Strategic Marketing Launch</h3>
                  </div>
                  <ul className="space-y-2 text-brown-700 ml-16">
                    <li>• Multi-channel marketing campaign</li>
                    <li>• Targeted buyer outreach</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-lg">04</div>
                    <h3 className="text-xl font-light text-brown-900">Buyer Engagement & Inspections</h3>
                  </div>
                  <ul className="space-y-2 text-brown-700 ml-16">
                    <li>• Coordinated inspection schedule</li>
                    <li>• Buyer feedback and interest tracking</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-lg">05</div>
                    <h3 className="text-xl font-light text-brown-900">Negotiation & Offers</h3>
                  </div>
                  <ul className="space-y-2 text-brown-700 ml-16">
                    <li>• Professional negotiation on your behalf</li>
                    <li>• Maximize sale price and terms</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brown-800 text-cream w-12 h-12 rounded-full flex items-center justify-center font-light text-lg">06</div>
                    <h3 className="text-xl font-light text-brown-900">Settlement & Completion</h3>
                  </div>
                  <ul className="space-y-2 text-brown-700 ml-16">
                    <li>• Smooth transaction management</li>
                    <li>• Post-sale support and follow-up</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Choosing the Right Sales Method Section */}
        <section className="py-24 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Choosing the Right Sales Method</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                We help you select the optimal sales approach based on your property and market conditions
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border border-brown-100 bg-white">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-brown-900 font-light">Auction Advantages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-brown-700">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span>Set timeframe</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span>Competitive bidding environment</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span>Transparent as every buyer is present</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span>No set price barrier, only a reserve</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 bg-white">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-brown-900 font-light">Private Treaty Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-brown-700">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span>Flexible timing</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span>Room for more unique negotiations</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span>Allows for market feedback</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span>No pressure selling environment</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Success Stories</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                Real results from real clients - detailed case studies coming soon
              </p>
              <div className="bg-brown-50 border border-brown-200 rounded-2xl p-12 max-w-2xl mx-auto">
                <div className="space-y-4">
                  <h3 className="text-2xl font-light text-brown-900">Case Studies Coming Soon</h3>
                  <p className="text-brown-700 font-light">
                    We're preparing detailed case studies showcasing our successful property sales and the strategies that delivered exceptional results for our clients.
                  </p>
                  <Button
                    variant="outline"
                    className="border-brown-200 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Stay Tuned
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Experience the Alto Property Difference?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Join hundreds of satisfied clients who have achieved exceptional results with our award-winning team and proven processes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/selling/property-report#report-form">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                  >
                    Get Free Property Appraisal
                  </Button>
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mt-12">
                <div className="flex items-center justify-center space-x-3">
                  <Phone className="h-5 w-5 text-brown-200" />
                  <span className="text-brown-200">0467 048 837</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Mail className="h-5 w-5 text-brown-200" />
                  <span className="text-brown-200">info@altopropertygroup.com.au</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-brown-200">© {new Date().getFullYear()} Alto Property. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
