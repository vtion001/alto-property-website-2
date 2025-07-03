import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"

export default function OpenHomesPage() {
  const openHomes = [
    {
      id: 1,
      address: "123 River Terrace, New Farm",
      price: "$1,200,000",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      date: "Saturday, Jan 20",
      time: "10:00 AM - 10:30 AM",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      address: "456 Stanley Street, South Bank",
      price: "$850,000",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      date: "Saturday, Jan 20",
      time: "11:00 AM - 11:30 AM",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      address: "789 Given Terrace, Paddington",
      price: "$1,450,000",
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      date: "Saturday, Jan 20",
      time: "2:00 PM - 2:30 PM",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="space-y-8">
                <div className="inline-block">
                  <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Open Homes</div>
                  <div className="w-16 h-px bg-brown-300 mx-auto"></div>
                </div>
                <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                  Open Home
                  <span className="block font-light text-brown-700 mt-2">Schedule</span>
                </h1>
                <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                  Discover your next home at our upcoming open house inspections. View premium properties across
                  Brisbane's most desirable locations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Homes Listing */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">This Weekend's Open Homes</h2>
              <p className="text-xl font-light text-brown-700">
                Browse our upcoming open home inspections and plan your weekend viewings.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {openHomes.map((property) => (
                <Card
                  key={property.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-500 border border-brown-100"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.address}
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-brown-800 text-cream">Open Home</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <MapPin className="h-4 w-4 text-brown-700" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-light text-brown-800">{property.address}</h3>
                        <div className="text-2xl font-light text-brown-800 mt-2">{property.price}</div>
                      </div>

                      <div className="flex justify-between items-center text-sm text-brown-600">
                        <div className="flex space-x-4">
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <span>{property.parking} car</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-brown-100">
                        <div className="flex items-center space-x-2 text-brown-700">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{property.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-brown-700">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{property.time}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light">
                        View Property Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Can't Make It to an Open Home?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Book a private inspection at a time that suits you. Our team is available 7 days a week.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Book Private Inspection
              </Button>
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
