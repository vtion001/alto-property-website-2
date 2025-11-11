import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rental Appraisal — Accurate Market Assessment",
  description:
    "Request a comprehensive rental appraisal with comparable data, market insights, and strategies to maximise your rental income.",
  openGraph: {
    title: "Rental Appraisal — Accurate Market Assessment",
    description:
      "Request a comprehensive rental appraisal with comparable data, market insights, and strategies to maximise your rental income.",
    url: "/manage/rental-appraisal",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1758098419/wwffwu6cjckz0btcqni0.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Rental Appraisal",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Rental Appraisal — Accurate Market Assessment",
    description:
      "Get a comprehensive rental appraisal with market insights.",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dbviya1rj/image/upload/v1758098419/wwffwu6cjckz0btcqni0.jpg"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}