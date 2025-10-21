"use client";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { brisbaneMarketMetrics, brisbanePriceTrend, brisbaneSalesVolume, brisbaneSuburbStats } from "@/data/brisbane-market"
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  published: boolean;
};

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    setMounted(true);
    (async () => {
      try {
        const res = await fetch('/api/blog-posts', { cache: 'no-store' })
        const data = await res.json()
        const published = (data || []).filter((p: BlogPost) => p.published !== false)
        const sorted = published.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setPosts(sorted)
      } catch {}
    })()
  }, []);
  if (!mounted) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email address is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const isFormValid = () => {
    return email && !emailError;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show thank you message
      setShowThankYou(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowThankYou(false);
        setEmail('');
        setEmailError('');
      }, 3000);
      
    } catch (_error) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-12">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">
                  Property Insights
                </div>
                <div className="w-16 h-px bg-brand-red mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Property
                <span className="block font-light text-brown-700 mt-2">
                  Market
                </span>
                <span className="block font-extralight text-brown-600 mt-2">
                  Insights
                </span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-4xl mx-auto leading-relaxed">
                Stay informed with the latest Queensland property market trends, investment tips, and expert insights from our experienced team at Alto Property Group, plus curated content from Australia's leading real estate publications.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/api/rss"
                  className="inline-flex items-center space-x-2 text-brown-600 hover:text-brown-800 transition-colors"
                >
                  <Rss className="h-5 w-5" />
                  <span className="text-sm font-medium">Subscribe to RSS Feed</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <Card className="group hover:shadow-xl transition-all duration-500 border border-brown-100 h-full">
                    <div className="relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-t-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={posts.indexOf(post) < 3}
                      />
                      <div className="absolute top-4 left-4 space-y-2">
                        <Badge className="bg-brown-900 text-cream">
                          {post.category}
                        </Badge>
                        {post.id.startsWith('rss-') && (
                          <Badge className="bg-green-600 text-white block">
                            Market Intel
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-light text-brown-900 mb-3 group-hover:text-brown-700 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-brown-700 font-light leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-brown-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20 bg-cream">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-brown-900 mb-6">
                Explore Our Property Insights
              </h2>
              <p className="text-xl text-brown-700 max-w-3xl mx-auto">
                From market analysis to investment strategies, our comprehensive guides cover everything you need to know about Queensland's property landscape.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-brown-100 rounded-lg flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-brown-900" />
                </div>
                <h3 className="text-2xl font-light text-brown-900 mb-4">Market Analysis</h3>
                <p className="text-brown-700 mb-6 leading-relaxed">
                  Stay ahead with our monthly market reports, price trend analysis, and suburb performance insights from across Brisbane.
                </p>
                <Link href="/blog?category=Market+Analysis" className="inline-flex items-center text-brown-600 hover:text-brown-800 font-medium">
                  View Market Reports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-brown-100 rounded-lg flex items-center justify-center mb-6">
                  <User className="h-6 w-6 text-brown-900" />
                </div>
                <h3 className="text-2xl font-light text-brown-900 mb-4">Investment Tips</h3>
                <p className="text-brown-700 mb-6 leading-relaxed">
                  Expert strategies for building a successful property portfolio, from first-time investors to seasoned professionals.
                </p>
                <Link href="/blog?category=Investment+Tips" className="inline-flex items-center text-brown-600 hover:text-brown-800 font-medium">
                  Learn Investment Strategies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-brown-100 rounded-lg flex items-center justify-center mb-6">
                  <Rss className="h-6 w-6 text-brown-900" />
                </div>
                <h3 className="text-2xl font-light text-brown-900 mb-4">Market Intelligence</h3>
                <p className="text-brown-700 mb-6 leading-relaxed">
                  Curated insights from leading industry publications, enhanced with our local Queensland market expertise.
                </p>
                <Link href="/blog?category=Market+Insights" className="inline-flex items-center text-brown-600 hover:text-brown-800 font-medium">
                  Read Latest Intelligence
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Brisbane Market Snapshot */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-brown-900 mb-6">Brisbane Market Snapshot</h2>
              <p className="text-xl text-brown-700 max-w-3xl mx-auto">
                Key statistics and recent trends based on our latest Brisbane market documents.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="border border-brown-100">
                <CardContent className="p-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-brown-600">Median House Price</div>
                      <div className="text-2xl font-extralight text-brown-900">
                        {new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(brisbaneMarketMetrics.medianHousePrice)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-brown-600">Annual Growth</div>
                      <div className="text-2xl font-extralight text-brown-900">
                        {brisbaneMarketMetrics.annualGrowthRate.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-brown-600">Rental Yield</div>
                      <div className="text-2xl font-extralight text-brown-900">
                        {brisbaneMarketMetrics.rentalYield.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-brown-600">Vacancy Rate</div>
                      <div className="text-2xl font-extralight text-brown-900">
                        {brisbaneMarketMetrics.vacancyRate.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-brown-600">Days on Market</div>
                      <div className="text-2xl font-extralight text-brown-900">
                        {brisbaneMarketMetrics.daysOnMarket} days
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-light text-brown-900">Median Price Trend</h3>
                    <p className="text-sm text-brown-600">Last 12 months</p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={brisbanePriceTrend} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
                        <YAxis tick={{ fill: '#6B7280' }} tickFormatter={(v)=> new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(v)} />
                        <Tooltip formatter={(val)=> new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(Number(val))} />
                        <Line type="monotone" dataKey="medianPrice" stroke="#4B2E2B" strokeWidth={2} dot={false} />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 mt-8">
              <Card className="border border-brown-100">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-light text-brown-900">Sales Volume by Quarter</h3>
                    <p className="text-sm text-brown-600">Brisbane metro</p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={brisbaneSalesVolume} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="quarter" tick={{ fill: '#6B7280' }} />
                        <YAxis tick={{ fill: '#6B7280' }} />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#8B5E34" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brown-100">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-light text-brown-900">Top Suburbs</h3>
                    <p className="text-sm text-brown-600">Median price, growth, yield</p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Suburb</TableHead>
                        <TableHead className="text-right">Median Price</TableHead>
                        <TableHead className="text-right">Growth</TableHead>
                        <TableHead className="text-right">Rental Yield</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {brisbaneSuburbStats.map((s)=> (
                        <TableRow key={s.suburb}>
                          <TableCell className="text-brown-900">{s.suburb}</TableCell>
                          <TableCell className="text-right">{new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(s.medianPrice)}</TableCell>
                          <TableCell className="text-right">{s.growth.toFixed(1)}%</TableCell>
                          <TableCell className="text-right">{s.rentalYield.toFixed(1)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Expert Insights Section */}
        <section className="py-20 bg-gradient-to-r from-brown-50 to-cream">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-brown-900 mb-6">
                Expert Market Commentary
              </h2>
              <p className="text-xl text-brown-700 max-w-3xl mx-auto">
                Our team of property experts share their insights on market conditions, investment opportunities, and strategic advice for Brisbane property decisions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-brown-900 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-cream" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-brown-900">Market Outlook</h3>
                    <p className="text-brown-600">Our Senior Market Analyst</p>
                  </div>
                </div>
                <blockquote className="text-brown-700 italic mb-4">
                  "Brisbane's fundamentals remain strong with Olympic infrastructure driving long-term value creation. We're seeing selective growth in established suburbs while emerging areas offer compelling value propositions."
                </blockquote>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-brown-900 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-cream" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-brown-900">Investment Strategy</h3>
                    <p className="text-brown-600">Investment Advisory Team</p>
                  </div>
                </div>
                <blockquote className="text-brown-700 italic mb-4">
                  "Diversification across Queensland's growth corridors is key. Focus on properties with strong rental yields and infrastructure connectivity for optimal portfolio performance."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">
                Stay Ahead of the Market
              </h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get weekly market insights, exclusive property opportunities, and expert analysis delivered directly to your inbox.
              </p>
              
              {showThankYou ? (
                <div className="bg-green-800 border border-green-700 rounded-lg p-6 text-center max-w-md mx-auto">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Thank you for subscribing!</h4>
                  <p className="text-green-100">You'll receive our latest insights soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4 max-w-md mx-auto">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                      placeholder="Enter your email address"
                      className={`w-full px-6 py-4 rounded-lg text-brown-900 placeholder:text-brown-500 focus:outline-none focus:ring-2 transition-colors ${
                        emailError 
                          ? 'border border-red-500 focus:ring-red-300 bg-red-50' 
                          : 'border border-brown-300 focus:ring-brown-300'
                      }`}
                      disabled={isSubmitting}
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-300 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {emailError}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={!isFormValid() || isSubmitting}
                    size="lg"
                    variant="secondary"
                    className={`text-lg px-8 py-4 h-auto whitespace-nowrap w-full ${
                      isFormValid() && !isSubmitting
                        ? 'bg-cream text-brown-900 hover:bg-brown-50'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      'Subscribe Now'
                    )}
                  </Button>
                </form>
              )}
              
              <p className="text-sm text-brown-200">
                Join over 5,000 property professionals who trust our insights. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-brown-200">
              © {new Date().getFullYear()} Alto Property Group. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}