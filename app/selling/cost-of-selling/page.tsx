import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Calculator, FileText } from "lucide-react"

export default function CostOfSellingPage() {
  const costs = [
    {
      category: "Agent Commission",
      percentage: "2.5% - 3.5%",
      description: "Professional sales service including marketing, negotiation, and settlement coordination",
      icon: DollarSign,
    },
    {
      category: "Marketing Costs",
      range: "$2,000 - $8,000",
      description: "Photography, advertising, signage, and promotional materials",
      icon: FileText,
    },
    {
      category: "Legal & Settlement",
      range: "$1,500 - $3,000",
      description: "Conveyancing, contract preparation, and settlement fees",
      icon: Calculator,
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Selling Costs</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Cost of
                <span className="block font-light text-brown-700 mt-2">Selling Your</span>
                <span className="block font-extralight text-brown-600 mt-2">Property</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Understanding the costs involved in selling your property helps you plan effectively and maximize your
                net return.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {costs.map((cost, index) => (
                <Card key={index} className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                  <CardHeader className="text-center">
                    <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <cost.icon className="h-10 w-10 text-brown-700" />
                    </div>
                    <CardTitle className="text-xl font-light text-brown-900">{cost.category}</CardTitle>
                    <div className="text-2xl font-light text-brown-700">{cost.percentage || cost.range}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brown-700 font-light leading-relaxed text-center">{cost.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Get a Detailed Cost Breakdown</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Contact us for a personalized cost estimate based on your specific property and situation.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Get Cost Estimate
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
