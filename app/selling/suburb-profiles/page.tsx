import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, Home } from "lucide-react"

export default function SuburbProfilesPage() {
  const suburbs = [
    {
      name: "New Farm",
      medianPrice: "$1,250,000",
      growth: "+8.5%",
      type: "Riverside Living",
      description: "Trendy riverside suburb known for its cafes, markets, and heritage architecture.",
      features: ["Riverside location", "Heritage homes", "Vibrant dining scene", "Close to CBD"],
    },
    {
      name: "Teneriffe",
      medianPrice: "$1,750,000",
      growth: "+12.3%",
      type: "Luxury Apartments",
      description: "Premium waterfront suburb with luxury apartments and industrial heritage.",
      features: ["Waterfront living", "Luxury developments", "Industrial heritage", "River access"],
    },
    {
      name: "South Brisbane",
      medianPrice: "$850,000",
      growth: "+6.2%",
      type: "Urban Lifestyle",
      description: "Dynamic urban precinct with cultural attractions and modern living.",
      features: ["Cultural precinct", "Modern apartments", "Transport hub", "City views"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Market Intelligence</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Suburb
                <span className="block font-light text-brown-700 mt-2">Market</span>
                <span className="block font-extralight text-brown-600 mt-2">Profiles</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Detailed market insights for Brisbane's premium suburbs, helping you understand local property trends
                and opportunities.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3">
              {suburbs.map((suburb, index) => (
                <Card key={index} className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-light text-brown-900 mb-2">{suburb.name}</CardTitle>
                        <Badge variant="secondary" className="bg-brown-100 text-brown-800">
                          {suburb.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-light text-brown-900">{suburb.medianPrice}</div>
                        <div className="text-green-600 font-medium">{suburb.growth}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-brown-700 font-light leading-relaxed">{suburb.description}</p>

                    <div className="space-y-3">
                      <h4 className="font-medium text-brown-900">Key Features:</h4>
                      <ul className="space-y-2">
                        {suburb.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-brown-600 rounded-full"></div>
                            <span className="text-brown-700 font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-brown-100">
                      <div className="text-center">
                        <MapPin className="h-6 w-6 text-brown-600 mx-auto mb-2" />
                        <div className="text-sm text-brown-700">Location</div>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="h-6 w-6 text-brown-600 mx-auto mb-2" />
                        <div className="text-sm text-brown-700">Growth</div>
                      </div>
                      <div className="text-center">
                        <Home className="h-6 w-6 text-brown-600 mx-auto mb-2" />
                        <div className="text-sm text-brown-700">Lifestyle</div>
                      </div>
                    </div>

                    <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream font-light">
                      View Detailed Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Need Detailed Market Analysis?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get comprehensive suburb reports and market insights tailored to your property investment goals.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Request Market Report
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
