import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  content: string;
  avatar?: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "2 weeks ago",
    rating: 5,
    content: "Outstanding service! Our buyers agent was incredibly knowledgeable about the local market and helped us find our dream home within our budget. The negotiation process was smooth and we saved thousands. Highly recommend Alto Property Group!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "1 month ago",
    rating: 5,
    content: "Professional, responsive, and truly understands the Brisbane property market. Our agent found us an off-market property that was perfect for our needs. The entire process was stress-free and we couldn't be happier with our purchase.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    date: "2 months ago",
    rating: 5,
    content: "Exceptional experience from start to finish. Our buyers agent went above and beyond to ensure we got the best deal possible. They conducted thorough due diligence and saved us from potential issues. Worth every penny!",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    name: "David Thompson",
    date: "3 months ago",
    rating: 5,
    content: "As first-time homebuyers, we were nervous about the process. Our agent was patient, knowledgeable, and always available to answer questions. They made our first home buying experience a great one and we're now proud homeowners!",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  }
];

export default function GoogleReviewsSection() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Alto Property Group",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "24"
    },
    "review": mockReviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "datePublished": review.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "reviewBody": review.content
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="py-32 bg-white">
      <div className="container">
                  <div className="text-center space-y-8 mb-24">
          <div className="inline-block">
            <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Client Testimonials</div>
            <div className="w-16 h-px bg-brown-300 mx-auto"></div>
          </div>
            
            {/* Google Verified Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-brown-600 mb-4">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Verified by Google</span>
            </div>
          <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">What Our Clients Say</h2>
          
          {/* Google Rating Display */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-yellow-400"
                  fill="currentColor"
                />
              ))}
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brown-800">4.9</div>
              <div className="text-sm text-brown-600">out of 5</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-brown-800">127</div>
              <div className="text-sm text-brown-600">Google Reviews</div>
            </div>
          </div>
          
          <p className="text-xl font-light text-brown-700 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from our satisfied clients on Google Reviews.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mockReviews.map((review) => (
            <div key={review.id} className="bg-brown-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-brown-100">
              <div className="flex items-center mb-6">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-brown-200"
                />
                <div>
                  <h3 className="font-medium text-brown-900 text-lg">{review.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-brown-200'
                        }`}
                        fill={i < review.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-2 text-sm text-brown-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-brown-700 font-light italic leading-relaxed">"{review.content}"</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <a
            href="https://www.google.com/search?q=Alto+Property+Group+Brisbane+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center px-10 py-5 border border-transparent text-lg font-medium rounded-xl text-white bg-brand-red hover:bg-brand-red/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
            Read Our Google Reviews
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
