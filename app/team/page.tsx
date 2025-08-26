
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { teamMembers } from "@/data/team"
import TeamMemberCard from "@/components/team/TeamMemberCard"

export default function TeamPage() {
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
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-6xl mx-auto">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
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
