import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buying With Alto — Expert Guidance & Off‑Market Access",
  description:
    "Work with Brisbane’s trusted buyer specialists. Access off‑market properties, expert negotiation, and a seamless search‑to‑settlement experience.",
  openGraph: {
    title: "Buying With Alto — Expert Guidance & Off‑Market Access",
    description:
      "Access exclusive properties and expert negotiation across South East Queensland.",
    url: "/buying/buying-with-alto",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1757814157/w6442i2wt5wk70g8cbcv.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Buying With Alto — Buyer registration",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Buying With Alto — Expert Guidance & Off‑Market Access",
    description:
      "Exclusive access, expert negotiation, and end‑to‑end buyer support.",
    card: "summary_large_image",
    images: [
      "https://res.cloudinary.com/dbviya1rj/image/upload/v1757814157/w6442i2wt5wk70g8cbcv.jpg",
    ],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}