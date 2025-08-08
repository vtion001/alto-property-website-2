
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Joshua Kim",
      role: "Sales Director",
      image: "https://res.cloudinary.com/dbviya1rj/image/upload/v1752833883/ejat8ma5eh1c3nwabkim.jpg",
      description:
        "As a strategic Sales Director, Joshua is an expert in driving revenue growth and expanding market share. He leads our high-performing sales team with a clear vision, developing innovative strategies and fostering a culture of excellence. With a proven track record of exceeding targets, he excels at building lasting client partnerships and ensuring the team delivers exceptional value and results.",
      email: "joshuakim@altoproperty.com",
      phone: "(+61) 467 048 837",
    },
    {
      name: "Amber Hsiao",
      role: "Mortgage Broker",
      image: "https://res.cloudinary.com/dbviya1rj/image/upload/v1753060414/cceoxxs20bhuzjr2dkts.jpg",
      description: "As a dedicated Mortgage Broker, Amber leverages deep market knowledge and sharp negotiation skills to find the perfect home loan for her clients. She is committed to simplifying the complexities of financing, guiding you every step of the way to ensure a smooth and successful path to property ownership.",
      email: "amber.h@ausunfinance.com.au",
      phone: "(+61) 466 623 689",
    },
    {
      name: "Connor Reilly",
      role: "Property Manager",
      image: "https://res.cloudinary.com/dbviya1rj/image/upload/v1753060413/wonnpo3gatludlru78oh.jpg",
      description: "As a diligent Property Manager, Connor applies his expertise to maximize the return on your investment property. He excels at securing reliable tenants, managing maintenance, and ensuring your asset is protected and profitable, giving property owners complete peace of mind.",
      email: "info.altopm@gmail.com",
      phone: "(+61) 437 139 314",
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
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Team</div>
                <div className="w-16 h-px bg-brand-red mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Meet Our
                <span className="block font-light text-brown-700 mt-2">Expert</span>
                <span className="block font-extralight text-brown-600 mt-2">Team</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Our experienced professionals are dedicated to delivering exceptional results with genuine care. Meet
                the team that makes Alto Property Group Brisbane's most trusted property specialists.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-32 bg-white">
          <div className="container">
            {/* 
              TODO: Future Enhancement - Team Visual Update
              When available, integrate "funny working photos" of the team to convey 
              a genuine, approachable vibe. Consider adding:
              - Candid workplace moments
              - Team interaction photos
              - Behind-the-scenes shots
              This will enhance the authentic, personal connection with potential clients.
            */}
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                  <div className="relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={400}
                      className="w-full h-80 object-cover object-center rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-light text-brown-900 mb-2">{member.name}</h3>
                        <Badge variant="secondary" className="bg-brown-100 text-brown-800">
                          {member.role}
                        </Badge>
                      </div>
                      <p className="text-brown-700 font-light leading-relaxed">{member.description}</p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-brown-600" />
                          <span className="text-sm text-brown-700">{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-brown-600" />
                          <span className="text-sm text-brown-700">{member.phone}</span>
                        </div>
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
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Work With Our Team?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Contact us today to experience the Alto difference with our expert team.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                asChild
              >
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="text-center">
            <div className="text-center space-y-4">
              <p className="text-brown-200">4/66 Condamine St, Runcorn QLD 4113, Australia</p>
              <p className="text-brown-200">© {new Date().getFullYear()} ALTO Property. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
