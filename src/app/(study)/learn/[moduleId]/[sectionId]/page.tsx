'use client'

import { useState, useEffect, use, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Loader2,
  AlertCircle,
  Check,
  BookOpen,
} from 'lucide-react'
import { useHydration } from '@/hooks/use-hydration'
import { MarkdownRenderer } from '@/components/features/learning/markdown-renderer'
import { KeyPoints } from '@/components/features/learning/key-points'
import { getModuleById } from '@/lib/learning-modules'
import type { LearningModule, LearningSection } from '@/types/learning'
import type { ExamLevel } from '@/types'

// Storage key for learning progress
const PROGRESS_KEY = 'hamforge-learning-progress'

interface SectionPageProps {
  params: Promise<{ moduleId: string; sectionId: string }>
}

/**
 * Get a learning module by ID, checking both exam levels
 */
function getModule(moduleId: string): LearningModule | null {
  const examLevel: ExamLevel = moduleId.startsWith('G') ? 'general' : 'technician'
  return getModuleById(examLevel, moduleId) ?? null
}

// Mock content for sections
const MOCK_SECTION_CONTENT: Record<string, string> = {
  T1A: `# Purpose and Permissible Use of Amateur Radio

Amateur radio, often called "ham radio," exists for several important purposes defined by the FCC in Part 97 of its rules.

## The Five Purposes of Amateur Radio

The amateur service is defined for:

- **Advancing skills** in both the technical and communication phases of radio art
- **Expanding the pool** of trained operators, technicians, and electronics experts
- **Enhancing international goodwill** through communication between citizens of different countries
- **Providing emergency communications** during disasters and public service events
- **Encouraging personal experimentation** and technical advancement

## What You CAN Do

As a licensed amateur radio operator, you may:

- Communicate with other licensed amateurs worldwide
- Experiment with radio equipment and antennas
- Provide emergency communications during disasters
- Participate in public service events (parades, marathons, etc.)
- Engage in contests and awards programs

## What You CANNOT Do

Amateur radio strictly prohibits:

- **Broadcasting** - One-way transmissions intended for the general public
- **Commercial activities** - Using your license for business communications
- **Music transmission** - Except for incidental purposes
- **Obscene or indecent language** - Keep it family-friendly

### Emergency Communications Exception

The **one major exception** to most operating rules is emergency communications. When there is an immediate threat to life or property, you may use ANY means necessary to communicate, including frequencies you normally wouldn't have access to.

\`\`\`
Example emergency frequencies:
- 146.52 MHz - National simplex calling frequency
- 7.290 MHz - HF emergency frequency
\`\`\`
`,

  T1B: `# Authorized Frequencies for Technician Class

Understanding your frequency privileges is essential for legal operation. As a Technician class operator, you have access to specific portions of the amateur radio spectrum.

## VHF and UHF Privileges

Technicians have **full operating privileges** on all amateur frequencies above 30 MHz. This includes:

- **6 meters** (50-54 MHz) - Great for sporadic-E propagation
- **2 meters** (144-148 MHz) - Most popular band for local communications
- **70 centimeters** (420-450 MHz) - Great for repeaters and data modes
- **23 centimeters** and higher - Microwave experimentation

## Limited HF Privileges

Technicians also have limited privileges on some HF (shortwave) bands:

- **10 meters** (28.0-28.5 MHz) - CW, RTTY, and data modes
- **15 meters** (21.225-21.275 MHz) - CW only
- **40 meters** (7.025-7.125 MHz) - CW only
- **80 meters** (3.525-3.600 MHz) - CW only

### Band Plans

Band plans are **voluntary guidelines** that help organize different activities within each band. While not legally required, following band plans:

- Reduces interference between stations
- Makes it easier to find specific types of activity
- Promotes good amateur practice

\`\`\`
2 Meter Band Plan (simplified):
144.00-144.05 - EME (Earth-Moon-Earth)
144.10-144.30 - Weak signal work (CW/SSB)
145.00-145.50 - Repeater inputs
146.00-146.40 - Repeater outputs
146.52        - National calling frequency
\`\`\`
`,

  T1C: `# Operator Licensing System

The FCC administers three classes of amateur radio licenses, each with progressively more privileges.

## License Classes

### Technician Class
- Entry-level license
- Full VHF/UHF privileges
- Limited HF privileges
- 35-question exam

### General Class
- Intermediate level
- Extensive HF privileges added
- 35-question exam (after Technician)

### Extra Class
- Highest class available
- Full privileges on all amateur bands
- 50-question exam (after General)

## License Terms and Renewal

- Licenses are valid for **10 years** from date of issuance
- Must be renewed **before expiration**
- A **2-year grace period** exists for renewal after expiration
- During the grace period, you **cannot operate** until renewed
- After the grace period, you must re-take the exam

## Vanity Call Signs

After obtaining your license, you can apply for a **vanity call sign** if you want a specific combination of letters and numbers. Some restrictions apply based on license class.
`,

  T1D: `# Operating Restrictions and Station Identification

Proper operating practices help maintain order on the amateur bands and ensure compliance with FCC regulations.

## Station Identification

You **must** identify your station:

- At the beginning of a transmission
- Every **10 minutes** during extended communications
- At the end of a transmission

Identification must be in:
- **English** using your call sign
- **CW** (Morse code) is also acceptable
- **Phone** (voice) is the most common method

## Language Restrictions

- **No indecent or obscene language** is permitted
- While most communications are in English, other languages are permitted
- Codes and ciphers are only allowed in certain circumstances

## Third-Party Communications

**Third-party traffic** refers to messages handled on behalf of another person. Rules include:

- The control operator is always responsible
- The unlicensed person may speak, but the control operator must be present
- International third-party traffic is only allowed with countries that have agreements with the US

## Power Restrictions

Always use the **minimum power necessary** to maintain reliable communications. Maximum power limits:

- Generally **1500 watts PEP** output for most bands
- Some bands have lower limits
- Technicians on HF have **200 watts PEP** limit
`,

  T2A: `# Station Operation Standards

Professional operating practices make amateur radio more enjoyable for everyone and help ensure efficient use of the spectrum.

## Before You Transmit

Always **listen first** before transmitting to:
- Check if the frequency is in use
- Avoid interfering with ongoing communications
- Find an appropriate frequency for your activity

If a frequency appears clear, ask "Is the frequency in use?" before beginning your transmission.

## Making Contact

To call another station:
1. State their call sign
2. State "this is" (or "de" in CW)
3. State your call sign
4. Wait for a response

Example: "W1ABC this is KD2XYZ"

## Interference

If you cause interference:
- Stop transmitting immediately
- Identify the source of the problem
- Take corrective action

If you receive interference:
- Try moving to a different frequency
- Report intentional interference to the FCC
- Never retaliate or argue on the air
`,

  T2B: `# Repeater Operation

Repeaters are automated stations that receive signals on one frequency and retransmit them on another, extending communication range.

## How Repeaters Work

A repeater consists of:
- A **receiver** tuned to the input frequency
- A **transmitter** on the output frequency
- A **controller** that manages the operation

The difference between input and output frequencies is called the **offset**:
- 2 meters: typically 600 kHz offset
- 70 cm: typically 5 MHz offset

## Access Tones

Many repeaters require access tones to prevent unwanted interference:

- **CTCSS** (Continuous Tone-Coded Squelch System) - A sub-audible tone transmitted continuously
- **PL tone** - Motorola's trade name for CTCSS
- **DCS** (Digital Coded Squelch) - Digital codes instead of tones

## Repeater Etiquette

- Wait for the **courtesy tone** before transmitting
- Keep transmissions **brief**
- Leave gaps between transmissions for others to join
- Yield to **emergency traffic** immediately
- Identify with your call sign as required
`,
}

