import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Award } from "lucide-react"

export default function ChoosingAgentPage() {
  const factors = [
    {
      title: "Local Market Knowledge",
      description:
        "Choose an agent with deep understanding of your local market, recent sales data, and buyer preferences.",
      icon: TrendingUp,
    },
    {
      title: "Proven Track Record",
      description:
        "Look for consistent results, client testimonials, and evidence of successful sales in your price range.",
      icon: Award,
    },
    {
      title: "Marketing Strategy",
      description:
        "Ensure your agent has a comprehensive marketing plan that reaches the right buyers for your property.",
      icon: Users,
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Agent Selection</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Choosing the
                <span className="block font-light text-brown-700 mt-2">Right</span>
                <span className="block font-extralight text-brown-600 mt-2">Agent</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Selecting the right real estate agent is crucial to achieving the best outcome for your property sale.
                Here's what to look for.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {factors.map((factor, index) => (
                <Card key={index} className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                  <CardContent className="p-8 text-center">
                    <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <factor.icon className="h-10 w-10 text-brown-700" />
                    </div>
                    <h3 className="text-xl font-light text-brown-900 mb-4">{factor.title}</h3>
                    <p className="text-brown-700 font-light leading-relaxed">{factor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Choose Alto?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Experience the difference with Brisbane's most trusted property specialists.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Meet Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
