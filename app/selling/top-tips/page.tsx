import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TopTipsPage() {
  const tips = [
    {
      number: "01",
      title: "Price It Right From the Start",
      description:
        "Accurate pricing based on recent comparable sales is crucial. Overpricing can lead to extended time on market and ultimately a lower sale price.",
    },
    {
      number: "02",
      title: "Maximize Curb Appeal",
      description:
        "First impressions count. Ensure your property's exterior is well-maintained, gardens are tidy, and the entrance is welcoming.",
    },
    {
      number: "03",
      title: "Declutter and Depersonalize",
      description: "Remove personal items and excess furniture to help buyers envision themselves living in the space.",
    },
    {
      number: "04",
      title: "Professional Photography is Essential",
      description:
        "High-quality photos are the first thing buyers see online. Professional photography can significantly increase inquiry rates.",
    },
    {
      number: "05",
      title: "Be Flexible with Inspections",
      description: "Accommodate buyer schedules as much as possible. More inspections typically lead to more offers.",
    },
    {
      number: "06",
      title: "Consider Pre-Sale Styling",
      description: "Professional styling can help your property stand out and appeal to a broader range of buyers.",
    },
    {
      number: "07",
      title: "Address Minor Repairs",
      description:
        "Fix small issues before listing. Buyers often perceive minor problems as indicators of larger issues.",
    },
    {
      number: "08",
      title: "Market Strategically",
      description: "Use multiple marketing channels to reach the widest possible audience of qualified buyers.",
    },
    {
      number: "09",
      title: "Be Prepared for Negotiations",
      description: "Understand your bottom line and be prepared to negotiate on price, terms, and settlement dates.",
    },
    {
      number: "10",
      title: "Choose the Right Agent",
      description:
        "Select an agent with proven local market knowledge, strong marketing skills, and excellent negotiation abilities.",
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Expert Advice</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Top 10 Tips
                <span className="block font-light text-brown-700 mt-2">for Selling</span>
                <span className="block font-extralight text-brown-600 mt-2">Your Property</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Our expert team shares the top 10 strategies that consistently deliver exceptional results for property
                sellers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2">
              {tips.map((tip, index) => (
                <Card key={index} className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-brown-900 text-cream w-12 h-12 rounded-full flex items-center justify-center text-lg font-light flex-shrink-0">
                        {tip.number}
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-light text-brown-900">{tip.title}</h3>
                        <p className="text-brown-700 font-light leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Implement These Tips?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Let our expert team help you apply these strategies to achieve the best possible outcome for your
                property sale.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Get Expert Help
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
