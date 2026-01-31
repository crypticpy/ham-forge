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
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/spectrum', label: 'Spectrum', icon: '📡' },
  { href: '/radio', label: 'Radio', icon: '📻' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
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
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-plasma-orange hover:bg-plasma-orange/10 transition-colors ml-1 border border-transparent hover:border-plasma-orange/30"
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 glass-panel p-4">
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

            {/* Propulse Link */}
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
        </div>
      )}
    </header>
  )
}
