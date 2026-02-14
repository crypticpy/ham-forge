'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { ControlCard } from '@/components/features/radio/control-card'
import { getIC7300Controls } from '@/lib/ic7300-data'
import type { RadioControl } from '@/types/radio'

const categories: { value: RadioControl['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tuning', label: 'Tuning' },
  { value: 'audio', label: 'Audio' },
  { value: 'mode', label: 'Mode' },
  { value: 'filter', label: 'Filter' },
  { value: 'power', label: 'Power' },
  { value: 'memory', label: 'Memory' },
  { value: 'display', label: 'Display' },
  { value: 'misc', label: 'Misc' },
]

export default function ControlsPage() {
  const [selectedCategory, setSelectedCategory] = useState<RadioControl['category'] | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get controls from the data library (24 controls, not the old inline 20)
  const allControls = useMemo(() => getIC7300Controls(), [])

  const filteredControls = useMemo(() => {
    return allControls.filter((control) => {
      const matchesCategory = selectedCategory === 'all' || control.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        control.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        control.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (control.examTips && control.examTips.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [allControls, selectedCategory, searchQuery])

  const controlsWithExamTips = filteredControls.filter((c) => c.examTips)

  return (
    <div className="container mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-6">
      {/* Back link */}
      <Link
        href="/radio"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Radio Reference
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Control Reference</h1>
        <p className="text-muted-foreground">IC-7300 front panel, menu, and touchscreen controls</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search controls..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
              selectedCategory === category.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover:bg-muted border-border'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredControls.length} control{filteredControls.length !== 1 ? 's' : ''}
        {controlsWithExamTips.length > 0 && (
          <span className="ml-2 text-amber-600 dark:text-amber-400">
            ({controlsWithExamTips.length} with exam tips)
          </span>
        )}
      </p>

      {/* Controls grid */}
      {filteredControls.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredControls.map((control) => (
            <ControlCard key={control.id} control={control} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No controls found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
