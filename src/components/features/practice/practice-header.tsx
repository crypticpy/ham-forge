'use client'

import { ArrowLeft, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PracticeHeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
  showSettings?: boolean
  onSettingsClick?: () => void
  progress?: {
    current: number
    total: number
  }
}

export function PracticeHeader({
  title,
  subtitle,
  showBack = true,
  showSettings = false,
  onSettingsClick,
  progress,
}: PracticeHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href="/practice">
              <ArrowLeft className="size-5" />
              <span className="sr-only">Back to Practice</span>
            </Link>
          </Button>
        )}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {progress && (
          <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
            <span className="text-sm font-medium">{progress.current}</span>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">{progress.total}</span>
          </div>
        )}
        {showSettings && onSettingsClick && (
          <Button variant="ghost" size="icon-sm" onClick={onSettingsClick}>
            <Settings className="size-5" />
            <span className="sr-only">Settings</span>
          </Button>
        )}
      </div>
    </div>
  )
}
