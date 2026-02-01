'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ExternalLink, ChevronDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

// Primary navigation - core study features
const primaryLinks = [
  { href: '/practice', label: 'Practice', icon: '📖' },
  { href: '/flashcards', label: 'Cards', icon: '🃏' },
  { href: '/exam', label: 'Exam', icon: '📋' },
  { href: '/learn', label: 'Learn', icon: '🎓' },
]

// Secondary navigation - tools and reference
const toolsLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/spectrum', label: 'Spectrum', icon: '📡' },
  { href: '/radio', label: 'Radio', icon: '📻' },
]

// All links for mobile menu
const allLinks = [{ href: '/', label: 'Home', icon: '🏠' }, ...primaryLinks, ...toolsLinks]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Check if current page is in tools section
  const isToolsActive = toolsLinks.some(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
  )

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setToolsDropdownOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        const toggleButton = document.querySelector('[aria-controls="mobile-menu"]') as HTMLElement
        toggleButton?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Focus trap when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return

    const menu = document.getElementById('mobile-menu')
    if (!menu) return

    const focusableElements = menu.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    firstElement?.focus()

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
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
          {/* Primary Links */}
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname === link.href || pathname.startsWith(`${link.href}/`) ? 'page' : undefined
              }
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? 'bg-plasma-orange/20 text-plasma-orange'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5'
              )}
            >
              <span className="text-sm">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Tools Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              aria-expanded={toolsDropdownOpen}
              aria-haspopup="true"
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                isToolsActive
                  ? 'bg-plasma-orange/20 text-plasma-orange'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5'
              )}
            >
              <MoreHorizontal className="size-4" />
              <span>Tools</span>
              <ChevronDown
                className={cn('size-3 transition-transform', toolsDropdownOpen && 'rotate-180')}
              />
            </button>

            {/* Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-white/10 glass-panel shadow-lg py-2 animate-fade-in">
                {toolsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-plasma-orange/20 text-plasma-orange'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    )}
                    onClick={() => setToolsDropdownOpen(false)}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}

                {/* Divider */}
                <div className="my-2 border-t border-white/10" />

                {/* Propulse Link */}
                <a
                  href="https://propulse.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-plasma-orange hover:bg-plasma-orange/10 transition-colors"
                >
                  <span className="text-base">☀️</span>
                  <span>Propulse</span>
                  <ExternalLink className="size-3 ml-auto opacity-50" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
            )}
          </div>
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
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
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
              <ExternalLink className="size-4 ml-auto" aria-hidden="true" />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
