import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Property Management — Maximise Rental Returns",
  description:
    "Comprehensive property management across South East Queensland. Tenant screening, maintenance, reporting, and 24/7 support to protect and grow your investment.",
  openGraph: {
    title: "Property Management — Maximise Rental Returns",
    description:
      "Comprehensive property management across South East Queensland. Tenant screening, maintenance, reporting, and 24/7 support to protect and grow your investment.",
    url: "/manage/property-management",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1758097997/soyhk4tmtn9qprgqjlp5.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Property Management",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Property Management — Maximise Rental Returns",
    description:
      "Comprehensive property management across South East Queensland.",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dbviya1rj/image/upload/v1758097997/soyhk4tmtn9qprgqjlp5.jpg"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}