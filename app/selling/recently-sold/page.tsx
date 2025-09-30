import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"
import Image from "next/image"

export default function RecentlySoldPage() {
  const soldProperties = [
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Luxury Riverside Apartment",
      location: "South Brisbane",
      soldPrice: "$850,000",
      beds: 2,
      baths: 2,
      parking: 1,
      soldDate: "March 2024",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Heritage Family Home",
      location: "New Farm",
      soldPrice: "$1,250,000",
      beds: 4,
      baths: 3,
      parking: 2,
      soldDate: "February 2024",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Contemporary Townhouse",
      location: "Teneriffe",
      soldPrice: "$1,750,000",
      beds: 3,
      baths: 2,
      parking: 2,
      soldDate: "February 2024",
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Recently Sold</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Recent
                <span className="block font-light text-brown-700 mt-2">Sales</span>
                <span className="block font-extralight text-brown-600 mt-2">Success</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Discover our recent sales successes across Brisbane&apos;s premium suburbs. See how we consistently achieve
                exceptional results for our clients.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {soldProperties.map((property, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 border border-brown-100"
                >
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-6 left-6 bg-green-600 text-white">SOLD</Badge>
                  </div>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-xl text-brown-900 mb-2">{property.title}</h3>
                        <p className="text-brown-700 flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {property.location}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-light text-brown-900">{property.soldPrice}</div>
                        <div className="flex items-center space-x-6 text-sm text-brown-700">
                          <span>{property.beds} bed</span>
                          <span>{property.baths} bath</span>
                          <span>{property.parking} car</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-brown-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Sold {property.soldDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
