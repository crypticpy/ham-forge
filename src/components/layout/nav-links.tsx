'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, ClipboardCheck, GraduationCap, BarChart3, Radio, Waves } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/practice', label: 'Practice', icon: BookOpen },
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
    <nav className={cn('flex items-center gap-1', className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const Icon = item.icon

        return (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            className={cn('text-muted-foreground gap-2', isActive && 'text-foreground bg-accent')}
            onClick={onLinkClick}
          >
            <Link href={item.href}>
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}

export function NavLinksMobile({ className, onLinkClick }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex flex-col gap-1', className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const Icon = item.icon

        return (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            className={cn(
              'justify-start text-muted-foreground gap-3',
              isActive && 'text-foreground bg-accent'
            )}
            onClick={onLinkClick}
          >
            <Link href={item.href}>
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
