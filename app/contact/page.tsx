import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Contact Us</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Get In
                <span className="block font-light text-brown-700 mt-2">Touch</span>
                <span className="block font-extralight text-brown-600 mt-2">Today</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Ready to experience exceptional results with genuine care? Contact our expert team today to discuss your
                property needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2">
              <div className="space-y-10">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="bg-brown-100 p-4 rounded-2xl">
                      <Phone className="h-7 w-7 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-medium text-brown-900 text-lg">Phone</div>
                      <div className="text-brown-700">(07) 3000 0000</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="bg-brown-100 p-4 rounded-2xl">
                      <Mail className="h-7 w-7 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-medium text-brown-900 text-lg">Email</div>
                      <div className="text-brown-700">info@altopropertygroup.com.au</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="bg-brown-100 p-4 rounded-2xl">
                      <MapPin className="h-7 w-7 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-medium text-brown-900 text-lg">Office</div>
                      <div className="text-brown-700">
                        Level 5, 123 Queen Street
                        <br />
                        Brisbane QLD 4000
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="bg-brown-100 p-4 rounded-2xl">
                      <Clock className="h-7 w-7 text-brown-700" />
                    </div>
                    <div>
                      <div className="font-medium text-brown-900 text-lg">Office Hours</div>
                      <div className="text-brown-700">
                        Monday - Friday: 9:00 AM - 5:30 PM
                        <br />
                        Saturday: 9:00 AM - 4:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border border-brown-100 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-brown-900 font-light">Send us a message</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Fill out the form below and we'll get back to you within 24 hours with a personalized response.
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
                    <Input
                      type="tel"
                      placeholder="(07) 1234 5678"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Message</label>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your property needs..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 h-auto font-light tracking-wide">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-brown-200">© {new Date().getFullYear()} Alto Property Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
