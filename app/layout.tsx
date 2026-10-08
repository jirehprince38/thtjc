import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Highest Tabernacle of Jesus Christ Ministry Int’l',
  description: 'A welcoming church community in Baliti, City of San Fernando, Pampanga — loving God and loving people.',
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
