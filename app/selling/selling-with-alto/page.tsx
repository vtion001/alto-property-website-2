import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Award, Users, TrendingUp } from "lucide-react"

export default function SellingWithAltoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Selling With Alto</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Why Choose
                <span className="block font-light text-brown-700 mt-2">Alto Property</span>
                <span className="block font-extralight text-brown-600 mt-2">Group</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Experience the difference with Brisbane's most trusted property specialists. We deliver exceptional
                results through genuine care and unmatched expertise.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Award-Winning Service</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Recognized excellence in property sales and customer service across Brisbane.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Industry recognition</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Client testimonials</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Expert Team</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Licensed professionals with deep local market knowledge and proven track record.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">15+ years experience</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Local market expertise</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Premium Results</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Consistently achieving above-market prices with faster sale times.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Above-market results</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brown-600" />
                      <span className="text-brown-800 font-light">Faster sale times</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Sell With Alto?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Experience the Alto difference with our award-winning team and proven results.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Get Free Appraisal
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
