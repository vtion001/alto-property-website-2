import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Home, Search, Handshake, FileText } from "lucide-react"
import ClientImage from "@/components/ui/client-image"
import Footer from "@/components/ui/footer"
import Link from "next/link"
import GoogleReviewsSection from "@/components/reviews/GoogleReviewsSection"

export default function BuyersAgentServicesPage() {
  // On mount, ensure the latest reviews are fetched (from DB/fallback)
  if (typeof window !== 'undefined') {
    ;(async () => {
      try {
        await fetch('/api/reviews/google', { cache: 'no-store' })
      } catch {}
    })()
  }
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Dedicated Buyer Agent</div>
                    <div className="w-16 h-px bg-brand-red"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    ALTO Buyer’s
                    <span className="block font-light text-brown-700 mt-2">Agent</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    We’ll find the perfect property, negotiate the ideal terms, and coordinate every step to settlement. 
                    With Alto as your buyer’s agent, consider it handled.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/buying/buying-with-alto#buyer-form">
                    <Button
                      size="lg"
                      className="bg-brown-900 hover:bg-brown-800 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                    >
                      Book a Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ClientImage
                    src="https://res.cloudinary.com/dbviya1rj/image/upload/v1757814157/w6442i2wt5wk70g8cbcv.jpg"
                    alt="Buyer agent consultation"
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

        {/* The Smoothest Path to Settlement */}
        <section id="services-section" className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">The Smoothest Path to Settlement</div>
                <div className="w-16 h-px bg-brand-red mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Our 5-Step Buying Process</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                We manage everything from search to settlement, so you can focus on moving in.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
              <div className="bg-brown-50 p-8 rounded-2xl border border-brown-100 text-center">
                <div className="w-14 h-14 bg-brown-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Search className="h-8 w-8 text-brown-700" />
                </div>
                <h3 className="text-2xl font-light text-brown-900 mb-2">Search</h3>
                <p className="text-brown-700 font-light">Detailed brief, suburb analysis, and access to off‑market opportunities.</p>
              </div>
              <div className="bg-brown-50 p-8 rounded-2xl border border-brown-100 text-center">
                <div className="w-14 h-14 bg-brown-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Home className="h-8 w-8 text-brown-700" />
                </div>
                <h3 className="text-2xl font-light text-brown-900 mb-2">Inspect</h3>
                <p className="text-brown-700 font-light">Shortlisted inspections with transparent feedback and recommendation.</p>
              </div>
              <div className="bg-brown-50 p-8 rounded-2xl border border-brown-100 text-center">
                <div className="w-14 h-14 bg-brown-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Handshake className="h-8 w-8 text-brown-700" />
                </div>
                <h3 className="text-2xl font-light text-brown-900 mb-2">Negotiate</h3>
                <p className="text-brown-700 font-light">Professional strategy and due diligence to secure below‑market outcomes.</p>
              </div>
              <div className="bg-brown-50 p-8 rounded-2xl border border-brown-100 text-center">
                <div className="w-14 h-14 bg-brown-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Shield className="h-8 w-8 text-brown-700" />
                </div>
                <h3 className="text-2xl font-light text-brown-900 mb-2">Secure</h3>
                <p className="text-brown-700 font-light">Contract terms that suit your timeline with risk managed at every step.</p>
              </div>
              <div className="bg-brown-50 p-8 rounded-2xl border border-brown-100 text-center">
                <div className="w-14 h-14 bg-brown-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <FileText className="h-8 w-8 text-brown-700" />
                </div>
                <h3 className="text-2xl font-light text-brown-900 mb-2">Settle</h3>
                <p className="text-brown-700 font-light">Seamless handover coordinating broker, conveyancer and building checks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Already Found the Property? */}
        <section className="py-24 bg-brown-50">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-light text-brown-900">Already found the perfect property?</h3>
                <p className="text-brown-700 font-light leading-relaxed">
                  We’ll step in and negotiate on your behalf. Alto handles strategy, due diligence, and terms so you
                  secure the home at the right price with confidence.
                </p>
              </div>
              <div className="text-center">
                <Link href="/buying/buying-with-alto#buyer-form">
                  <Button size="lg" className="bg-brown-900 hover:bg-brown-800 text-cream font-light px-10 py-6 h-auto">
                    Engage Negotiation Only
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* A Complete Support System */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <p className="text-xl font-light text-brown-800 leading-relaxed">
                Consistently achieving below‑market purchases is only one marker of success. Clear communication,
                complete transparency, and genuine care through every stage are equally important to us.
              </p>
              <p className="text-brown-700 font-light">
                Alto isn’t simply your buyer’s advocate. We are your support network from first brief to move‑in day and
                beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Save Time / Money / Clarity */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Personalised Service Tailored To You</div>
                <div className="w-16 h-px bg-brand-red mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">We Save You—Time, Money, Clarity</h2>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              <Card className="border border-brown-100 bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-light text-brown-900 mb-3">We Save You Time</h3>
                  <p className="text-brown-700 font-light">Stop losing weekends to inspections. We filter the market and bring you the right homes—often before they’re public.</p>
                </CardContent>
              </Card>
              <Card className="border border-brown-100 bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-light text-brown-900 mb-3">We Save You Money</h3>
                  <p className="text-brown-700 font-light">Data‑driven pricing, sharp negotiation, and contract terms that avoid costly short‑term accommodation or bridging finance.</p>
                </CardContent>
              </Card>
              <Card className="border border-brown-100 bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-light text-brown-900 mb-3">We Give You Clarity</h3>
                  <p className="text-brown-700 font-light">Objective guidance that removes emotion. Make confident, logical decisions with Alto in your corner.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        <GoogleReviewsSection />

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Secure Your Dream Property?</h2>
              <p className="text-xl text-cream/90 leading-relaxed">Our buyer’s agents work exclusively for you—focused on results, not listings.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/buying/buying-with-alto#buyer-form">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                  >
                    Book a Free Consultation
                  </Button>
                </Link>
                <Link href="#services-section" className="inline-block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-4 h-auto border-cream text-cream hover:bg-cream hover:text-brown-900 bg-transparent"
                  >
                    Learn About Our Services
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