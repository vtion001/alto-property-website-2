"use client";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  useEffect(() => {
    setMounted(true);
    (async () => {
      try {
        const res = await fetch('/api/blog-posts', { cache: 'no-store' })
        const data = await res.json()
        const published = (data || []).filter((p: any) => p.published !== false)
        const sorted = published.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setPosts(sorted)
      } catch {}
    })()
  }, []);
  if (!mounted) return null;

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
                Stay informed with the latest property market trends, investment
                tips, and expert insights from our experienced team at Alto
                Property Group, plus curated content from Australia's leading
                real estate publications.
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
                From market analysis to investment strategies, our comprehensive guides cover everything you need to know about Brisbane's property landscape.
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
                  Curated insights from leading industry publications, enhanced with our local Brisbane market expertise.
                </p>
                <Link href="/blog?category=Market+Insights" className="inline-flex items-center text-brown-600 hover:text-brown-800 font-medium">
                  Read Latest Intelligence
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Market Trends Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-4xl font-light text-brown-900 mb-6">
                  Brisbane Market Trends
                </h2>
                <p className="text-xl text-brown-700 mb-8 leading-relaxed">
                  Our data-driven insights help you understand the forces shaping Brisbane's property market, from Olympic infrastructure development to demographic shifts.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brown-900 text-cream rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-brown-900 mb-2">Olympic Infrastructure Impact</h3>
                      <p className="text-brown-700">Major transport and venue developments are reshaping Brisbane's property landscape.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brown-900 text-cream rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-brown-900 mb-2">Interstate Migration Patterns</h3>
                      <p className="text-brown-700">Understanding how population growth affects different Brisbane suburbs and property types.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brown-900 text-cream rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-brown-900 mb-2">Interest Rate Sensitivity</h3>
                      <p className="text-brown-700">How Brisbane's market responds to monetary policy changes and lending conditions.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-brown-50 rounded-2xl p-8 border border-brown-100">
                  <h3 className="text-2xl font-light text-brown-900 mb-6">Latest Market Data</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-brown-200">
                      <span className="text-brown-700">Median House Price</span>
                      <span className="font-semibold text-brown-900">$785,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-brown-200">
                      <span className="text-brown-700">Annual Growth</span>
                      <span className="font-semibold text-green-600">+8.2%</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-brown-200">
                      <span className="text-brown-700">Rental Yield</span>
                      <span className="font-semibold text-brown-900">4.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-brown-700">Days on Market</span>
                      <span className="font-semibold text-brown-900">28 days</span>
                    </div>
                  </div>
                  <p className="text-sm text-brown-600 mt-6">
                    *Data as of {new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
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
                  "Diversification across Brisbane's growth corridors is key. Focus on properties with strong rental yields and infrastructure connectivity for optimal portfolio performance."
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-lg text-brown-900 placeholder:text-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-300"
                />
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50 whitespace-nowrap"
                >
                  Subscribe Now
                </Button>
              </div>
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