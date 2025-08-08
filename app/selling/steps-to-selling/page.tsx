import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function StepsToSellingPage() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description:
        "We meet to discuss your goals, timeline, and property details to create a customized selling strategy.",
      details: [
        "Property assessment and market analysis",
        "Discussion of your selling timeline",
        "Review of comparable sales",
        "Marketing strategy presentation",
      ],
    },
    {
      number: "02",
      title: "Property Preparation",
      description: "We help prepare your property to maximize its appeal and market value.",
      details: [
        "Professional photography and styling advice",
        "Minor repairs and improvements recommendations",
        "Property staging consultation",
        "Marketing material creation",
      ],
    },
    {
      number: "03",
      title: "Marketing Launch",
      description: "Your property goes live across all major platforms with premium marketing exposure.",
      details: [
        "Online listing across major portals",
        "Professional photography and virtual tours",
        "Social media marketing campaign",
        "Print advertising in premium publications",
      ],
    },
    {
      number: "04",
      title: "Buyer Engagement",
      description: "We actively engage with potential buyers and manage all inquiries and inspections.",
      details: [
        "Open home coordination",
        "Private inspection management",
        "Buyer feedback collection",
        "Qualified buyer identification",
      ],
    },
    {
      number: "05",
      title: "Negotiation & Sale",
      description: "We negotiate on your behalf to achieve the best possible price and terms.",
      details: [
        "Offer presentation and analysis",
        "Strategic negotiation management",
        "Contract preparation and review",
        "Settlement coordination",
      ],
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Selling Process</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Steps to
                <span className="block font-light text-brown-700 mt-2">Selling Your</span>
                <span className="block font-extralight text-brown-600 mt-2">Property</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Our proven 5-step process ensures a smooth and successful property sale, maximizing your return while
                minimizing stress.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="grid gap-12 lg:grid-cols-2 items-center">
                  <div className={`space-y-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="bg-brown-900 text-cream w-16 h-16 rounded-full flex items-center justify-center text-xl font-light">
                          {step.number}
                        </div>
                        <h2 className="text-3xl font-light text-brown-900">{step.title}</h2>
                      </div>
                      <p className="text-xl text-brown-700 leading-relaxed">{step.description}</p>
                    </div>
                    <ul className="space-y-4">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-brown-600 mt-0.5 flex-shrink-0" />
                          <span className="text-brown-800 font-light">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Card className={`border border-brown-100 shadow-xl ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <CardContent className="p-12 text-center">
                      <div className="bg-brown-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="text-6xl font-extralight text-brown-700">{step.number}</span>
                      </div>
                      <h3 className="text-2xl font-light text-brown-900 mb-4">{step.title}</h3>
                      <p className="text-brown-700 font-light leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Start Your Selling Journey?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Let our expert team guide you through each step of the selling process.
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
