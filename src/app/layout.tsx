import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Header } from '@/components/layout/header'
import { MobileNav } from '@/components/layout/mobile-nav'
import { SkipLink } from '@/components/ui/skip-link'

export const metadata: Metadata = {
  title: {
    default: 'HamForge - Ham Radio Exam Prep',
    template: '%s | HamForge',
  },
  description:
    'Free amateur radio exam preparation for Technician and General class licenses. Practice questions, simulated exams, spectrum explorer, and IC-7300 reference. Part of the Propulse ecosystem.',
  keywords: [
    'ham radio',
    'amateur radio',
    'FCC exam',
    'technician license',
    'general license',
    'IC-7300',
    'amateur radio exam prep',
    'ham radio practice test',
    'FCC license study',
    'propulse',
    'radio propagation',
    'spectrum allocation',
  ],
  authors: [{ name: 'HamForge' }],
  creator: 'HamForge',
  publisher: 'HamForge',
  applicationName: 'HamForge',
  openGraph: {
    title: 'HamForge - Ham Radio Exam Prep',
    description:
      'Free amateur radio exam preparation for Technician and General class licenses. Part of the Propulse ecosystem for amateur radio operators.',
    type: 'website',
    locale: 'en_US',
    siteName: 'HamForge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HamForge - Ham Radio Exam Prep',
    description: 'Free amateur radio exam preparation. Part of the Propulse ecosystem.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HamForge',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <SkipLink />
          <div className="relative flex min-h-[100dvh] flex-col">
            <Header />
            {/*
              Main content wrapper - child layouts should provide <main id="main-content">
              for proper accessibility. The skip link targets #main-content.
            */}
            <div className="flex-1 pb-safe md:pb-0">{children}</div>
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