// Fallback content for sections without full content in the data layer
const FALLBACK_CONTENT: Record<string, string> = MOCK_SECTION_CONTENT

/**
 * Get completed sections from localStorage
 */
function getCompletedSections(): Record<string, string[]> {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(PROGRESS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * Save completed sections to localStorage
 */
function saveCompletedSections(progress: Record<string, string[]>): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  } catch {
    // Ignore localStorage errors
  }
}

export default function SectionContentPage({ params }: SectionPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const isHydrated = useHydration()
  const [module, setModule] = useState<LearningModule | null>(null)
  const [section, setSection] = useState<LearningSection | null>(null)
  const [sectionIndex, setSectionIndex] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  // Load module and section data
  useEffect(() => {
    const loadData = async () => {
      try {
        const moduleData = getModule(resolvedParams.moduleId)
        if (!moduleData) {
          setError('Module not found')
          setIsLoading(false)
          return
        }

        const idx = moduleData.sections.findIndex(
          (s: LearningSection) => s.id === resolvedParams.sectionId
        )
        if (idx === -1) {
          setError('Section not found')
          setIsLoading(false)
          return
        }

        // Get the section with fallback content if the section content is empty
        const sectionData = moduleData.sections[idx]
        const sectionWithContent: LearningSection = {
          ...sectionData,
          content: sectionData.content || FALLBACK_CONTENT[sectionData.id] || '',
        }

        setModule(moduleData)
        setSection(sectionWithContent)
        setSectionIndex(idx)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [resolvedParams.moduleId, resolvedParams.sectionId])

  // Load completion status from localStorage
  useEffect(() => {
    if (!isHydrated || !module || !section) return

    const progress = getCompletedSections()
    const moduleProgress = progress[module.id] || []
    setIsCompleted(moduleProgress.includes(section.id))
  }, [isHydrated, module, section])

  // Mark section as complete
  const handleMarkComplete = useCallback(() => {
    if (!module || !section) return

    const progress = getCompletedSections()
    const moduleProgress = progress[module.id] || []

    if (!moduleProgress.includes(section.id)) {
      moduleProgress.push(section.id)
      progress[module.id] = moduleProgress
      saveCompletedSections(progress)
      setIsCompleted(true)
    }
  }, [module, section])

  // Navigation helpers
  const prevSection = module && sectionIndex > 0 ? module.sections[sectionIndex - 1] : null
  const nextSection =
    module && sectionIndex < module.sections.length - 1 ? module.sections[sectionIndex + 1] : null

  // Loading state
  if (isLoading || !isHydrated) {
    return (
      <div className="container max-w-3xl py-6 px-4">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !module || !section) {
    return (
      <div className="container max-w-3xl py-6 px-4">
        <Card className="border-destructive">
          <CardContent className="py-8 text-center">
            <AlertCircle className="size-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Content Not Found</h2>
            <p className="text-muted-foreground mb-4">
              {error || 'Unable to load this learning section'}
            </p>
            <Button onClick={() => router.push('/learn')}>Back to Learn</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-6 px-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link href="/learn" className="hover:text-foreground transition-colors">
          <Home className="size-4" aria-label="Learn" />
        </Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        <Link href={`/learn/${module.id}`} className="hover:text-foreground transition-colors">
          {module.title}
        </Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        <span className="text-foreground">{section.title}</span>
      </nav>

      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-mono text-muted-foreground">{section.id}</span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <Check className="size-3" aria-hidden="true" />
              Completed
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold">{section.title}</h1>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {section.content ? (
          <MarkdownRenderer content={section.content} />
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <BookOpen className="size-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Content for this section is coming soon. Check back later!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Key Points */}
      {section.keyPoints && section.keyPoints.length > 0 && (
        <div className="mb-8">
          <KeyPoints points={section.keyPoints} />
        </div>
      )}

      {/* Related Questions Link */}
      {section.relatedQuestionIds && section.relatedQuestionIds.length > 0 && (
        <Card className="mb-8">
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-medium">Practice Related Questions</h3>
                <p className="text-sm text-muted-foreground">
                  {section.relatedQuestionIds.length} questions available for this section
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/practice?section=${section.id}`}>
                  <BookOpen className="size-4 mr-2" aria-hidden="true" />
                  Practice
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mark as Complete Button */}
      {!isCompleted && (
        <div className="mb-8">
          <Button onClick={handleMarkComplete} variant="outline" className="w-full">
            <Check className="size-4 mr-2" aria-hidden="true" />
            Mark as Complete
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t">
        {prevSection ? (
          <Button variant="outline" asChild>
            <Link href={`/learn/${module.id}/${prevSection.id}`}>
              <ChevronLeft className="size-4 mr-1" aria-hidden="true" />
              <span className="hidden sm:inline">Previous:</span> {prevSection.title}
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {nextSection ? (
          <Button asChild>
            <Link href={`/learn/${module.id}/${nextSection.id}`}>
              <span className="hidden sm:inline">Next:</span> {nextSection.title}
              <ChevronRight className="size-4 ml-1" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link href={`/learn/${module.id}`}>
              Back to Module
              <ChevronRight className="size-4 ml-1" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
