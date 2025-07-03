import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ConnectPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Tenant Portal</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl text-brown-800 leading-none">
                    Stay
                    <span className="block font-light text-brown-700 mt-2">Connected</span>
                    <span className="block font-extralight text-brown-600 mt-2">With Alto</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Access your tenant portal to manage your rental, submit maintenance requests, and stay connected
                    with our team.
                  </p>
                </div>
              </div>
              <Card className="border border-brown-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-brown-900 font-light">Tenant Portal Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brown-900">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="border-brown-200 focus:border-brown-400"
                    />
                  </div>
                  <Button className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 h-auto font-light tracking-wide">
                    Login to Portal
                  </Button>
                  <div className="text-center">
                    <Button variant="link" className="text-brown-700 hover:text-brown-900">
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="text-center pt-4 border-t border-brown-100">
                    <p className="text-brown-700 mb-4">Don't have an account?</p>
                    <Button
                      variant="outline"
                      className="border-brown-200 text-brown-800 hover:bg-brown-50 bg-transparent"
                    >
                      Register for Portal Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center space-y-8 mb-24">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Portal Features</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-brown-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-light text-brown-900">Lease Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Access your lease agreement, amendments, and important rental documents anytime.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-brown-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-light text-brown-900">Rent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brown-700 font-light leading-relaxed">
                    View payment history, set up automatic payments, and manage your rental payments online.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-brown-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-light text-brown-900">Maintenance Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Submit maintenance requests, track progress, and communicate with our maintenance team.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-500">
                <CardHeader className="text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-brown-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-xl font-light text-brown-900">Direct Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Message your property manager directly and receive important updates about your rental.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-32 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Need Help?</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                Our tenant support team is here to assist you with any questions about your rental or the portal.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="bg-brown-900 hover:bg-brown-800 text-cream px-8 py-3 h-auto font-light tracking-wide">
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="border-brown-200 text-brown-800 hover:bg-brown-100 bg-transparent px-8 py-3 h-auto font-light tracking-wide"
                >
                  View Help Center
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
