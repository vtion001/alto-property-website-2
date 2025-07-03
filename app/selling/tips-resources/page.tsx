import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Home, Camera, Users } from "lucide-react"

export default function TipsResourcesPage() {
  const tips = [
    {
      icon: Home,
      title: "First Impressions Matter",
      description:
        "Ensure your property's curb appeal is outstanding. A well-maintained exterior creates positive first impressions for potential buyers.",
    },
    {
      icon: Camera,
      title: "Professional Photography",
      description:
        "High-quality photos are essential for online listings. Professional photography can increase inquiry rates by up to 40%.",
    },
    {
      icon: Users,
      title: "Flexible Inspection Times",
      description:
        "Accommodate buyer schedules with flexible inspection times, including evenings and weekends when possible.",
    },
    {
      icon: Lightbulb,
      title: "Highlight Unique Features",
      description:
        "Identify and showcase your property's unique selling points that differentiate it from similar properties in the area.",
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Tips & Resources</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Selling Tips
                <span className="block font-light text-brown-700 mt-2">& Expert</span>
                <span className="block font-extralight text-brown-600 mt-2">Resources</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Expert advice and practical resources to help you achieve the best possible outcome when selling your
                property.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {tips.map((tip, index) => (
                <Card key={index} className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                  <CardHeader className="text-center">
                    <div className="bg-brown-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <tip.icon className="h-8 w-8 text-brown-700" />
                    </div>
                    <CardTitle className="text-lg font-light text-brown-900">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brown-700 font-light leading-relaxed text-center">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Need More Personalized Advice?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Our expert team is ready to provide tailored advice for your specific property and situation.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Speak to an Expert
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
