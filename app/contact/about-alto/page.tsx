
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, TrendingUp, Shield, Clock, Target } from "lucide-react"
import Image from "next/image"

export default function AboutAltoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">About Alto</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                New Generation
                <span className="block font-light text-brown-700 mt-2">of Real</span>
                <span className="block font-extralight text-brown-600 mt-2">Estate</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                A company built upon values of exceptional results and genuine care. From humble beginnings to becoming a premier property specialist servicing South-East Queensland, consistently delivering superior outcomes through market expertise, innovative technologies and unwavering client commitment.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                  <Badge variant="secondary" className="bg-brown-100 text-brown-800 px-4 py-2">
                    Our Story
                  </Badge>
                  <h2 className="text-4xl font-light sm:text-5xl text-brown-900">Built on Excellence and Trust</h2>
                  <p className="text-lg text-brown-700 leading-relaxed">
                    Founded in 2025, Alto Property emerged from a simple vision: to revolutionize real estate services in South East Queensland through innovative systems and processes paired with genuine care for clients and team alike.
                  </p>
                  <p className="text-lg text-brown-700 leading-relaxed">
                    What started as just a vision from a boy that knows nothing but real estate has now evolved into a premier real estate agency delivering exceptional value to clients via a clear vision and message. To Joshua this isn't just a job, it has changed his life and he strives to help others achieve the same.
                  </p>
                  <p className="text-lg text-brown-700 leading-relaxed">
                    Whatever part of the journey you are in, we would love to have a chat. Get in touch today.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image src="https://res.cloudinary.com/dbviya1rj/image/upload/v1752805024/fk3bf9baj1ejlkn5voji.jpg?height=600&width=500"
                  alt="Alto Property Group office"
                  width={500}
                  height={600}
                  priority
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-32 bg-gradient-to-br from-brown-50 to-stone-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Values</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">What Drives Us</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Excellence</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    We strive for excellence in every interaction, delivering results that exceed expectations and set
                    new industry standards.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Genuine Care</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Our clients' success is our success. We build lasting relationships based on trust, transparency,
                    and genuine care for their goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Integrity</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    We operate with complete transparency and honesty, ensuring our clients always know where they stand
                    and what to expect.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Innovation</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    We embrace technology and innovative approaches to deliver superior results and streamlined
                    experiences for our clients.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Reliability</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Our clients can count on us to deliver on our promises, respond promptly, and be there when they
                    need us most.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Results-Focused</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Every strategy we implement is designed to achieve measurable results that directly benefit our
                    clients' property goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Achievements */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Our Achievements</h2>
            </div>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-6xl font-extralight text-brown-800 mb-4">100+</div>
                <div className="text-lg text-brown-600 tracking-wide font-light">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-extralight text-brown-800 mb-4">$100M</div>
                <div className="text-lg text-brown-600 tracking-wide font-light">Sold Value</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-extralight text-brown-800 mb-4">98.5%</div>
                <div className="text-lg text-brown-600 tracking-wide font-light">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-extralight text-brown-800 mb-4">10+</div>
                <div className="text-lg text-brown-600 tracking-wide font-light">Years Combined Experience</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
