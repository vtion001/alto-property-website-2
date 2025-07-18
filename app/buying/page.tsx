import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Heart, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BuyingPage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Property Buying</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Find Your
                    <span className="block font-light text-brown-700 mt-2">Perfect</span>
                    <span className="block font-extralight text-brown-600 mt-2">Property</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Discover exceptional properties with our expert guidance. We make your property buying journey
                    seamless and successful.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                  >
                    Search Properties
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Property Match Service
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=700&width=600"
                    alt="Property search"
                    width={600}
                    height={700}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Buying Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Complete Buying Solutions</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 transition-all duration-300">
                    <Search className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Property Search</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Browse our extensive database of premium properties.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/buying/search-properties">
                    <Button
                      variant="outline"
                      className="w-full border-brown-200 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      Search Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 transition-all duration-300">
                    <Heart className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Property Match</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Let us find the perfect property that matches your criteria.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/buying/property-match">
                    <Button
                      variant="outline"
                      className="w-full border-brown-200 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      Get Matched
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 transition-all duration-300">
                    <Calendar className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Open Homes</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    View upcoming open home and auction schedules.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/buying/open-homes">
                    <Button
                      variant="outline"
                      className="w-full border-brown-200 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      View Schedule
                    </Button>
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
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Find Your Dream Property?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Start your property search today or let our experts help you find the perfect match.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Start Property Search
              </Button>
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
