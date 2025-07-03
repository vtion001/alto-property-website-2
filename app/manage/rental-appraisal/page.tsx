import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calculator, TrendingUp, Clock, CheckCircle, DollarSign, FileText } from "lucide-react"
import Image from "next/image"

export default function RentalAppraisalPage() {
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
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Rental Appraisal</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Professional
                    <span className="block font-light text-brown-700 mt-2">Rental</span>
                    <span className="block font-extralight text-brown-600 mt-2">Appraisal</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Get an accurate rental assessment with comprehensive market analysis, comparable property data, and
                    strategic recommendations to maximize your rental income potential.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                  >
                    Get Free Rental Appraisal
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
                    alt="Professional rental appraisal and market analysis"
                    width={600}
                    height={700}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appraisal Form */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-8 mb-16">
                <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Request Your Rental Appraisal</h2>
                <p className="text-xl font-light text-brown-700">
                  Complete this comprehensive form to receive a detailed rental market analysis within 24 hours,
                  including comparable rental data and income optimization strategies.
                </p>
              </div>

              <Card className="border border-brown-100 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl text-brown-900 font-light">Rental Appraisal Request</CardTitle>
                  <CardDescription className="text-brown-700 font-light text-lg">
                    Provide detailed property information for accurate rental assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <form className="space-y-8">
                    {/* Property Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Property Details
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="address">Property Address *</Label>
                        <Input
                          id="address"
                          placeholder="Enter the complete property address"
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
                              <SelectItem value="studio">Studio</SelectItem>
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
                              <SelectItem value="studio">Studio</SelectItem>
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
                          <Label htmlFor="furnished">Furnishing</Label>
                          <Select>
                            <SelectTrigger className="border-brown-200 focus:border-brown-400">
                              <SelectValue placeholder="Select furnishing" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unfurnished">Unfurnished</SelectItem>
                              <SelectItem value="semi-furnished">Semi-furnished</SelectItem>
                              <SelectItem value="fully-furnished">Fully furnished</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Property Features */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Property Features & Amenities
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
                            "Security System",
                            "Gym/Fitness",
                            "BBQ Area",
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
                        <Label htmlFor="specialFeatures">Special Features & Recent Improvements</Label>
                        <Textarea
                          id="specialFeatures"
                          placeholder="Describe any unique features, recent renovations, or improvements that enhance rental appeal..."
                          rows={3}
                          className="border-brown-200 focus:border-brown-400"
                        />
                      </div>
                    </div>

                    {/* Rental Preferences */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-light text-brown-900 border-b border-brown-100 pb-2">
                        Rental Preferences
                      </h3>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="availableFrom">Available From</Label>
                          <Input id="availableFrom" type="date" className="border-brown-200 focus:border-brown-400" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="leaseLength">Preferred Lease Length</Label>
                          <Select>
                            <SelectTrigger className="border-brown-200 focus:border-brown-400">
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6months">6 months</SelectItem>
                              <SelectItem value="12months">12 months</SelectItem>
                              <SelectItem value="18months">18 months</SelectItem>
                              <SelectItem value="24months">24 months</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="petPolicy">Pet Policy</Label>
                        <Select>
                          <SelectTrigger className="border-brown-200 focus:border-brown-400">
                            <SelectValue placeholder="Select pet policy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-pets">No pets</SelectItem>
                            <SelectItem value="cats-only">Cats only</SelectItem>
                            <SelectItem value="small-dogs">Small dogs only</SelectItem>
                            <SelectItem value="pets-considered">Pets considered</SelectItem>
                            <SelectItem value="pets-welcome">Pets welcome</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Label htmlFor="currentRent">Current Rental Income (if applicable)</Label>
                        <Input
                          id="currentRent"
                          placeholder="e.g., $650 per week"
                          className="border-brown-200 focus:border-brown-400"
                        />
                      </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to receive my rental appraisal report and marketing communications from Alto Property
                          Group *
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base"
                      >
                        Get My Free Rental Appraisal
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
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Your Comprehensive Rental Report</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                Our detailed rental appraisal provides strategic insights to maximize your property's rental potential
                and investment returns.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Rental Market Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Comprehensive analysis of comparable rental properties, current market rates, and demand trends in
                    your area.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Income Optimization</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Strategic recommendations to maximize rental income including pricing strategies and property
                    improvements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Market Timing</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Optimal timing recommendations based on seasonal rental patterns and market demand cycles.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">ROI Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Detailed return on investment calculations including rental yield, cash flow projections, and growth
                    potential.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Marketing Strategy</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Customized marketing approach to attract quality tenants and minimize vacancy periods.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Expert Consultation</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Follow-up consultation with our rental specialists to discuss your report and answer any questions.
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
              <h2 className="text-4xl font-light sm:text-5xl">Maximize Your Rental Investment</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get professional rental market analysis and strategic recommendations to optimize your property's income
                potential. Your detailed report will be ready within 24 hours.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
              >
                Get Free Rental Appraisal
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
