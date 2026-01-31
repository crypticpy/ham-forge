'use client'

import Link from 'next/link'
import { ArrowLeft, Database } from 'lucide-react'
import { ExportDialog } from '@/components/features/settings/export-dialog'

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-6 px-4">
      {/* Header with back link */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your HamForge preferences and data</p>
      </div>

      {/* Data Management Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Database className="size-5" aria-hidden="true" />
          Data Management
        </div>
        <ExportDialog />
      </div>
    </div>
  )
}
