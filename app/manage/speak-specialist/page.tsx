import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SpeakSpecialistPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Expert Consultation</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Speak to a<span className="block font-light text-brown-700 mt-2">Specialist</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                Get personalized advice from our property management experts. Book a consultation to discuss your
                investment goals.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <div className="space-y-8 mb-12">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Get In Touch</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h2 className="text-4xl font-extralight text-brown-800">Book Your Consultation</h2>
                  <p className="text-lg font-light text-brown-700 leading-relaxed">
                    Fill out the form below and one of our specialists will contact you within 24 hours.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-brown-800 font-light">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="border-brown-200 focus:border-brown-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-brown-800 font-light">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="border-brown-200 focus:border-brown-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-brown-800 font-light">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-brown-800 font-light">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="text-brown-800 font-light">
                      Property Type
                    </Label>
                    <Select>
                      <SelectTrigger className="border-brown-200 focus:border-brown-400">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="unit">Unit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="suburb" className="text-brown-800 font-light">
                      Property Suburb
                    </Label>
                    <Input
                      id="suburb"
                      placeholder="Enter property suburb"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry" className="text-brown-800 font-light">
                      Inquiry Type
                    </Label>
                    <Select>
                      <SelectTrigger className="border-brown-200 focus:border-brown-400">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="management">Property Management</SelectItem>
                        <SelectItem value="appraisal">Rental Appraisal</SelectItem>
                        <SelectItem value="investment">Investment Advice</SelectItem>
                        <SelectItem value="maintenance">Maintenance Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-brown-800 font-light">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your property and what you'd like to discuss..."
                      rows={4}
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base"
                  >
                    Book Consultation
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <div className="space-y-8 mb-12">
                    <div className="inline-block">
                      <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Contact Info</div>
                      <div className="w-16 h-px bg-brown-300"></div>
                    </div>
                    <h2 className="text-4xl font-extralight text-brown-800">Get In Touch</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-brown-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-brown-800 mb-2">Phone</h3>
                        <p className="text-brown-700">(+61) 467 048 837</p>
                        <p className="text-brown-600 text-sm">Monday - Friday: 9:00am - 5:30pm</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-brown-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-brown-800 mb-2">Email</h3>
                        <p className="text-brown-700">sales@altoproperty.com.au</p>
                        <p className="text-brown-600 text-sm">We respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-brown-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-brown-800 mb-2">Office</h3>
                        <p className="text-brown-700">Office address coming soon</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-brown-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-brown-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-brown-800 mb-2">Business Hours</h3>
                        <p className="text-brown-700">Monday - Friday: 9:00am - 5:30pm</p>
                        <p className="text-brown-700">Saturday: 9:00am - 4:00pm</p>
                        <p className="text-brown-700">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <Card className="border border-brown-200 bg-brown-50">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <div className="bg-brown-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <Phone className="h-8 w-8 text-cream" />
                      </div>
                      <h3 className="text-xl font-light text-brown-800">24/7 Emergency Line</h3>
                      <p className="text-brown-700 font-medium text-lg">(+61) 467 048 837</p>
                      <p className="text-brown-600 text-sm">For urgent maintenance and emergencies only</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Specialists */}
        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Our Team</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Meet Our Specialists</h2>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Our experienced team of property management professionals is here to help you succeed.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Sarah Mitchell"
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-light text-brown-800 mb-2">Sarah Mitchell</h3>
                  <p className="text-brown-600 mb-4">Senior Property Manager</p>
                  <p className="text-brown-700 font-light text-sm leading-relaxed mb-4">
                    15+ years experience in Brisbane property management. Specializes in investment strategy and
                    portfolio growth.
                  </p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brown-400 text-brown-400" />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Book with Sarah
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="David Chen"
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-light text-brown-800 mb-2">David Chen</h3>
                  <p className="text-brown-600 mb-4">Investment Specialist</p>
                  <p className="text-brown-700 font-light text-sm leading-relaxed mb-4">
                    Expert in property investment analysis and market trends. Helps clients maximize their returns.
                  </p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brown-400 text-brown-400" />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Book with David
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Emma Thompson"
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-light text-brown-800 mb-2">Emma Thompson</h3>
                  <p className="text-brown-600 mb-4">Client Relations Manager</p>
                  <p className="text-brown-700 font-light text-sm leading-relaxed mb-4">
                    Dedicated to providing exceptional client service and ensuring smooth property management
                    experiences.
                  </p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brown-400 text-brown-400" />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    Book with Emma
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Common Questions</div>
                <div className="w-16 h-px bg-brown-300 mx-auto"></div>
              </div>
              <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Frequently Asked Questions</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
              <Card className="border border-brown-100">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-brown-800 mb-4">What should I expect from a consultation?</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Our consultations are comprehensive and tailored to your needs. We'll discuss your property goals,
                    current market conditions, rental potential, and create a customized management strategy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-brown-800 mb-4">Is the consultation free?</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Yes, all initial consultations are completely free with no obligation. We believe in providing value
                    upfront and earning your trust through our expertise and service quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-brown-800 mb-4">How long does a consultation take?</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Consultations typically last 45-60 minutes. This gives us enough time to understand your situation,
                    answer your questions, and provide detailed recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-brown-800 mb-4">Can I meet at my property?</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    We offer on-site consultations where we can assess your property in person and provide specific
                    recommendations for improvements and rental optimization.
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
              <h2 className="text-4xl font-light sm:text-5xl">Ready to Speak with an Expert?</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Book your free consultation today and discover how we can help maximize your property investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                >
                  Book Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 h-auto border-cream text-cream hover:bg-cream hover:text-brown-900 bg-transparent"
                >
                  Call (+61) 467 048 837
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Image src="/alto-logo.png" alt="Alto Property Group" width={40} height={40} className="h-10 w-10" />
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-wider">ALTO</span>
                  <span className="text-xs text-brown-200 tracking-widest">PROPERTY GROUP</span>
                </div>
              </div>
              <p className="text-brown-200 leading-relaxed">
                Brisbane's premier property management company, delivering exceptional results through genuine care.
              </p>
              <div className="text-sm text-brown-300 italic">"Exceptional Results. Genuine Care."</div>
            </div>

            <div className="space-y-6">
              <h3 className="font-medium text-lg">Services</h3>
              <ul className="space-y-3 text-brown-200">
                <li>
                  <Link href="/manage" className="hover:text-cream transition-colors">
                    Property Management
                  </Link>
                </li>
                <li>
                  <Link href="/selling" className="hover:text-cream transition-colors">
                    Property Sales
                  </Link>
                </li>
                <li>
                  <Link href="/buying" className="hover:text-cream transition-colors">
                    Property Buying
                  </Link>
                </li>
                <li>
                  <Link href="/renting" className="hover:text-cream transition-colors">
                    Rental Services
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-medium text-lg">Company</h3>
              <ul className="space-y-3 text-brown-200">
                <li>
                  <Link href="/contact/about-alto" className="hover:text-cream transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-cream transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/contact/join-team" className="hover:text-cream transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-cream transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-medium text-lg">Contact Info</h3>
              <ul className="space-y-3 text-brown-200">
                <li>(+61) 467 048 837</li>
                <li>sales@altoproperty.com.au</li>
                <li>
                  4/66 Condamine St, Runcorn
                  <br />
                  QLD 4113, Australia
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brown-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-brown-200">© {new Date().getFullYear()} Alto Property Group. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 sm:mt-0">
              <Link href="#" className="text-brown-200 hover:text-cream transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-brown-200 hover:text-cream transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
