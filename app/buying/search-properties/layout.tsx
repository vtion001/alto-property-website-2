import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Properties — Find Homes For Sale",
  description:
    "Browse properties for sale across Brisbane and South East Queensland. Filter by location, type, bedrooms, and budget to find your perfect home.",
  openGraph: {
    title: "Search Properties — Find Homes For Sale",
    description:
      "Discover homes for sale with filters for suburb, type, and budget.",
    url: "/buying/search-properties",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1757814157/w6442i2wt5wk70g8cbcv.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Property — Search Properties",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Search Properties — Find Homes For Sale",
    description:
      "Browse homes for sale across Brisbane and SEQ with smart filters.",
    card: "summary_large_image",
    images: [
      "https://res.cloudinary.com/dbviya1rj/image/upload/v1757814157/w6442i2wt5wk70g8cbcv.jpg",
    ],
  },
}

export default function SearchPropertiesLayout({ children }: { children: React.ReactNode }) {
  return children
}