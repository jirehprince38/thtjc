import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

// Permanently hosted, share-sized copy; Facebook CDN links expire.
const shareImage = {
  url: 'https://id-preview--682b1a99-6406-4d09-8879-6994fb636580.lovable.app/__l5e/assets-v1/0ffe14d4-0c3d-4ce6-9a4d-b27c49f7a4b8/thtjc-great-harvest-preview-1200.jpg',
  width: 1200,
  height: 600,
  alt: 'The Great Harvest — THTJC Church Pampanga',
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
