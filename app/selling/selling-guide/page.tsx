import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, CheckCircle, TrendingUp, Users, Clock } from "lucide-react"
import Image from "next/image"

export default function SellingGuidePage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Selling Guide</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Complete
                    <span className="block font-light text-brown-700 mt-2">Selling</span>
                    <span className="block font-extralight text-brown-600 mt-2">Guide</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Everything you need to know about selling your property successfully. Download our comprehensive
                    guide.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Guide
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=700&width=600"
                    alt="Selling guide"
                    width={600}
                    height={700}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guide Contents */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">What's Inside</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-brown-700 mb-4" />
                  <CardTitle className="text-xl text-brown-900 font-light">Preparing Your Property</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Essential steps to maximize your property's appeal and value.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-brown-700 mb-4" />
                  <CardTitle className="text-xl text-brown-900 font-light">Market Analysis</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Understanding current market conditions and pricing strategies.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <Users className="h-8 w-8 text-brown-700 mb-4" />
                  <CardTitle className="text-xl text-brown-900 font-light">Choosing an Agent</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Key factors to consider when selecting your real estate agent.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <Clock className="h-8 w-8 text-brown-700 mb-4" />
                  <CardTitle className="text-xl text-brown-900 font-light">Timeline & Process</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Step-by-step timeline from listing to settlement.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-brown-700 mb-4" />
                  <CardTitle className="text-xl text-brown-900 font-light">Legal Requirements</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Important legal considerations and documentation needed.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-brown-700 mb-4" />
                  <CardTitle className="text-xl text-brown-900 font-light">Negotiation Tips</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Strategies for successful negotiations and closing deals.
                  </CardDescription>
                </CardHeader>
              </Card>
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
