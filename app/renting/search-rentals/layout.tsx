import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Rentals — Find Quality Properties",
  description:
    "Browse quality rental properties across South East Queensland. Filter by location, type, bedrooms, bathrooms, and price to find your next home.",
  openGraph: {
    title: "Search Rentals — Find Quality Properties",
    description:
      "Browse quality rental properties across South East Queensland. Filter by location, type, bedrooms, bathrooms, and price to find your next home.",
    url: "/renting/search-rentals",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1758178205/bqhrhmy5oc1mrbgc9cpr.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Search Rentals",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Search Rentals — Find Quality Properties",
    description:
      "Browse quality rental properties across South East Queensland with filters to refine your search.",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dbviya1rj/image/upload/v1758178205/bqhrhmy5oc1mrbgc9cpr.jpg"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}