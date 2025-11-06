import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// Global site metadata
// Purpose: set consistent title and icon references for tabs, SEO, and social sharing
export const metadata: Metadata = {
  metadataBase: new URL('https://www.altoproperty.com.au'),
  title: {
    default: 'ALTO Property',
    template: '%s | ALTO Property',
  },
  description:
    "Exceptional Results. Genuine Care. Brisbane's premier property specialists.",
  generator: 'Next.js',
  alternates: {
    canonical: 'https://www.altoproperty.com.au/',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  openGraph: {
    title: 'ALTO Property',
    description:
      "Exceptional Results. Genuine Care. Brisbane's premier property specialists.",
    siteName: 'ALTO Property',
    url: 'https://www.altoproperty.com.au/',
    images: [{ url: 'https://res.cloudinary.com/dbviya1rj/image/upload/v1762243914/cugd0grw3fbtgdaefa88.png', width: 1200, height: 630, alt: 'ALTO Property' }],
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    title: 'ALTO Property',
    description:
      "Exceptional Results. Genuine Care. Brisbane's premier property specialists.",
    card: 'summary_large_image',
    // Read Twitter handle from environment; fallback to brand handle
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@altoproperty',
    images: ['https://res.cloudinary.com/dbviya1rj/image/upload/v1762243914/cugd0grw3fbtgdaefa88.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Explicit favicon links to ensure compatibility across browsers and Google search */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#473c38" />
        {/* PWA and iOS icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#473c38" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
