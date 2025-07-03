import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Property Insights</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Property
                <span className="block font-light text-brown-700 mt-2">Market</span>
                <span className="block font-extralight text-brown-600 mt-2">Insights</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Stay informed with the latest property market trends, investment tips, and expert insights from our
                experienced team at Alto Property Group.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Brisbane Property Market Outlook 2024",
                  excerpt:
                    "Discover the key trends shaping Brisbane's property market and what it means for investors.",
                  image: "/placeholder.svg?height=300&width=400",
                  date: "March 15, 2024",
                  author: "Sarah Mitchell",
                  category: "Market Analysis",
                },
                {
                  title: "Top 10 Investment Suburbs in Brisbane",
                  excerpt: "Our expert analysis of Brisbane's most promising suburbs for property investment.",
                  image: "/placeholder.svg?height=300&width=400",
                  date: "March 10, 2024",
                  author: "David Chen",
                  category: "Investment Tips",
                },
                {
                  title: "Property Styling Tips for Maximum Returns",
                  excerpt:
                    "Simple styling techniques that can significantly increase your property's appeal and value.",
                  image: "/placeholder.svg?height=300&width=400",
                  date: "March 5, 2024",
                  author: "Emma Thompson",
                  category: "Property Tips",
                },
              ].map((post, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-brown-900 text-cream">{post.category}</Badge>
                  </div>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-light text-brown-900 mb-3 group-hover:text-brown-700 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-brown-700 font-light leading-relaxed">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-brown-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
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
              <h2 className="text-4xl font-light sm:text-5xl">Stay Updated With Market Insights</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Subscribe to our newsletter for the latest property market updates and expert insights.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Subscribe to Newsletter
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
