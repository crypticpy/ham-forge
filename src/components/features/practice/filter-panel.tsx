'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ExamLevel } from '@/types'

// Subelement definitions for each exam level
const TECHNICIAN_SUBELEMENTS = [
  { id: 'T1', name: 'FCC Rules' },
  { id: 'T2', name: 'Operating Procedures' },
  { id: 'T3', name: 'Radio Waves' },
  { id: 'T4', name: 'Best Practices' },
  { id: 'T5', name: 'Electrical Principles' },
  { id: 'T6', name: 'Electrical Components' },
  { id: 'T7', name: 'Station Equipment' },
  { id: 'T8', name: 'Modulation Modes' },
  { id: 'T9', name: 'Antennas' },
  { id: 'T0', name: 'Safety' },
]

const GENERAL_SUBELEMENTS = [
  { id: 'G1', name: 'FCC Rules' },
  { id: 'G2', name: 'Operating Procedures' },
  { id: 'G3', name: 'Radio Wave Propagation' },
  { id: 'G4', name: 'Amateur Radio Practices' },
  { id: 'G5', name: 'Electrical Principles' },
  { id: 'G6', name: 'Circuit Components' },
  { id: 'G7', name: 'Practical Circuits' },
  { id: 'G8', name: 'Signals and Emissions' },
  { id: 'G9', name: 'Antennas and Feed Lines' },
  { id: 'G0', name: 'Safety' },
]

const STATUS_OPTIONS = [
  { id: 'new', name: 'New', color: 'bg-blue-500' },
  { id: 'learning', name: 'Learning', color: 'bg-amber-500' },
  { id: 'review', name: 'Review', color: 'bg-purple-500' },
  { id: 'mastered', name: 'Mastered', color: 'bg-green-500' },
] as const

type QuestionStatus = 'new' | 'learning' | 'review' | 'mastered'

interface FilterPanelProps {
  examLevel: ExamLevel
  selectedSubelements: string[]
  selectedStatus: QuestionStatus[]
  onSubelementsChange: (subelements: string[]) => void
  onStatusChange: (status: QuestionStatus[]) => void
}

export function FilterPanel({
  examLevel,
  selectedSubelements,
  selectedStatus,
  onSubelementsChange,
  onStatusChange,
}: FilterPanelProps) {
  const subelements = examLevel === 'technician' ? TECHNICIAN_SUBELEMENTS : GENERAL_SUBELEMENTS

  const toggleSubelement = (id: string) => {
    if (selectedSubelements.includes(id)) {
      onSubelementsChange(selectedSubelements.filter((s) => s !== id))
    } else {
      onSubelementsChange([...selectedSubelements, id])
    }
  }

  const toggleStatus = (status: QuestionStatus) => {
    if (selectedStatus.includes(status)) {
      onStatusChange(selectedStatus.filter((s) => s !== status))
    } else {
      onStatusChange([...selectedStatus, status])
    }
  }

  const selectAllSubelements = () => {
    onSubelementsChange(subelements.map((s) => s.id))
  }

  const clearSubelements = () => {
    onSubelementsChange([])
  }

  const selectAllStatus = () => {
    onStatusChange(['new', 'learning', 'review', 'mastered'])
  }

  const clearStatus = () => {
    onStatusChange([])
  }

  return (
    <div className="space-y-4">
      {/* Subelement Filter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Topics</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="xs" onClick={selectAllSubelements} className="text-xs">
                All
              </Button>
              <Button variant="ghost" size="xs" onClick={clearSubelements} className="text-xs">
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {subelements.map((sub) => (
              <button
                key={sub.id}
                onClick={() => toggleSubelement(sub.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  'border hover:bg-accent',
                  selectedSubelements.includes(sub.id)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-input bg-background text-muted-foreground'
                )}
              >
                <span className="font-semibold">{sub.id}</span>
                <span className="hidden sm:inline">{sub.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Filter */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Progress Status</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="xs" onClick={selectAllStatus} className="text-xs">
                All
              </Button>
              <Button variant="ghost" size="xs" onClick={clearStatus} className="text-xs">
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status.id}
                onClick={() => toggleStatus(status.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  'border hover:bg-accent',
                  selectedStatus.includes(status.id)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-input bg-background text-muted-foreground'
                )}
              >
                <span className={cn('size-2 rounded-full', status.color)} aria-hidden="true" />
                {status.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { TECHNICIAN_SUBELEMENTS, GENERAL_SUBELEMENTS, STATUS_OPTIONS }
