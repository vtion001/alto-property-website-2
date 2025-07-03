import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Search, CheckCircle, Users } from "lucide-react"

export default function ProspectiveTenantsPage() {
  const steps = [
    {
      icon: Search,
      title: "Search Properties",
      description: "Browse our extensive database of quality rental properties across Brisbane.",
    },
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete our streamlined online application with all required documentation.",
    },
    {
      icon: CheckCircle,
      title: "Application Review",
      description: "We review your application and conduct reference checks promptly.",
    },
    {
      icon: Users,
      title: "Move In",
      description: "Once approved, we arrange lease signing and move-in coordination.",
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">For Tenants</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Prospective
                <span className="block font-light text-brown-700 mt-2">Tenants</span>
                <span className="block font-extralight text-brown-600 mt-2">Welcome</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Find your perfect rental home with Alto Property Group. We make the rental process simple, transparent,
                and stress-free.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Your Rental Journey</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <Card key={index} className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                  <CardHeader className="text-center">
                    <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <step.icon className="h-10 w-10 text-brown-700" />
                    </div>
                    <CardTitle className="text-xl font-light text-brown-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brown-700 font-light leading-relaxed text-center">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Find Your New Home?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Start your search today and discover quality rental properties across Brisbane.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Search Rental Properties
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
