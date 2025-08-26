import { useState, useEffect } from 'react';

export interface GoogleReview {
  id: number;
  name: string;
  date: string;
  rating: number;
  content: string;
  avatar?: string;
  verified?: boolean;
}

export interface ReviewsSummary {
  averageRating: number;
  totalReviews: number;
  verifiedReviews: number;
}

export interface GoogleReviewsData {
  reviews: GoogleReview[];
  summary: ReviewsSummary;
}

export interface UseGoogleReviewsReturn {
  data: GoogleReviewsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGoogleReviews(): UseGoogleReviewsReturn {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/reviews/google');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error fetching Google reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchReviews,
  };
}


