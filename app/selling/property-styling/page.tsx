import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Home, Eye, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function PropertyStylingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Property Styling</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                    Professional
                    <span className="block font-light text-brown-700 mt-2">Property</span>
                    <span className="block font-extralight text-brown-600 mt-2">Styling</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Transform your property with professional styling that appeals to buyers and maximizes your sale
                    price.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                >
                  Book Styling Consultation
                </Button>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Styled property interior"
                  width={500}
                  height={600}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Why Professional Styling Works</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center">
                  <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-lg font-light text-brown-900">Visual Appeal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brown-700 font-light leading-relaxed text-center">
                    Creates an immediate emotional connection with potential buyers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center">
                  <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-lg font-light text-brown-900">Space Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brown-700 font-light leading-relaxed text-center">
                    Maximizes the perceived size and functionality of each room.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center">
                  <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-lg font-light text-brown-900">Broad Appeal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brown-700 font-light leading-relaxed text-center">
                    Neutral styling appeals to the widest range of potential buyers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center">
                  <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-lg font-light text-brown-900">Higher Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brown-700 font-light leading-relaxed text-center">
                    Styled properties typically sell for 5-15% more than unstaged properties.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Style Your Property?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Contact our styling team to discuss how professional styling can maximize your property's appeal and
                sale price.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Book Styling Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
