'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { getGroupsForSubelement } from '@/lib/question-scheduler'
import { useProgressStore } from '@/stores/progress-store'
import { Flag } from 'lucide-react'
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

// Sub-component for flagged questions toggle
function FlaggedOnlyToggle({
  showFlaggedOnly,
  onFlaggedOnlyChange,
}: {
  showFlaggedOnly: boolean
  onFlaggedOnlyChange: (flaggedOnly: boolean) => void
}) {
  const flaggedCount = useProgressStore((state) => state.getFlaggedCount())

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Flag
          className={cn(
            'size-5',
            showFlaggedOnly ? 'text-amber-500 fill-current' : 'text-muted-foreground'
          )}
          aria-hidden="true"
        />
        <div className="space-y-0.5">
          <label htmlFor="flagged-only" className="text-sm font-medium leading-none">
            Flagged Questions Only
          </label>
          <p className="text-xs text-muted-foreground">
            {flaggedCount === 0
              ? 'No questions flagged yet'
              : `${flaggedCount} question${flaggedCount === 1 ? '' : 's'} flagged`}
          </p>
        </div>
      </div>
      <Switch
        id="flagged-only"
        checked={showFlaggedOnly}
        onCheckedChange={onFlaggedOnlyChange}
        disabled={flaggedCount === 0}
      />
    </div>
  )
}

interface FilterPanelProps {
  examLevel: ExamLevel
  selectedSubelements: string[]
  selectedGroups: string[]
  selectedStatus: QuestionStatus[]
  showFlaggedOnly: boolean
  onSubelementsChange: (subelements: string[]) => void
  onGroupsChange: (groups: string[]) => void
  onStatusChange: (status: QuestionStatus[]) => void
  onFlaggedOnlyChange: (flaggedOnly: boolean) => void
}

export function FilterPanel({
  examLevel,
  selectedSubelements,
  selectedGroups,
  selectedStatus,
  showFlaggedOnly,
  onSubelementsChange,
  onGroupsChange,
  onStatusChange,
  onFlaggedOnlyChange,
}: FilterPanelProps) {
  const subelements = examLevel === 'technician' ? TECHNICIAN_SUBELEMENTS : GENERAL_SUBELEMENTS

  // Get available groups for selected subelements
  const availableGroups = useMemo(() => {
    if (selectedSubelements.length === 0) return []
    const groups: string[] = []
    for (const sub of selectedSubelements) {
      groups.push(...getGroupsForSubelement(examLevel, sub))
    }
    return groups.sort()
  }, [examLevel, selectedSubelements])

  const toggleSubelement = (id: string) => {
    if (selectedSubelements.includes(id)) {
      // When removing a subelement, also remove its groups from selection
      const groupsToRemove = getGroupsForSubelement(examLevel, id)
      const newGroups = selectedGroups.filter((g) => !groupsToRemove.includes(g))
      onGroupsChange(newGroups)
      onSubelementsChange(selectedSubelements.filter((s) => s !== id))
    } else {
      onSubelementsChange([...selectedSubelements, id])
    }
  }

  const toggleGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      onGroupsChange(selectedGroups.filter((g) => g !== groupId))
    } else {
      onGroupsChange([...selectedGroups, groupId])
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
    onGroupsChange([]) // Also clear groups when clearing subelements
  }

  const selectAllGroups = () => {
    onGroupsChange(availableGroups)
  }

  const clearGroups = () => {
    onGroupsChange([])
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

      {/* Topic Groups Filter - only shown when subelements are selected */}
      {availableGroups.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Topic Groups</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="xs" onClick={selectAllGroups} className="text-xs">
                  All
                </Button>
                <Button variant="ghost" size="xs" onClick={clearGroups} className="text-xs">
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {availableGroups.map((groupId) => (
                <button
                  key={groupId}
                  onClick={() => toggleGroup(groupId)}
                  className={cn(
                    'inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                    'border hover:bg-accent',
                    selectedGroups.includes(groupId)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input bg-background text-muted-foreground'
                  )}
                >
                  {groupId}
                </button>
              ))}
            </div>
            {selectedGroups.length === 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                No groups selected - all groups in selected topics will be included
              </p>
            )}
          </CardContent>
        </Card>
      )}

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

      {/* Flagged Questions Filter */}
      <Card>
        <CardContent className="py-4">
          <FlaggedOnlyToggle
            showFlaggedOnly={showFlaggedOnly}
            onFlaggedOnlyChange={onFlaggedOnlyChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export { TECHNICIAN_SUBELEMENTS, GENERAL_SUBELEMENTS, STATUS_OPTIONS }
