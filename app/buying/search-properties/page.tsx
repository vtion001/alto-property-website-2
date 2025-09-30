"use client"
import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Bed, Bath, Car } from "lucide-react"
import Image from "next/image"

type Property = {
  id: string
  title: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  parking: number
  image: string
  listing_type?: string
  listingType?: string
  type?: string
  suburb?: string
  beds?: number
  baths?: number
}

export default function SearchPropertiesPage() {
  const [mounted, setMounted] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  useEffect(() => {
    setMounted(true)
    ;(async () => {
      try {
        const res = await fetch('/api/properties', { cache: 'no-store' })
        const data = await res.json()
        setProperties((data || []).filter((p: Property) => p.listing_type === 'sale' || p.listingType === 'sale'))
      } catch {}
    })()
  }, [])
  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1" id="search-properties" data-section="search-properties">
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Property Search</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Find Your
                <span className="block font-light text-brown-700 mt-2">Dream</span>
                <span className="block font-extralight text-brown-600 mt-2">Property</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-b border-brown-100">
          <div className="container">
            <Card className="border border-brown-100">
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Location</label>
                    <Input placeholder="Suburb or postcode" className="border-brown-200 focus:border-brown-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Property Type</label>
                    <select className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm">
                      <option>Any</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Townhouse</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Price Range</label>
                    <select className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm">
                      <option>Any</option>
                      <option>$0 - $500k</option>
                      <option>$500k - $1M</option>
                      <option>$1M+</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property: Property, index: number) => (
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
                    <Badge className="absolute top-6 left-6 bg-brown-900 text-cream">{(property.type || '').toString().replace(/^./, (c: string) => c.toUpperCase())}</Badge>
                  </div>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-xl text-brown-900 mb-2">{property.title}</h3>
                        <p className="text-brown-700 flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {property.suburb || property.location}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-light text-brown-900">{property.price}</div>
                        <div className="flex items-center space-x-4 text-sm text-brown-700">
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            {property.beds}
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            {property.baths}
                          </div>
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-1" />
                            {property.parking}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {properties.length === 0 && (
                <div className="col-span-full text-center text-brown-600">No sale properties available.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
