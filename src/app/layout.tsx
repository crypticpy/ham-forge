import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Header } from '@/components/layout/header'
import { MobileNav } from '@/components/layout/mobile-nav'
import { SkipLink } from '@/components/ui/skip-link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'HamForge - Ham Radio Exam Prep',
    template: '%s | HamForge',
  },
  description:
    'Free amateur radio exam preparation for Technician and General class licenses. Practice questions, simulated exams, and IC-7300 reference.',
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
  ],
  authors: [{ name: 'HamForge' }],
  creator: 'HamForge',
  publisher: 'HamForge',
  applicationName: 'HamForge',
  openGraph: {
    title: 'HamForge - Ham Radio Exam Prep',
    description:
      'Free amateur radio exam preparation for Technician and General class licenses. Practice questions, simulated exams, and IC-7300 reference.',
    type: 'website',
    locale: 'en_US',
    siteName: 'HamForge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HamForge - Ham Radio Exam Prep',
    description: 'Free amateur radio exam preparation for Technician and General class licenses.',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SkipLink />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            {/*
              Main content wrapper - child layouts should provide <main id="main-content">
              for proper accessibility. The skip link targets #main-content.
            */}
            <div className="flex-1 pb-16 md:pb-0">{children}</div>
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
