import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Smartphone, CheckCircle, Upload } from "lucide-react"

export default function ExpressCheckinPage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Express Check-In</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                    Quick &<span className="block font-light text-brown-700 mt-2">Easy</span>
                    <span className="block font-extralight text-brown-600 mt-2">Check-In</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Complete your property check-in quickly and efficiently with our digital express check-in service.
                  </p>
                </div>
              </div>
              <Card className="border border-brown-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-brown-900 font-light">Express Check-In Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Property Address</label>
                    <Input
                      placeholder="123 Queen Street, Brisbane QLD 4000"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Tenant Name</label>
                      <Input placeholder="John Doe" className="border-brown-200 focus:border-brown-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brown-900">Move-In Date</label>
                      <Input type="date" className="border-brown-200 focus:border-brown-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Contact Number</label>
                    <Input placeholder="(07) 1234 5678" className="border-brown-200 focus:border-brown-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Emergency Contact</label>
                    <Input
                      placeholder="Emergency contact details"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>
                  <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 h-auto font-light tracking-wide">
                    Complete Express Check-In
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Why Use Express Check-In?</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Save Time</h3>
                <p className="text-brown-700 font-light">Complete your check-in process in minutes, not hours.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Digital Convenience</h3>
                <p className="text-brown-700 font-light">Complete everything online from your phone or computer.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Easy Documentation</h3>
                <p className="text-brown-700 font-light">Upload photos and documents directly through our platform.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">Instant Confirmation</h3>
                <p className="text-brown-700 font-light">
                  Receive immediate confirmation once your check-in is complete.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
