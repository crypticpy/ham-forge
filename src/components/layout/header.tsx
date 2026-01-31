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
  { href: '/spectrum', label: 'Spectrum', icon: '📡' },
  { href: '/radio', label: 'Radio', icon: '📻' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full glass-panel">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-2xl md:text-3xl animate-pulse-glow">📻</span>
          <div className="hidden sm:block">
            <h1 className="font-display text-lg md:text-xl font-black text-gradient-orange tracking-wider">
              HAMFORGE
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider -mt-1">
              Study companion
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-plasma-orange/20 text-plasma-orange'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5'
              )}
            >
              <span className="text-sm">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Propulse Link */}
          <a
            href="https://propulse.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-plasma-orange hover:bg-plasma-orange/10 transition-colors ml-2 border border-transparent hover:border-plasma-orange/30"
          >
            <span className="text-sm">☀️</span>
            <span>Propulse</span>
            <ExternalLink className="size-3 opacity-50" />
          </a>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <nav
        id="mobile-menu"
        className={cn(
          'md:hidden border-t border-white/10 glass-panel p-4',
          !mobileMenuOpen && 'hidden'
        )}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-plasma-orange/20 text-plasma-orange'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Propulse Link in Mobile */}
          <div className="pt-2 mt-2 border-t border-white/10">
            <a
              href="https://propulse.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-plasma-orange bg-plasma-orange/10 border border-plasma-orange/30"
            >
              <span className="text-lg">☀️</span>
              <span>Open Propulse Dashboard</span>
              <ExternalLink className="size-4 ml-auto" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
