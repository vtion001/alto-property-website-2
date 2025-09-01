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
  Home,
  Heart,
  Award,
  PhoneCall,
  Calendar,
  Handshake,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PopupManager } from "@/components/popup-manager"
// import removed: SellerPopupManager and related 2% commission popup
import Footer from "@/components/ui/footer"
import { getHomePageTeamMembers } from "@/data/team"
import TeamMemberCard from "@/components/team/TeamMemberCard"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <PopupManager />
      {/* SellerPopupManager removed per revert */}

      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          {/* Video Background */}
          <div className="absolute inset-0 z-0" style={{ top: '-20vh', bottom: '-20vh', left: '-10vw', right: '-10vw' }}>
            <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover scale-110">
              <source
                src="https://res.cloudinary.com/dbviya1rj/video/upload/v1752811390/ahkwwnqzlasp5ab5xub0.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-brown-900/80 via-brown-800/60 to-brown-900/40" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 w-full py-32 lg:py-40">
            <div className="container">
              <div className="grid gap-20 lg:grid-cols-2 items-center">
                <div className="space-y-12">
                  <div className="space-y-8">
                    <div className="inline-block">
                      <div className="text-xs tracking-[0.3em] text-cream/80 uppercase mb-2">
                        South East Queensland's Premier Agency
                      </div>
                      <div className="w-16 h-px bg-brand-red"></div>
                    </div>
                    <h1 className="text-5xl font-extralight tracking-tight sm:text-6xl lg:text-7xl text-cream leading-tight">
                      ALTO
                      <span className="block font-light text-cream/90 mt-2">PROPERTY</span>
                    </h1>
                    <p className="text-xl font-light text-cream/90 max-w-2xl leading-relaxed">
                      South East Queensland's premier all-in-one real estate agency, consistently building lifelong 
                      relationships through delivering outstanding results and service.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
                    <Link href="/selling/property-report#report-form">
                      <Button
                        size="lg"
                        className="bg-cream hover:bg-white text-brown-800 font-light tracking-wide px-12 py-6 h-auto text-base w-full sm:w-auto"
                      >
                        Free Property Appraisal
                      </Button>
                    </Link>
                    <Link href="/manage/property-management#claim-offer">
                      <Button
                        size="lg"
                        className="bg-brand-red hover:bg-brand-red/90 text-white font-light tracking-wide px-12 py-6 h-auto text-base w-full sm:w-auto"
                      >
                        Claim Up To 3 Months Free
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        size="lg"
                        className="font-light tracking-wide px-12 py-6 h-auto text-base border-cream text-cream hover:bg-cream hover:text-brown-800 bg-transparent w-full sm:w-auto"
                      >
                        Speak to Our Team
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-8 pt-12">
                    <div className="text-center">
                      <div className="text-4xl font-extralight text-cream mb-2">15+</div>
                      <div className="text-sm text-cream/80 tracking-wide font-light">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-extralight text-cream mb-2">2,800+</div>
                      <div className="text-sm text-cream/80 tracking-wide font-light">Happy Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-extralight text-cream mb-2">98.5%</div>
                      <div className="text-sm text-cream/80 tracking-wide font-light">Success Rate</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://res.cloudinary.com/dbviya1rj/image/upload/v1752833883/ejat8ma5eh1c3nwabkim.jpg"
                      alt="Luxury Brisbane property showcasing ALTO's premium service"
                      width={600}
                      height={700}
                      priority
                      className="object-cover w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-900/20 to-transparent" />
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-8 border border-brown-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-brown-50 p-3 rounded-full">
                        <Heart className="h-8 w-8 text-brown-700" />
                      </div>
                      <div>
                        <div className="font-light text-brown-800 text-sm tracking-wide">Client Satisfaction</div>
                        <div className="text-3xl font-light text-brown-800">4.9★</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Services</div>
                <div className="w-16 h-px bg-brand-red"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">What ALTO Can Do For You</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Comprehensive real estate solutions tailored to your unique needs, backed by 15+ years of proven results.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Sell */}
              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200 h-full">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <DollarSign className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-2xl text-brown-900 font-light">Sell</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Maximize your property's value with our proven marketing strategies and expert negotiation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Free comprehensive market analysis</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Professional photography & marketing</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Expert negotiation for best price</span>
                    </li>
                  </ul>
                  <div className="grid gap-3">
                    <Link href="/selling">
                      <Button variant="outline" className="w-full group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Buy */}
              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200 h-full">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Home className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-2xl text-brown-900 font-light">Buy</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Find your dream property with insider access and strategic guidance throughout the process.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Access to off-market properties</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Strategic buying advice & support</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Market insights & timing guidance</span>
                    </li>
                  </ul>
                  <Link href="/buying">
                    <Button variant="outline" className="w-full group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300">
                      Start Searching <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Rent */}
              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200 h-full">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Users className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-2xl text-brown-900 font-light">Rent</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Premium rental properties with seamless application process and ongoing tenant support.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Quality inspected properties</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Fast, simple application process</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">24/7 maintenance support</span>
                    </li>
                  </ul>
                  <Link href="/renting">
                    <Button variant="outline" className="w-full group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300">
                      View Rentals <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Finance */}
              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 hover:border-brown-200 h-full">
                <CardHeader className="pb-4">
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 group-hover:text-white transition-all duration-300">
                    <Calculator className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-2xl text-brown-900 font-light">Finance</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Expert mortgage guidance and financial solutions to secure your property dreams.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Free financial health check</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">Access to 40+ lenders</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600 flex-shrink-0" />
                      <span className="text-brown-800 font-light">No upfront fees</span>
                    </li>
                  </ul>
                  <Link href="/finance">
                    <Button variant="outline" className="w-full group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300">
                      Get Pre-Approved <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section - Happy Vibes */}
        <section className="py-32 bg-cream">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Meet Our Team</div>
                <div className="w-16 h-px bg-brand-red"></div>
              </div>
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Genuine People, <span className="text-brand-red">Outstanding Results</span></h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Our passionate team of property specialists brings expertise, energy, and genuine care to every client interaction.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {getHomePageTeamMembers().map((member) => (
                <TeamMemberCard key={member.id} member={member} variant="compact" />
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/team">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                >
                  Meet Our Full Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Client Success Stories</div>
                <div className="w-16 h-px bg-brand-red"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">What Our Clients Say</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Real feedback from clients who've experienced the ALTO difference - exceptional results with genuine care.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-brown-700 font-light leading-relaxed italic">
                      "ALTO sold our property for 15% above our expectations! Their market knowledge and negotiation 
                      skills are outstanding. The team made the entire process stress-free and kept us informed every step."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-brown-700 font-medium">SM</span>
                      </div>
                      <div>
                        <div className="font-medium text-brown-800">Sarah & Michael</div>
                        <div className="text-sm text-brown-600">Sold in New Farm • $1.2M</div>
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
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-brown-700 font-light leading-relaxed italic">
                      "As first-time buyers, ALTO guided us through everything with patience and expertise. They found us 
                      the perfect home and negotiated a great price. We couldn't be happier!"
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-brown-700 font-medium">DL</span>
                      </div>
                      <div>
                        <div className="font-medium text-brown-800">David & Lisa</div>
                        <div className="text-sm text-brown-600">Bought in Paddington • First Home</div>
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
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-brown-700 font-light leading-relaxed italic">
                      "ALTO manages our investment portfolio beautifully. Their property management is professional, 
                      thorough, and delivers consistent returns. Genuine care shows in everything they do."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="bg-brown-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="text-brown-700 font-medium">JW</span>
                      </div>
                      <div>
                        <div className="font-medium text-brown-800">Jennifer Wong</div>
                        <div className="text-sm text-brown-600">Property Investor • 4 Properties</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-8 bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-extralight text-brown-800 mb-1">4.9</div>
                  <div className="flex justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-brown-600">Average Rating</div>
                </div>
                <div className="w-px h-16 bg-brown-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-extralight text-brown-800 mb-1">98.5%</div>
                  <div className="text-sm text-brown-600">Client Satisfaction</div>
                </div>
                <div className="w-px h-16 bg-brown-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-extralight text-brown-800 mb-1">2,800+</div>
                  <div className="text-sm text-brown-600">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section id="featured-properties" data-section="featured-properties" className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Portfolio Showcase</div>
                <div className="w-16 h-px bg-brand-red"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Featured Properties</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Discover exceptional properties across South East Queensland, each representing our commitment to quality and value.
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
                    <Badge className="bg-brown-800 text-cream">Just Listed</Badge>
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
                    <Badge className="bg-brown-800 text-cream">Price Reduced</Badge>
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
                    <Badge className="bg-brown-800 text-cream">Open Home Sat</Badge>
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
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-16">
              <Link href="/buying/search-properties">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                >
                  View All Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Proven Results Section */}
        <section className="py-32 bg-brown-900 text-cream">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-cream/80 uppercase mb-2">Track Record</div>
                <div className="w-16 h-px bg-cream/40 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-cream">Proven Results</h2>
              <p className="text-xl font-light text-cream/90 max-w-4xl mx-auto leading-relaxed">
                15+ years of delivering exceptional outcomes across South East Queensland's property market.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="bg-cream/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Award className="h-10 w-10 text-cream" />
                </div>
                <div className="text-4xl font-extralight text-cream mb-2">$2.8B+</div>
                <div className="text-sm text-cream/80 tracking-wide font-light">Property Value Managed</div>
              </div>

              <div className="text-center">
                <div className="bg-cream/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <TrendingUp className="h-10 w-10 text-cream" />
                </div>
                <div className="text-4xl font-extralight text-cream mb-2">18 Days</div>
                <div className="text-sm text-cream/80 tracking-wide font-light">Average Days on Market</div>
              </div>

              <div className="text-center">
                <div className="bg-cream/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Target className="h-10 w-10 text-cream" />
                </div>
                <div className="text-4xl font-extralight text-cream mb-2">97.2%</div>
                <div className="text-sm text-cream/80 tracking-wide font-light">Sale Price Accuracy</div>
              </div>

              <div className="text-center">
                <div className="bg-cream/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Handshake className="h-10 w-10 text-cream" />
                </div>
                <div className="text-4xl font-extralight text-cream mb-2">95%</div>
                <div className="text-sm text-cream/80 tracking-wide font-light">Client Referral Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Ready to Experience the ALTO Difference?</h2>
              <p className="text-xl text-brown-700 leading-relaxed">
                Join thousands of satisfied clients who've achieved exceptional results with South East Queensland's 
                premier property specialists.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/selling/property-report#report-form">
                  <Button
                    size="lg"
                    className="bg-brand-red hover:bg-brand-red/90 text-white font-light tracking-wide px-12 py-6 h-auto text-base"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Free Property Appraisal
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-12 py-6 h-auto border-brown-900 text-brown-900 hover:bg-brown-50 bg-transparent w-full sm:w-auto"
                  >
                    <PhoneCall className="mr-2 h-5 w-5" />
                    Speak to Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}