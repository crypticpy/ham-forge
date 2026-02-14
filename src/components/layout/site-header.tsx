'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/practice', label: 'Practice', icon: '📖' },
  { href: '/exam', label: 'Exam', icon: '📋' },
  { href: '/learn', label: 'Learn', icon: '🎓' },
  { href: '/dashboard', label: 'Stats', icon: '📊' },
  { href: '/spectrum', label: 'Spectrum', icon: '📡' },
  { href: '/radio', label: 'Radio', icon: '📻' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpenPath, setMobileMenuOpenPath] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const mobileMenuOpen = mobileMenuOpenPath === pathname

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      if (maxScroll <= 0) {
        setScrollProgress(0)
        return
      }
      setScrollProgress((window.scrollY / maxScroll) * 100)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel safe-area-pt">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 delight-link">
          <span className="text-xl animate-pulse-glow">📻</span>
          <div>
            <span className="font-display text-base font-black text-gradient-orange tracking-wider">
              HAMFORGE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`))
                  ? 'page'
                  : undefined
              }
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] touch-manipulation delight-link',
                pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`))
                  ? 'bg-plasma-orange/20 text-plasma-orange'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              <span className="text-xs">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Propulse External Link */}
          <a
            href="https://propulse.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-plasma-orange hover:bg-plasma-orange/10 transition-colors ml-1 border border-transparent hover:border-plasma-orange/30 min-h-[44px] touch-manipulation"
          >
            <span className="text-xs">☀️</span>
            <span>Propulse</span>
            <ExternalLink className="size-3 opacity-50" />
          </a>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/5"
            onClick={() =>
              setMobileMenuOpenPath((current) => (current === pathname ? null : pathname))
            }
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="site-mobile-menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div id="site-mobile-menu" className="md:hidden border-t border-white/10 glass-panel p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(`${link.href}/`))
                    ? 'page'
                    : undefined
                }
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] touch-manipulation',
                  pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(`${link.href}/`))
                    ? 'bg-plasma-orange/20 text-plasma-orange'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
                onClick={() => setMobileMenuOpenPath(null)}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Propulse Link */}
            <div className="pt-2 mt-2 border-t border-white/10">
              <a
                href="https://propulse.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-plasma-orange bg-plasma-orange/10 border border-plasma-orange/30 min-h-[44px] touch-manipulation"
              >
                <span className="text-lg">☀️</span>
                <span>Open Propulse Dashboard</span>
                <ExternalLink className="size-4 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="header-progress-track" aria-hidden="true">
        <div className="header-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>
    </header>
  )
}
