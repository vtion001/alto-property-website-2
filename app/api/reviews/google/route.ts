import { NextResponse } from 'next/server';

// Mock data for now - this can be replaced with real Google Reviews API integration
const mockGoogleReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "2 weeks ago",
    rating: 5,
    content: "Outstanding service! Our buyers agent was incredibly knowledgeable about the local market and helped us find our dream home within our budget. The negotiation process was smooth and we saved thousands. Highly recommend Alto Property Group!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "1 month ago",
    rating: 5,
    content: "Professional, responsive, and truly understands the Brisbane property market. Our agent found us an off-market property that was perfect for our needs. The entire process was stress-free and we couldn't be happier with our purchase.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    verified: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    date: "2 months ago",
    rating: 5,
    content: "Exceptional experience from start to finish. Our buyers agent went above and beyond to ensure we got the best deal possible. They conducted thorough due diligence and saved us from potential issues. Worth every penny!",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    verified: true
  },
  {
    id: 4,
    name: "David Thompson",
    date: "3 months ago",
    rating: 5,
    content: "As first-time homebuyers, we were nervous about the process. Our agent was patient, knowledgeable, and always available to answer questions. They made our first home buying experience a great one and we're now proud homeowners!",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    verified: true
  }
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In the future, this would fetch from Google Reviews API
    // const response = await fetch('https://api.google.com/reviews?business_id=...');
    // const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: {
        reviews: mockGoogleReviews,
        summary: {
          averageRating: 4.9,
          totalReviews: 127,
          verifiedReviews: 127
        }
      }
    });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reviews' 
      },
      { status: 500 }
    );
  }
}


