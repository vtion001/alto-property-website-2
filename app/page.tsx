import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Settings,
  Star,
  MapPin,
  ArrowRight,
  Shield,
  Clock,
  Target,
  Calculator,
  FileText,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PopupManager } from "@/components/popup-manager"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <PopupManager />

      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <section className="relative py-32 lg:py-40 overflow-hidden min-h-screen flex items-center">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source
                src="https://res.cloudinary.com/dbviya1rj/video/upload/v1751197445/og3c9agrqe6fgqiadyve.mov"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-brown-900/80 via-brown-800/60 to-brown-900/40" />
          </div>

          <div className="container relative z-10">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-cream/80 uppercase mb-2">
                      Brisbane Property Specialists
                    </div>
                    <div className="w-16 h-px bg-cream/40"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-cream leading-none">
                    Exceptional
                    <span className="block font-light text-cream/90 mt-2">Results.</span>
                    <span className="block font-extralight text-cream/80 mt-2">Genuine Care.</span>
                  </h1>
                  <p className="text-xl font-light text-cream/90 max-w-xl leading-relaxed">
                    Comprehensive property solutions including detailed market analysis, professional appraisals, and
                    strategic investment guidance. We deliver measurable results through data-driven insights and
                    personalized service.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-cream hover:bg-white text-brown-800 font-light tracking-wide px-12 py-6 h-auto text-base"
                  >
                    Free Property Appraisal
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide px-12 py-6 h-auto text-base border-cream text-cream hover:bg-cream hover:text-brown-800 bg-transparent"
                  >
                    Market Analysis Report
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-12 pt-16">
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-cream mb-2">$2.8B+</div>
                    <div className="text-sm text-cream/80 tracking-wide font-light">Property Value Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-cream mb-2">98.5%</div>
                    <div className="text-sm text-cream/80 tracking-wide font-light">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-cream mb-2">15+</div>
                    <div className="text-sm text-cream/80 tracking-wide font-light">Years Excellence</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=700&width=600"
                    alt="Luxury Brisbane property with detailed market analysis"
                    width={600}
                    height={700}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/20 to-transparent" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-8 border border-brown-100">
                  <div className="flex items-center space-x-4">
                    <div className="bg-brown-50 p-3 rounded-full">
                      <TrendingUp className="h-8 w-8 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-light text-brown-800 text-sm tracking-wide">Market Growth</div>
                      <div className="text-3xl font-light text-brown-800">12.8%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Badge */}
          <div className="absolute bottom-8 left-8 z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <div className="flex items-center space-x-3 text-cream">
                <span className="text-sm font-light">Built with</span>
                <Badge variant="secondary" className="bg-cream/20 text-cream border-cream/30">
                  Tailwind
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Services Section */}
        <section className="py-32 bg-cream">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Professional Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Comprehensive Property Solutions</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                From detailed comparative market analysis to strategic investment planning, our comprehensive approach
                ensures optimal outcomes for every property transaction and management decision.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center group">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-brown-700" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Market Analysis</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Comprehensive comparative market analysis using recent sales data, market trends, and
                  property-specific factors.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-brown-700" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Property Appraisals</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Professional property valuations incorporating location analysis, condition assessment, and market
                  positioning.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-brown-700" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Investment Strategy</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Strategic investment planning with detailed ROI analysis, market forecasting, and portfolio
                  optimization.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Settings className="h-6 w-6 text-brown-700" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-brown-800 mb-4">Property Management</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  Complete property management including tenant screening, maintenance coordination, and financial
                  reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Core Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Expert Property Services</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Our systematic approach combines market intelligence, professional expertise, and cutting-edge
                technology to deliver superior results across all property services.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Users className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Sales & Leasing</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Strategic marketing and negotiation with comprehensive market analysis and buyer/tenant
                    qualification.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Comparative market analysis (CMA)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Professional marketing campaigns</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Expert negotiation strategies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Calculator className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Property Valuations</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Accurate property appraisals using advanced methodology and comprehensive market data analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Detailed property inspections</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Market trend analysis</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Investment potential assessment</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <DollarSign className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Investment Advisory</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Strategic investment guidance with detailed financial modeling and portfolio optimization
                    strategies.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">ROI analysis and projections</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Market timing strategies</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Portfolio diversification planning</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Market Intelligence Section */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Market Intelligence</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Brisbane Market Insights</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Real-time market data and comprehensive analysis across Brisbane's key suburbs, providing actionable
                insights for informed property decisions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <TrendingUp className="h-8 w-8 text-brown-700" />
                  </div>
                  <div className="text-4xl font-extralight text-brown-800 mb-2">12.8%</div>
                  <div className="text-sm text-brown-600 tracking-wide font-light">Annual Growth</div>
                  <div className="text-xs text-brown-500 mt-2">Brisbane Metro Average</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Clock className="h-8 w-8 text-brown-700" />
                  </div>
                  <div className="text-4xl font-extralight text-brown-800 mb-2">18</div>
                  <div className="text-sm text-brown-600 tracking-wide font-light">Days on Market</div>
                  <div className="text-xs text-brown-500 mt-2">Premium Properties</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Target className="h-8 w-8 text-brown-700" />
                  </div>
                  <div className="text-4xl font-extralight text-brown-800 mb-2">97.2%</div>
                  <div className="text-sm text-brown-600 tracking-wide font-light">Sale Price Accuracy</div>
                  <div className="text-xs text-brown-500 mt-2">Our Appraisal Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Shield className="h-8 w-8 text-brown-700" />
                  </div>
                  <div className="text-4xl font-extralight text-brown-800 mb-2">8.4%</div>
                  <div className="text-sm text-brown-600 tracking-wide font-light">Rental Yield</div>
                  <div className="text-xs text-brown-500 mt-2">Portfolio Average</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Portfolio Showcase</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Featured Properties</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Exceptional properties across Brisbane's premium suburbs, each with detailed market analysis and
                investment potential assessment.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Luxury apartment in South Bank with river views"
                    width={400}
                    height={300}
                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Premium Location</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <MapPin className="h-4 w-4 text-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-light text-brown-800">Riverside Executive Apartment</h3>
                      <p className="text-brown-600 text-sm">South Bank, Brisbane • 4101</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-light text-brown-800">$1,850,000</div>
                      <div className="flex space-x-4 text-sm text-brown-600">
                        <span>3 bed</span>
                        <span>2 bath</span>
                        <span>2 car</span>
                      </div>
                    </div>
                    <div className="text-sm text-brown-600">
                      <span className="font-medium">Rental Yield:</span> 4.2% •{" "}
                      <span className="font-medium">Growth:</span> 15.3%
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Heritage character home in New Farm"
                    width={400}
                    height={300}
                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Character Home</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <MapPin className="h-4 w-4 text-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-light text-brown-800">Heritage Queenslander</h3>
                      <p className="text-brown-600 text-sm">New Farm, Brisbane • 4005</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-light text-brown-800">$2,450,000</div>
                      <div className="flex space-x-4 text-sm text-brown-600">
                        <span>4 bed</span>
                        <span>3 bath</span>
                        <span>2 car</span>
                      </div>
                    </div>
                    <div className="text-sm text-brown-600">
                      <span className="font-medium">Rental Yield:</span> 3.8% •{" "}
                      <span className="font-medium">Growth:</span> 18.7%
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Modern townhouse in Teneriffe with city views"
                    width={400}
                    height={300}
                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brown-800 text-cream">Investment Grade</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <MapPin className="h-4 w-4 text-brown-700" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-light text-brown-800">Contemporary Townhouse</h3>
                      <p className="text-brown-600 text-sm">Teneriffe, Brisbane • 4005</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-light text-brown-800">$1,650,000</div>
                      <div className="flex space-x-4 text-sm text-brown-600">
                        <span>3 bed</span>
                        <span>2 bath</span>
                        <span>2 car</span>
                      </div>
                    </div>
                    <div className="text-sm text-brown-600">
                      <span className="font-medium">Rental Yield:</span> 4.8% •{" "}
                      <span className="font-medium">Growth:</span> 14.2%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-16">
              <Button
                variant="outline"
                size="lg"
                className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
              >
                View Market Analysis Reports
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Client Success Stories</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Proven Results</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Real outcomes from our comprehensive approach to property services, market analysis, and strategic
                guidance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brown-400 text-brown-400" />
                      ))}
                    </div>
                    <blockquote className="text-brown-700 font-light leading-relaxed italic">
                      "Alto's detailed market analysis helped us achieve 15% above the initial estimate. Their CMA
                      report was incredibly thorough and their strategic pricing approach delivered exceptional
                      results."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-brown-700 font-medium">SM</span>
                      </div>
                      <div>
                        <div className="font-medium text-brown-800">Sarah Mitchell</div>
                        <div className="text-sm text-brown-600">Property Investor • New Farm</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brown-400 text-brown-400" />
                      ))}
                    </div>
                    <blockquote className="text-brown-700 font-light leading-relaxed italic">
                      "The investment analysis and market forecasting were spot-on. Alto identified the perfect
                      opportunity and guided us through every step. Our portfolio has grown by 28% in 18 months."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-brown-700 font-medium">DL</span>
                      </div>
                      <div>
                        <div className="font-medium text-brown-800">David Lee</div>
                        <div className="text-sm text-brown-600">Investment Client • South Bank</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brown-400 text-brown-400" />
                      ))}
                    </div>
                    <blockquote className="text-brown-700 font-light leading-relaxed italic">
                      "Professional appraisal service with detailed comparable analysis. The report was comprehensive
                      and helped us make an informed decision. Highly recommend their expertise."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-brown-700 font-medium">JW</span>
                      </div>
                      <div>
                        <div className="font-medium text-brown-800">Jessica Wong</div>
                        <div className="text-sm text-brown-600">First Home Buyer • Paddington</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready for Professional Property Analysis?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get comprehensive market analysis, accurate valuations, and strategic guidance from Brisbane's property
                specialists. Start with a complimentary consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                >
                  Free Property Appraisal
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 h-auto border-cream text-cream hover:bg-cream hover:text-brown-900 bg-transparent"
                >
                  Market Analysis Report
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
                Brisbane's premier property specialists, delivering comprehensive market analysis and strategic property
                solutions with proven results.
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
                    Sales & Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/buying" className="hover:text-cream transition-colors">
                    Buyer Advisory
                  </Link>
                </li>
                <li>
                  <Link href="/renting" className="hover:text-cream transition-colors">
                    Leasing Services
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-medium text-lg">Company</h3>
              <ul className="space-y-3 text-brown-200">
                <li>
                  <Link href="/contact/about-alto" className="hover:text-cream transition-colors">
                    About Alto
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
