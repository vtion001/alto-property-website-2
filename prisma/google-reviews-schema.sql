-- Create google_reviews table
CREATE TABLE IF NOT EXISTS google_reviews (
  id SERIAL PRIMARY KEY,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  review_date TIMESTAMP WITH TIME ZONE,
  review_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on review_date for sorting
CREATE INDEX IF NOT EXISTS idx_google_reviews_date ON google_reviews(review_date DESC);

-- Add some sample data
INSERT INTO google_reviews (reviewer_name, rating, comment, review_date, review_url) VALUES
('Sarah Johnson', 5, 'Amazing service! Found our dream home in just 2 weeks. Highly recommend Alto Property Group.', '2024-01-15', 'https://share.google/zDYqjrIOo1meGOhfU'),
('Michael Chen', 5, 'Professional, responsive, and got us the best price for our property sale. Couldn''t be happier!', '2024-01-10', 'https://share.google/zDYqjrIOo1meGOhfU'),
('Emma Davis', 4, 'Great experience working with the team. They really understand the local market.', '2024-01-08', 'https://share.google/zDYqjrIOo1meGOhfU'),
('David Wilson', 5, 'Outstanding property management services. Always quick to respond to any issues.', '2024-01-05', 'https://share.google/zDYqjrIOo1meGOhfU'),
('Lisa Thompson', 5, 'The buying process was smooth and stress-free. Highly professional team.', '2024-01-02', 'https://share.google/zDYqjrIOo1meGOhfU');
