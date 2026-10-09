import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

// User-selected online prayer announcement for shared-link previews.
const shareImage = {
  url: 'https://user42297.na.imgto.link/public/20261008/736a9af8009c0fb5a557476f-online-prayer-church-announcement.avif?__imgto_raw=1',
  width: 1774,
  height: 887,
  alt: 'Join our Online Prayer — THTJC Church Pampanga',
}

export const metadata: Metadata = {
  title: 'The Highest Tabernacle of Jesus Christ Ministry Int’l',
  description: 'A welcoming church community in Baliti, City of San Fernando, Pampanga — loving God and loving people.',
  openGraph: {
    type: 'website',
    title: 'The Highest Tabernacle of Jesus Christ Ministry Int’l',
    description: 'A welcoming church community in Baliti, City of San Fernando, Pampanga — loving God and loving people.',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Highest Tabernacle of Jesus Christ Ministry Int’l',
    description: 'A welcoming church community in Baliti, City of San Fernando, Pampanga — loving God and loving people.',
    images: [shareImage],
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=4', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/thtjc-favicon.png?v=4', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico?v=4',
    apple: [
      { url: '/apple-icon.png?v=4', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
