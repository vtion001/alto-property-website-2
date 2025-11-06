import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Shield, Wrench, FileText, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export default function ManagementServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Management Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                Comprehensive
                <span className="block font-light text-brown-700 mt-2">Property</span>
                <span className="block font-extralight text-brown-600 mt-2">Management</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                End‑to‑end management designed to maximise returns and minimise hassle across South East Queensland.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Services</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">What We Manage</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                From tenant screening to maintenance and reporting — consider it handled.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Tenant Screening</CardTitle>
                  <CardDescription className="text-brown-700 font-light">Rigorous checks to secure reliable tenants.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Background & reference checks</span></li>
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Income & affordability verification</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Lease Management</CardTitle>
                  <CardDescription className="text-brown-700 font-light">Contracts, renewals, and compliance handled.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Lease preparation & renewals</span></li>
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Regulatory compliance</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Wrench className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Maintenance Coordination</CardTitle>
                  <CardDescription className="text-brown-700 font-light">Trusted trades, timely repairs, preventive care.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Routine & emergency maintenance</span></li>
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Preventive programs</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">Financial Reporting</CardTitle>
                  <CardDescription className="text-brown-700 font-light">Tax‑ready statements and transparent insights.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Monthly statements</span></li>
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Annual summaries</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-brown-700" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">24/7 Support</CardTitle>
                  <CardDescription className="text-brown-700 font-light">Rapid response and proactive communication.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">After‑hours support</span></li>
                    <li className="flex items-center space-x-3"><CheckCircle className="h-5 w-5 text-brown-600" /><span className="text-brown-800 font-light">Tenant communications</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Get Started?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Contact us today for a free consultation and rental appraisal.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/manage/rental-appraisal#appraisal-form" className="inline-block">
                  <span className="inline-flex items-center justify-center border border-cream text-cream hover:bg-cream hover:text-brown-900 px-10 py-4 rounded-md text-lg">Get Free Appraisal</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Management Services — End‑to‑End Property Care",
  description:
    "Comprehensive property management services across South East Queensland including tenant screening, maintenance, reporting, and 24/7 support.",
  openGraph: {
    title: "Management Services — End‑to‑End Property Care",
    description:
      "Comprehensive property management across South East Queensland.",
    url: "/manage/management-services",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1758097997/soyhk4tmtn9qprgqjlp5.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Property Management Services",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Management Services — End‑to‑End Property Care",
    description:
      "Tenant screening, maintenance coordination, financial reporting, and 24/7 support.",
    card: "summary_large_image",
    images: [
      "https://res.cloudinary.com/dbviya1rj/image/upload/v1758097997/soyhk4tmtn9qprgqjlp5.jpg",
    ],
  },
}