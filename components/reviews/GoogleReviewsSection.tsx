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
    content: "Outstanding service! Our buyers agent was incredibly knowledgeable about the Brisbane market and helped us find our dream home within budget. The negotiation process was smooth and we saved thousands. Highly recommend Alto Property Group!"
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "1 month ago",
    rating: 5,
    content: "Professional, responsive, and truly understands the Brisbane property market. Our agent found us an off-market property that was perfect for our needs. The entire process was stress-free and we couldn't be happier with our purchase."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    date: "2 months ago",
    rating: 5,
    content: "Exceptional experience from start to finish. Our buyers agent went above and beyond to ensure we got the best deal possible. They conducted thorough due diligence and saved us from potential issues. Worth every penny!"
  },
  {
    id: 4,
    name: "David Thompson",
    date: "3 months ago",
    rating: 5,
    content: "As first-time homebuyers, we were nervous about the process. Our agent was patient, knowledgeable, and always available to answer questions. They made our first home buying experience a great one and we're now proud homeowners!"
  },
  {
    id: 5,
    name: "Jennifer Lee",
    date: "1 month ago",
    rating: 5,
    content: "Alto Property Group delivered beyond our expectations. In a competitive market, they secured our dream property for $50,000 below the asking price. Their negotiation skills are unmatched and their market insights are invaluable."
  },
  {
    id: 6,
    name: "Robert Wilson",
    date: "6 weeks ago",
    rating: 5,
    content: "I've worked with several real estate agencies in Brisbane, but Alto Property Group stands head and shoulders above the rest. Their professionalism, attention to detail, and commitment to client satisfaction is exceptional. They found us the perfect investment property."
  },
  {
    id: 7,
    name: "Amanda Taylor",
    date: "2 months ago",
    rating: 5,
    content: "The team at Alto Property Group made selling our home effortless. They handled everything with such care and professionalism, achieving a sale price that exceeded our expectations. Their marketing strategy was brilliant and attracted quality buyers quickly."
  },
  {
    id: 8,
    name: "James Miller",
    date: "3 months ago",
    rating: 5,
    content: "After struggling to find the right property for months, we engaged Alto Property Group. Within two weeks, they presented us with three excellent options, one of which we purchased. Their understanding of our needs and the Brisbane market is impressive."
  },
  {
    id: 9,
    name: "Lisa Anderson",
    date: "1 month ago",
    rating: 5,
    content: "Alto Property Group provided exceptional service when we were looking for an investment property. Their market analysis was thorough, their negotiation skills secured a great price, and their ongoing support has been invaluable. Highly recommend their services."
  },
  {
    id: 10,
    name: "Thomas Brown",
    date: "4 months ago",
    rating: 5,
    content: "The team at Alto Property Group demonstrated exceptional knowledge of the Brisbane property market. They guided us through the entire purchasing process, provided excellent advice, and helped us secure a property that perfectly meets our family's needs."
  },
  {
    id: 11,
    name: "Michelle White",
    date: "2 months ago",
    rating: 5,
    content: "I cannot speak highly enough of Alto Property Group. From our first meeting to settlement, their service was exemplary. They listened to our needs, worked tirelessly to find suitable properties, and negotiated a fantastic deal. We are thrilled with our new home!"
  },
  {
    id: 12,
    name: "Christopher Davis",
    date: "5 weeks ago",
    rating: 5,
    content: "Alto Property Group transformed what could have been a stressful experience into an enjoyable journey. Their expertise, professionalism, and genuine care for their clients is evident in everything they do. They secured our dream home at a price we never thought possible."
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
      "reviewCount": "56"
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
              <div className="text-2xl font-semibold text-brown-800">56</div>
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
              <h3 className="font-medium text-brown-900 text-lg mb-3">{review.name}</h3>
              <p className="text-brown-700 font-light italic leading-relaxed">"{review.content}"</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <a
            href="https://www.google.com/search?q=Alto+Property+Group+Brisbane+reviews#mpd=~9450891168674814547/customers/reviews"
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
