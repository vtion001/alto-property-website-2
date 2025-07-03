import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"

export default function OurTeamPage() {
  const teamMembers = [
    {
      name: "Sarah Mitchell",
      role: "Principal & Director",
      image: "/placeholder.svg?height=400&width=300",
      description:
        "With over 15 years in Brisbane real estate, Sarah leads our team with passion and expertise. She specializes in luxury property sales and has achieved record-breaking results for her clients.",
      email: "sarah@altopropertygroup.com.au",
      phone: "(07) 3000 0001",
      specialties: ["Luxury Sales", "Investment Strategy", "Market Analysis"],
    },
    {
      name: "David Chen",
      role: "Senior Property Manager",
      image: "/placeholder.svg?height=400&width=300",
      description:
        "David brings exceptional attention to detail and client service to property management. His proactive approach ensures maximum returns and minimal vacancy periods.",
      email: "david@altopropertygroup.com.au",
      phone: "(07) 3000 0002",
      specialties: ["Property Management", "Tenant Relations", "Maintenance Coordination"],
    },
    {
      name: "Emma Thompson",
      role: "Sales Specialist",
      image: "/placeholder.svg?height=400&width=300",
      description:
        "Emma combines market knowledge with exceptional negotiation skills to achieve outstanding results. She has a proven track record in both residential and commercial sales.",
      email: "emma@altopropertygroup.com.au",
      phone: "(07) 3000 0003",
      specialties: ["Residential Sales", "Commercial Property", "First Home Buyers"],
    },
    {
      name: "Michael Rodriguez",
      role: "Leasing Consultant",
      image: "/placeholder.svg?height=400&width=300",
      description:
        "Michael excels at matching tenants with their perfect rental properties. His friendly approach and thorough screening process ensures quality tenancies for property owners.",
      email: "michael@altopropertygroup.com.au",
      phone: "(07) 3000 0004",
      specialties: ["Rental Leasing", "Tenant Screening", "Property Inspections"],
    },
    {
      name: "Lisa Wang",
      role: "Marketing Coordinator",
      image: "/placeholder.svg?height=400&width=300",
      description:
        "Lisa creates compelling marketing campaigns that showcase properties in their best light. Her creative approach and attention to detail drive exceptional results.",
      email: "lisa@altopropertygroup.com.au",
      phone: "(07) 3000 0005",
      specialties: ["Property Marketing", "Photography", "Digital Campaigns"],
    },
    {
      name: "James Wilson",
      role: "Business Development Manager",
      image: "/placeholder.svg?height=400&width=300",
      description:
        "James focuses on building strategic partnerships and expanding our service offerings. His industry connections and business acumen drive continued growth.",
      email: "james@altopropertygroup.com.au",
      phone: "(07) 3000 0006",
      specialties: ["Business Development", "Strategic Partnerships", "Client Relations"],
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Team</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Meet Our
                <span className="block font-light text-brown-700 mt-2">Expert</span>
                <span className="block font-extralight text-brown-600 mt-2">Team</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Our experienced professionals are dedicated to delivering exceptional results with genuine care. Each
                team member brings unique expertise and a commitment to excellence.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                  <div className="relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={400}
                      className="w-full h-80 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-light text-brown-900 mb-2">{member.name}</h3>
                        <Badge variant="secondary" className="bg-brown-100 text-brown-800 mb-4">
                          {member.role}
                        </Badge>
                        <p className="text-brown-700 font-light leading-relaxed mb-4">{member.description}</p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-brown-900">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="border-brown-200 text-brown-700">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-brown-100">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-brown-600" />
                          <span className="text-sm text-brown-700">{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-brown-600" />
                          <span className="text-sm text-brown-700">{member.phone}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream font-light">
                        Contact {member.name.split(" ")[0]}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
