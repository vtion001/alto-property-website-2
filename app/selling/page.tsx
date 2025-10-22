import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  Award,
  Home,
  Calculator,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SellingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">
                      Selling Your Property
                    </div>
                    <div className="w-16 h-px bg-brand-red"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Sell Your
                    <span className="block font-light text-brown-700 mt-2">
                      Property
                    </span>
                    <span className="block font-extralight text-brown-600 mt-2">
                      With Confidence
                    </span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Achieve exceptional results with our proven sales process.
                    We combine market expertise with personalized service to
                    maximize your property&apos;s value.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/selling/property-report#report-form">
                    <Button
                      size="lg"
                      className="bg-brand-red hover:bg-brand-red/90 text-white font-light tracking-wide px-12 py-6 h-auto text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Get Free Appraisal
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Download Selling Guide
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dbviya1rj/image/upload/v1758168201/tg0pxnmzsjreop7kuaqt.jpg"
                    alt="Property for sale"
                    width={600}
                    height={700}
                    priority
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">
                  Selling Services
                </div>
                <div className="w-16 h-px bg-brand-red"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">
                Complete Selling Solutions
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 transition-all duration-300">
                    <Calculator className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">
                    Free Property Report
                  </CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Get an instant property valuation and market analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/selling/property-report#report-form">
                    <Button
                      variant="outline"
                      className="w-full border-brown-200 text-brown-800 hover:bg-brown-50 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Get Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 transition-all duration-300">
                    <Home className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">
                    Recently Sold
                  </CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    View our recent sales results and success stories.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/selling/recently-sold">
                    <Button
                      variant="outline"
                      className="w-full border-brown-200 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      View Sales
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100">
                <CardHeader>
                  <div className="bg-brown-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brown-900 transition-all duration-300">
                    <FileText className="h-8 w-8 text-brown-700 group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl text-brown-900 font-light">
                    Selling Guide
                  </CardTitle>
                  <CardDescription className="text-brown-700 font-light">
                    Download our comprehensive guide to selling your property.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/selling/selling-guide">
                    <Button
                      variant="outline"
                      className="w-full border-brown-200 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      Download Guide
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Sell With Alto */}
        <section className="py-24 bg-gradient-to-br from-brown-50 to-stone-50">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">
                Why Sell With Alto
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">
                  Premium Results
                </h3>
                <p className="text-brown-700 font-light">
                  Consistently achieving above-market prices for our clients.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">
                  Expert Team
                </h3>
                <p className="text-brown-700 font-light">
                  Experienced agents with deep local market knowledge.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-10 w-10 text-brown-700" />
                </div>
                <h3 className="text-xl font-light text-brown-900">
                  Award Winning
                </h3>
                <p className="text-brown-700 font-light">
                  Recognized excellence in property sales and service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">
                Ready to Sell Your Property?
              </h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get started with a free property appraisal and discover your
                property&apos;s true market value.
              </p>
              <div className="flex justify-center">
                <Link href="/selling/property-report#report-form">
                  <Button
                    size="lg"
                    className="bg-brand-red hover:bg-brand-red/90 text-white font-light tracking-wide px-12 py-6 h-auto text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Get Free Appraisal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-brown-200">
              © {new Date().getFullYear()} ALTO REAL ESTATE. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
