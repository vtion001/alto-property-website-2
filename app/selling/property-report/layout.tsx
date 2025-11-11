import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Property Report — Comprehensive Market Analysis",
  description:
    "Request a detailed Comparative Market Analysis including recent sales, market trends, and strategic pricing recommendations.",
  openGraph: {
    title: "Property Report — Comprehensive Market Analysis",
    description:
      "Request a detailed Comparative Market Analysis including recent sales, market trends, and strategic pricing recommendations.",
    url: "/selling/property-report",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1758168347/jtq5vygiy1bsjw1jvcg9.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Property — Market Analysis",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Property Report — Comprehensive Market Analysis",
    description:
      "Request a detailed Comparative Market Analysis including recent sales, market trends, and strategic pricing recommendations.",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dbviya1rj/image/upload/v1758168347/jtq5vygiy1bsjw1jvcg9.jpg"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}