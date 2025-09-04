import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Award, Heart } from "lucide-react"

export default function JoinTeamPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Structured and personally strategized career progression with ongoing training and development opportunities.",
    },
    {
      icon: Award,
      title: "Competitive Commission",
      description: "We believe in getting paid fairly for what you do, our commission structure will surprise you.",
    },
    {
      icon: Users,
      title: "Supportive Culture",
      description: "Join a collaborative team that values genuine connections.",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and a culture that values personal wellbeing without sacrificing success.",
    },
  ]

  const openPositions = [
    {
      title: "Mortgage Broker",
      type: "Full-time",
      location: "Brisbane CBD",
      description:
        "Work closely with our sales team to deliver finance solutions for buyers. Access 40+ lenders, warm lead flow, and strong support to help clients secure the best outcomes.",
    },
    {
      title: "Sales Associate",
      type: "Full-time",
      location: "Brisbane CBD",
      description:
        "Opportunity for an ambitious sales professional to work with luxury properties and high-net-worth clients.",
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
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Careers</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Join Our
                <span className="block font-light text-brown-700 mt-2">Exceptional</span>
                <span className="block font-extralight text-brown-600 mt-2">Team</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Build your career with Brisbane's most trusted property specialists. We're looking for passionate
                professionals who share our commitment to exceptional results and genuine care.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Alto - Joshua's Story */}
        <section className="py-32 bg-gradient-to-br from-brown-50 to-stone-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Why Join Alto</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">A Life-Changing Opportunity</h2>
            </div>
            
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="bg-white p-12 rounded-lg shadow-lg border border-brown-100">
                <blockquote className="text-xl font-light text-brown-800 leading-relaxed italic mb-8">
                  "Having come from humble beginnings, Joshua had $500 left in his bank account before. Real estate changed his life, and he is committed to make sure to help others achieve the same."
                </blockquote>
                <p className="text-lg font-light text-brown-700 leading-relaxed">
                  If you're committed to improving yourself, genuine, eager to learn and go to the next level, you've come to the right place. We pride ourselves in collaboration, with the support of innovative systems, processes, structure and strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us - Benefits */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Why Work With Us</h2>
              <p className="text-xl text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Join a team that invests in your success and provides the tools you need to thrive.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border border-brown-100 hover:shadow-xl transition-all duration-500 text-center"
                >
                  <CardContent className="p-8">
                    <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="h-10 w-10 text-brown-700" />
                    </div>
                    <h3 className="text-xl font-light text-brown-900 mb-4">{benefit.title}</h3>
                    <p className="text-brown-700 font-light leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-32 bg-gradient-to-br from-brown-50 to-stone-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Current Opportunities</h2>
              <p className="text-xl text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Explore our current openings and take the next step in your property career.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                {openPositions.map((position, index) => (
                  <Card key={index} className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-brown-900 font-light">{position.title}</CardTitle>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="secondary" className="bg-brown-100 text-brown-800">
                              {position.type}
                            </Badge>
                            <span className="text-sm text-brown-600">{position.location}</span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-brown-700 font-light mt-4">
                        {position.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream font-light">
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Application Form */}
              <Card className="border border-brown-100 shadow-xl h-fit">
                <CardHeader>
                  <CardTitle className="text-2xl text-brown-900 font-light">Apply Today</CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Submit your application and we'll be in touch within 48 hours.
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
                    <Input placeholder="(07) 1234 5678" className="border-brown-200 focus:border-brown-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Position of Interest</label>
                    <select className="flex h-10 w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm">
                      <option>Select a position</option>
                      <option>Mortgage Broker</option>
                      <option>Sales Associate</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Cover Letter</label>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-brown-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us why you'd like to join the Alto team..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 h-auto font-light tracking-wide">
                    Submit Application
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
