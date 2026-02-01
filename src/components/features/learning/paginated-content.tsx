'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarkdownRenderer } from './markdown-renderer'
import { cn } from '@/lib/utils'

interface PaginatedContentProps {
  /** The full markdown content to paginate */
  content: string
  /** Unique identifier for persisting reading position */
  sectionId: string
  /** Maximum words per page (approximate) */
  wordsPerPage?: number
  /** Callback when page changes */
  onPageChange?: (page: number, totalPages: number) => void
  /** Additional className for the container */
  className?: string
}

/**
 * PaginatedContent breaks long learning content into digestible pages
 *
 * Features:
 * - Intelligent content splitting at natural breakpoints (headers, paragraphs)
 * - Smooth page transitions
 * - Reading position persistence
 * - Progress indicator
 * - Keyboard navigation (left/right arrows)
 * - Touch-friendly navigation
 */
export function PaginatedContent({
  content,
  sectionId,
  wordsPerPage = 250,
  onPageChange,
  className,
}: PaginatedContentProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Split content into pages
  const pages = useMemo(() => {
    return splitIntoPages(content, wordsPerPage)
  }, [content, wordsPerPage])

  const totalPages = pages.length

  // Load saved reading position on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(`reading-position-${sectionId}`)
    if (saved) {
      const savedPage = parseInt(saved, 10)
      if (savedPage >= 0 && savedPage < totalPages) {
        setCurrentPage(savedPage)
      }
    }
  }, [sectionId, totalPages])

  // Save reading position when page changes
  useEffect(() => {
    sessionStorage.setItem(`reading-position-${sectionId}`, currentPage.toString())
    onPageChange?.(currentPage, totalPages)
  }, [currentPage, sectionId, totalPages, onPageChange])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goToNextPage()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevPage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, totalPages])

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1)
        setIsTransitioning(false)
        // Smooth scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 150)
    }
  }, [currentPage, totalPages])

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1)
        setIsTransitioning(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 150)
    }
  }, [currentPage])

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPages && page !== currentPage) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentPage(page)
          setIsTransitioning(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 150)
      }
    },
    [currentPage, totalPages]
  )

  // If content fits in one page, just render it
  if (totalPages <= 1) {
    return (
      <div className={className}>
        <MarkdownRenderer content={content} />
      </div>
    )
  }

  const isFirstPage = currentPage === 0
  const isLastPage = currentPage === totalPages - 1
  const progressPercent = ((currentPage + 1) / totalPages) * 100

  return (
    <div className={cn('relative', className)}>
      {/* Progress bar at top */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-4" aria-hidden="true" />
            Part {currentPage + 1} of {totalPages}
          </span>
          <span>{Math.round(progressPercent)}% complete</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={currentPage + 1}
            aria-valuemin={1}
            aria-valuemax={totalPages}
          />
        </div>
      </div>

      {/* Page dots for quick navigation (only show if <= 8 pages) */}
      {totalPages <= 8 && (
        <div className="flex justify-center gap-2 mb-6" role="tablist" aria-label="Page navigation">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={cn(
                'size-2.5 rounded-full transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                index === currentPage
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              role="tab"
              aria-selected={index === currentPage}
              aria-label={`Go to part ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content area with transition */}
      <div
        className={cn(
          'transition-opacity duration-150',
          isTransitioning ? 'opacity-0' : 'opacity-100'
        )}
      >
        <MarkdownRenderer content={pages[currentPage]} />
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={goToPrevPage}
          disabled={isFirstPage}
          className="min-w-[120px] h-11"
          aria-label="Go to previous part"
        >
          <ChevronLeft className="size-4 mr-1.5" aria-hidden="true" />
          Previous
        </Button>

        <div className="flex-1 flex justify-center">
          <span className="text-sm text-muted-foreground">
            {isLastPage ? "You've reached the end!" : 'Use arrow keys to navigate'}
          </span>
        </div>

        <Button
          onClick={goToNextPage}
          disabled={isLastPage}
          className="min-w-[120px] h-11"
          aria-label="Go to next part"
        >
          {isLastPage ? 'Complete' : 'Continue'}
          {!isLastPage && <ChevronRight className="size-4 ml-1.5" aria-hidden="true" />}
        </Button>
      </div>
    </div>
  )
}

/**
 * Split markdown content into pages at natural breakpoints
 *
 * Strategy:
 * 1. First, split by headers (## or ###) - these are natural section breaks
 * 2. If a section is still too long, split by horizontal rules (---)
 * 3. If still too long, split by callout blocks (:::)
 * 4. Finally, split by paragraphs if needed
 */
function splitIntoPages(content: string, wordsPerPage: number): string[] {
  if (!content) return ['']

  // Count words roughly
  const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length

  const totalWords = countWords(content)

  // If content is short enough, return as single page
  if (totalWords <= wordsPerPage * 1.3) {
    return [content]
  }

  const pages: string[] = []
  let currentPage = ''
  let currentWordCount = 0

  // Split by major sections (h2 headers)
  const sections = content.split(/(?=^## )/gm)

  for (const section of sections) {
    const sectionWords = countWords(section)

    // If adding this section would exceed the limit
    if (currentWordCount + sectionWords > wordsPerPage * 1.5 && currentPage.trim()) {
      pages.push(currentPage.trim())
      currentPage = section
      currentWordCount = sectionWords
    } else {
      currentPage += (currentPage ? '\n\n' : '') + section
      currentWordCount += sectionWords
    }

    // If current page is way too long, try to split it further
    if (currentWordCount > wordsPerPage * 2) {
      const subPages = splitLongSection(currentPage, wordsPerPage)
      if (subPages.length > 1) {
        // Add all but the last subpage
        pages.push(...subPages.slice(0, -1))
        // Keep the last subpage as current
        currentPage = subPages[subPages.length - 1]
        currentWordCount = countWords(currentPage)
      }
    }
  }

  // Add remaining content
  if (currentPage.trim()) {
    pages.push(currentPage.trim())
  }

  // If we only got one page, try splitting by h3 or paragraphs
  if (pages.length === 1 && countWords(pages[0]) > wordsPerPage * 1.5) {
    return splitByParagraphs(content, wordsPerPage)
  }

  return pages.length > 0 ? pages : [content]
}

/**
 * Split a long section by h3 headers, horizontal rules, or callouts
 */
function splitLongSection(content: string, wordsPerPage: number): string[] {
  // Try splitting by h3 headers
  const h3Sections = content.split(/(?=^### )/gm)
  if (h3Sections.length > 1) {
    return mergeSectionsToPages(h3Sections, wordsPerPage)
  }

  // Try splitting by horizontal rules
  const hrSections = content.split(/^---$/gm)
  if (hrSections.length > 1) {
    return mergeSectionsToPages(hrSections, wordsPerPage)
  }

  // Try splitting by callout blocks
  const calloutPattern = /(?=^:::)/gm
  const calloutSections = content.split(calloutPattern)
  if (calloutSections.length > 1) {
    return mergeSectionsToPages(calloutSections, wordsPerPage)
  }

  // Fall back to paragraph splitting
  return splitByParagraphs(content, wordsPerPage)
}

/**
 * Merge sections into pages based on word count
 */
function mergeSectionsToPages(sections: string[], wordsPerPage: number): string[] {
  const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length

  const pages: string[] = []
  let currentPage = ''
  let currentWordCount = 0

  for (const section of sections) {
    const sectionWords = countWords(section)

    if (currentWordCount + sectionWords > wordsPerPage * 1.5 && currentPage.trim()) {
      pages.push(currentPage.trim())
      currentPage = section
      currentWordCount = sectionWords
    } else {
      currentPage += section
      currentWordCount += sectionWords
    }
  }

  if (currentPage.trim()) {
    pages.push(currentPage.trim())
  }

  return pages
}

/**
 * Split content by paragraphs as a last resort
 */
function splitByParagraphs(content: string, wordsPerPage: number): string[] {
  const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length

  const paragraphs = content.split(/\n\n+/)
  const pages: string[] = []
  let currentPage = ''
  let currentWordCount = 0

  for (const para of paragraphs) {
    const paraWords = countWords(para)

    // If this paragraph alone exceeds the limit, just add it to its own page
    if (paraWords > wordsPerPage * 1.5) {
      if (currentPage.trim()) {
        pages.push(currentPage.trim())
      }
      pages.push(para.trim())
      currentPage = ''
      currentWordCount = 0
      continue
    }

    if (currentWordCount + paraWords > wordsPerPage && currentPage.trim()) {
      pages.push(currentPage.trim())
      currentPage = para
      currentWordCount = paraWords
    } else {
      currentPage += (currentPage ? '\n\n' : '') + para
      currentWordCount += paraWords
    }
  }

  if (currentPage.trim()) {
    pages.push(currentPage.trim())
  }

  return pages.length > 0 ? pages : [content]
}
