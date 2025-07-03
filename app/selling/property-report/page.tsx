import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calculator, TrendingUp, FileText, MapPin, Clock, Award } from "lucide-react"
import Image from "next/image"

export default function PropertyReportPage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Property Analysis</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Comprehensive
                    <span className="block font-light text-brown-700 mt-2">Market</span>
                    <span className="block font-extralight text-brown-600 mt-2">Analysis</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Get a detailed Comparative Market Analysis (CMA) report including recent sales data, market trends,
                    property condition assessment, and strategic pricing recommendations.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                  >
                    Get Free CMA Report
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    View Sample Report
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=700&width=600"
                    alt="Professional property analysis and market report"
                    width={600}
                    height={700}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Request Form */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-8 mb-16">
                <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Request Your Property Report</h2>
                <p className="text-xl font-light text-brown-700">
                  Complete this form to receive a comprehensive market analysis report within 24 hours, including
                  comparable sales data and strategic recommendations.
                </p>
              </div>

              <Card className="border border-brown-100 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl text-brown-900 font-light">Property Analysis Request</CardTitle>
                  <CardDescription className="text-brown-700 font-light text-lg">
                    Provide detailed property information for accurate market analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <form className="space-y-8">
                    {/* Property Details */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Property Information
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="address">Property Address *</Label>
                        <Input
                          id="address"
                          placeholder="e.g., 32 Veronica Avenue, Daisy Hill QLD 4127"
                          className="border-brown-200 focus:border-brown-400"
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="propertyType">Property Type *</Label>
                          <Select>
                            <SelectTrigger className="border-brown-200 focus:border-brown-400">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="unit">Unit</SelectItem>
                              <SelectItem value="duplex">Duplex</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bedrooms">Bedrooms *</Label>
                          <Select>
                            <SelectTrigger className="border-brown-200 focus:border-brown-400">
                              <SelectValue placeholder="Select bedrooms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="6">6+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bathrooms">Bathrooms *</Label>
                          <Select>
                            <SelectTrigger className="border-brown-200 focus:border-brown-400">
                              <SelectValue placeholder="Select bathrooms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="landSize">Land Size (sqm)</Label>
                          <Input
                            id="landSize"
                            placeholder="e.g., 650"
                            className="border-brown-200 focus:border-brown-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="buildingSize">Building Size (sqm)</Label>
                          <Input
                            id="buildingSize"
                            placeholder="e.g., 180"
                            className="border-brown-200 focus:border-brown-400"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="carSpaces">Car Spaces</Label>
                          <Select>
                            <SelectTrigger className="border-brown-200 focus:border-brown-400">
                              <SelectValue placeholder="Select spaces" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yearBuilt">Year Built (approximate)</Label>
                          <Input
                            id="yearBuilt"
                            placeholder="e.g., 1995"
                            className="border-brown-200 focus:border-brown-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Property Features */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Property Features & Condition
                      </h3>

                      <div className="space-y-4">
                        <Label>Property Features (select all that apply)</Label>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {[
                            "Swimming Pool",
                            "Air Conditioning",
                            "Dishwasher",
                            "Built-in Wardrobes",
                            "Ensuite",
                            "Walk-in Robe",
                            "Balcony/Deck",
                            "Garden/Yard",
                            "Garage",
                            "Carport",
                            "Study/Office",
                            "Fireplace",
                          ].map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                              <Checkbox id={feature.toLowerCase().replace(/[^a-z0-9]/g, "")} />
                              <Label
                                htmlFor={feature.toLowerCase().replace(/[^a-z0-9]/g, "")}
                                className="text-sm font-normal"
                              >
                                {feature}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Property Condition</Label>
                        <Select>
                          <SelectTrigger className="border-brown-200 focus:border-brown-400">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent - Recently renovated/new</SelectItem>
                            <SelectItem value="good">Good - Well maintained</SelectItem>
                            <SelectItem value="fair">Fair - Some maintenance required</SelectItem>
                            <SelectItem value="poor">Poor - Significant work needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="renovations">Recent Renovations/Improvements</Label>
                        <Textarea
                          id="renovations"
                          placeholder="Describe any recent renovations, improvements, or unique features that add value to your property..."
                          rows={3}
                          className="border-brown-200 focus:border-brown-400"
                        />
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Contact Information
                      </h3>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            className="border-brown-200 focus:border-brown-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            className="border-brown-200 focus:border-brown-400"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="border-brown-200 focus:border-brown-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            className="border-brown-200 focus:border-brown-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeframe">Selling Timeframe</Label>
                        <Select>
                          <SelectTrigger className="border-brown-200 focus:border-brown-400">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediately</SelectItem>
                            <SelectItem value="1-3months">1-3 months</SelectItem>
                            <SelectItem value="3-6months">3-6 months</SelectItem>
                            <SelectItem value="6-12months">6-12 months</SelectItem>
                            <SelectItem value="research">Just researching</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to receive my property report and marketing communications from Alto Property Group *
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base"
                      >
                        Get My Free Property Report
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-24 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">What's Included in Your Report</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                Our comprehensive market analysis provides everything you need to make informed property decisions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Comparative Market Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Detailed analysis of recent sales, current listings, and market trends in your area with comparable
                    properties.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Market Trends & Forecasting</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Current market conditions, price trends, and future market predictions for your suburb and property
                    type.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Location Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Comprehensive location assessment including amenities, transport, schools, and development plans.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Strategic Recommendations</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Expert advice on pricing strategy, timing, and property improvements to maximize your return.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Market Timing Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Optimal timing recommendations based on seasonal trends, market cycles, and economic indicators.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Professional Consultation</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Follow-up consultation with our property specialists to discuss your report and answer questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Ready for Your Property Analysis?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get comprehensive market insights and strategic recommendations from Brisbane's property specialists.
                Your detailed report will be ready within 24 hours.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Get Free Property Report
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
