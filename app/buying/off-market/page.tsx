import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, Lock, Star, Users } from "lucide-react"

export default function OffMarketPage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Exclusive Access</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                    Off-Market
                    <span className="block font-light text-brown-700 mt-2">Property</span>
                    <span className="block font-extralight text-brown-600 mt-2">Listings</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Access exclusive properties before they hit the public market. Our off-market network gives you
                    first opportunity on premium properties.
                  </p>
                </div>
              </div>
              <Card className="border border-brown-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-brown-900 font-light">Access Off-Market Properties</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Register to receive exclusive off-market property opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">First Name</label>
                      <Input placeholder="John" className="border-brown-200 focus:border-brown-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Last Name</label>
                      <Input placeholder="Doe" className="border-brown-200 focus:border-brown-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Phone</label>
                    <Input placeholder="(07) 1234 5678" className="border-brown-200 focus:border-brown-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Budget Range</label>
                    <select className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm">
                      <option>$500k - $750k</option>
                      <option>$750k - $1M</option>
                      <option>$1M - $1.5M</option>
                      <option>$1.5M - $2M</option>
                      <option>$2M+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Preferred Areas</label>
                    <Input
                      placeholder="New Farm, Teneriffe, South Brisbane"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>
                  <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 h-auto font-light tracking-wide">
                    Register for Off-Market Access
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Why Off-Market Properties?</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Exclusive Access</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    See properties before they're advertised to the general public.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Less Competition</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Fewer buyers competing means better negotiating position.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Premium Properties</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Access to high-quality properties in sought-after locations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Privacy</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Discreet sales process without public marketing exposure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready for Exclusive Access?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Join our exclusive network and be the first to know about premium off-market opportunities.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Register Now
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
