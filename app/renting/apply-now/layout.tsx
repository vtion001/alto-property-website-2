import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apply Now — Online Rental Application",
  description:
    "Submit your rental application quickly and securely online. Our streamlined process makes it easy to apply for your next home.",
  openGraph: {
    title: "Apply Now — Online Rental Application",
    description:
      "Submit your rental application quickly and securely online. Our streamlined process makes it easy to apply for your next home.",
    url: "/renting/apply-now",
    images: [
      {
        url: "https://res.cloudinary.com/dbviya1rj/image/upload/v1758178205/bqhrhmy5oc1mrbgc9cpr.jpg",
        width: 1200,
        height: 630,
        alt: "ALTO Online Rental Application",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Apply Now — Online Rental Application",
    description:
      "Submit your rental application quickly and securely online. Our streamlined process makes it easy to apply for your next home.",
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dbviya1rj/image/upload/v1758178205/bqhrhmy5oc1mrbgc9cpr.jpg"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}