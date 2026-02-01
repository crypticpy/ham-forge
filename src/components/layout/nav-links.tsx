'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  Radio,
  Waves,
  Layers,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/practice', label: 'Practice', icon: BookOpen },
  { href: '/flashcards', label: 'Cards', icon: Layers },
  { href: '/exam', label: 'Exam', icon: ClipboardCheck },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/spectrum', label: 'Spectrum', icon: Waves },
  { href: '/radio', label: 'Radio', icon: Radio },
]

interface NavLinksProps {
  className?: string
  onLinkClick?: () => void
}

export function NavLinks({ className, onLinkClick }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center gap-0.5', className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-plasma-orange/20 text-plasma-orange'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            )}
            onClick={onLinkClick}
          >
            <Icon className="size-4" />
            <span>{item.label}</span>
          </Link>
        )
      })}

      {/* Propulse External Link */}
      <a
        href="https://propulse.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-plasma-orange hover:bg-plasma-orange/10 transition-colors ml-1 border border-transparent hover:border-plasma-orange/30"
      >
        <span className="text-sm">☀️</span>
        <span>Propulse</span>
        <ExternalLink className="size-3 opacity-50" />
      </a>
    </nav>
  )
}

export function NavLinksMobile({ className, onLinkClick }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex flex-col gap-2', className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-plasma-orange/20 text-plasma-orange'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            )}
            onClick={onLinkClick}
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}

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
    </nav>
  )
}
