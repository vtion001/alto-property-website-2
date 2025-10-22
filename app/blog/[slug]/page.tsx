import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Get all posts including RSS posts
  const allPosts = getAllPosts();
  
  // Return slugs for all posts
  return allPosts.map(post => ({
    slug: post.slug
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="flex justify-center space-x-2">
                <Badge className="bg-brown-900 text-cream">
                  {post.category}
                </Badge>
                {post.id.startsWith('rss-') && (
                  <Badge className="bg-green-600 text-white">
                    Market Intel
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl text-brown-800 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-brown-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="relative mb-12">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-brown-700 font-light leading-relaxed mb-8">
                  {post.excerpt}
                </p>
                <div 
                  className="text-brown-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts or CTA */}
        <section className="py-16 bg-brown-50">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-light text-brown-800">
                Stay Updated
              </h2>
              <p className="text-brown-700">
                Subscribe to our newsletter for more property insights and market updates.
              </p>
              <Link
                href="/blog"
                className="inline-block bg-brown-900 text-cream px-8 py-3 rounded-md hover:bg-brown-800 transition-colors"
              >
                Read More Articles
              </Link>
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