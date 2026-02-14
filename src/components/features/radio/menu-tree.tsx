'use client'

import { useState, useCallback, useMemo, useRef, KeyboardEvent } from 'react'
import {
  ChevronRight,
  ChevronDown,
  Search,
  Star,
  Lightbulb,
  Folder,
  FolderOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/data/radio/ic7300-menu'

// ============================================================
// MenuBreadcrumb Component
// ============================================================

interface MenuBreadcrumbProps {
  path: string[]
  onNavigate?: (path: string[]) => void
}

/**
 * Displays the current navigation path in the menu tree
 * Shows clickable segments like "SET > Display > LCD Brightness"
 */
export function MenuBreadcrumb({ path, onNavigate }: MenuBreadcrumbProps) {
  if (path.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="Menu breadcrumb"
      className="flex items-center gap-1 text-sm text-muted-foreground"
    >
      {path.map((segment, index) => {
        const isLast = index === path.length - 1
        const pathToHere = path.slice(0, index + 1)

        return (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="size-3 text-muted-foreground/60" aria-hidden="true" />
            )}
            {onNavigate && !isLast ? (
              <button
                onClick={() => onNavigate(pathToHere)}
                className="hover:text-foreground hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded px-1"
                aria-label={`Navigate to ${segment}`}
              >
                {segment}
              </button>
            ) : (
              <span className={cn(isLast && 'text-foreground font-medium')}>{segment}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

// ============================================================
// MenuTreeItem Component
// ============================================================

interface MenuTreeItemProps {
  item: MenuItem
  level: number
  searchQuery?: string
  defaultExpanded?: boolean
}

/**
 * Highlights matching text in a string based on search query
 */
function HighlightedText({ text, query }: { text: string; query?: string }) {
  if (!query || query.trim().length === 0) {
    return <>{text}</>
  }

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase().trim()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) {
    return <>{text}</>
  }

  const before = text.slice(0, index)
  const match = text.slice(index, index + query.length)
  const after = text.slice(index + query.length)

  return (
    <>
      {before}
      <mark className="bg-yellow-200 dark:bg-yellow-700/50 text-inherit rounded px-0.5">
        {match}
      </mark>
      {after}
    </>
  )
}

/**
 * Single menu item component with recursive rendering for children
 * Supports expand/collapse, badges for exam relevance and recommendations
 */
export function MenuTreeItem({
  item,
  level,
  searchQuery,
  defaultExpanded = false,
}: MenuTreeItemProps) {
  const [manualExpanded, setManualExpanded] = useState(defaultExpanded)
  const itemRef = useRef<HTMLDivElement>(null)
  const hasChildren = item.children && item.children.length > 0
  const isLeafNode = !hasChildren
  const normalizedSearchQuery = searchQuery?.trim() ?? ''
  const searchMatches =
    normalizedSearchQuery.length > 0 ? itemMatchesSearch(item, normalizedSearchQuery) : false
  const isExpanded = manualExpanded || searchMatches

  const handleToggle = useCallback(() => {
    if (hasChildren) {
      setManualExpanded((prev) => !prev)
    }
  }, [hasChildren])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          handleToggle()
          break
        case 'ArrowRight':
          if (hasChildren && !isExpanded) {
            e.preventDefault()
            setManualExpanded(true)
          }
          break
        case 'ArrowLeft':
          if (hasChildren && isExpanded) {
            e.preventDefault()
            setManualExpanded(false)
          }
          break
      }
    },
    [handleToggle, hasChildren, isExpanded]
  )

  const paddingLeft = level * 20

  return (
    <div
      className="w-full"
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={false}
    >
      {/* Item header row */}
      <div
        ref={itemRef}
        className={cn(
          'group flex items-start gap-2 py-2 px-3 rounded-lg transition-colors cursor-pointer',
          'hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
          isLeafNode && 'hover:bg-muted/30'
        )}
        style={{ paddingLeft: `${paddingLeft + 12}px` }}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`${item.name}${hasChildren ? ', folder' : ''}`}
      >
        {/* Expand/collapse or folder icon */}
        <span className="shrink-0 mt-0.5">
          {hasChildren ? (
            isExpanded ? (
              <span className="flex items-center gap-1">
                <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
                <FolderOpen className="size-4 text-primary" aria-hidden="true" />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                <Folder className="size-4 text-muted-foreground" aria-hidden="true" />
              </span>
            )
          ) : (
            <span className="inline-block w-4" aria-hidden="true" />
          )}
        </span>

        {/* Item content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Item name */}
            <span className={cn('font-medium', hasChildren && 'text-foreground')}>
              <HighlightedText text={item.name} query={searchQuery} />
            </span>

            {/* Badges */}
            {item.examRelevant && (
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                title="Exam relevant"
              >
                <Star className="size-3" aria-hidden="true" />
                Exam
              </span>
            )}
            {item.recommendedValue && (
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                title={`Recommended: ${item.recommendedValue}`}
              >
                <Lightbulb className="size-3" aria-hidden="true" />
                Rec
              </span>
            )}
          </div>

          {/* Description - shown for leaf nodes or when expanded */}
          {(isLeafNode || isExpanded) && item.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              <HighlightedText text={item.description} query={searchQuery} />
            </p>
          )}

          {/* Default value and recommended value */}
          {isLeafNode && (item.defaultValue || item.recommendedValue) && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {item.defaultValue && (
                <span className="text-muted-foreground">
                  <span className="font-medium">Default:</span> {item.defaultValue}
                </span>
              )}
              {item.recommendedValue && (
                <span className="text-green-600 dark:text-green-400">
                  <span className="font-medium">Recommended:</span> {item.recommendedValue}
                </span>
              )}
            </div>
          )}

          {/* Exam tips */}
          {isLeafNode && item.examTips && (
            <div className="mt-2 flex gap-2 p-2 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <Lightbulb
                className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-medium text-amber-800 dark:text-amber-300">Exam Tip</p>
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  <HighlightedText text={item.examTips} query={searchQuery} />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Children with animation */}
      {hasChildren && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-200 ease-in-out',
            isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
          )}
          role="group"
          aria-label={`${item.name} submenu`}
        >
          {item.children!.map((child) => (
            <MenuTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              searchQuery={searchQuery}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================
// MenuTree Component
// ============================================================

interface MenuTreeProps {
  items: MenuItem[]
  className?: string
  showSearch?: boolean
  showRecommendedOnly?: boolean
}

/**
 * Checks if an item or any of its descendants matches the search query
 */
function itemMatchesSearch(item: MenuItem, query: string): boolean {
  const lowerQuery = query.toLowerCase().trim()

  // Check if this item matches
  const nameMatch = item.name.toLowerCase().includes(lowerQuery)
  const descMatch = item.description.toLowerCase().includes(lowerQuery)
  const examTipsMatch = item.examTips?.toLowerCase().includes(lowerQuery)

  if (nameMatch || descMatch || examTipsMatch) {
    return true
  }

  // Check if any children match
  if (item.children) {
    return item.children.some((child) => itemMatchesSearch(child, query))
  }

  return false
}

/**
 * Filters menu tree to only include items that match search query
 * Preserves parent items for context even if they don't match
 */
function filterMenuTree(items: MenuItem[], query: string): MenuItem[] {
  if (!query || query.trim().length === 0) {
    return items
  }

  return items
    .filter((item) => itemMatchesSearch(item, query))
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: filterMenuTree(item.children, query),
        }
      }
      return item
    })
}

/**
 * Filters menu tree to only include items with recommended values
 */
function filterRecommended(items: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = []

  for (const item of items) {
    const hasRecommendation = item.recommendedValue !== undefined
    const childrenWithRecommendations = item.children ? filterRecommended(item.children) : []

    // Include if has recommendation or has children with recommendations
    if (hasRecommendation || childrenWithRecommendations.length > 0) {
      result.push({
        ...item,
        children: childrenWithRecommendations.length > 0 ? childrenWithRecommendations : undefined,
      })
    }
  }

  return result
}

/**
 * Full menu tree component with search and filtering capabilities
 */
export function MenuTree({
  items,
  className,
  showSearch = true,
  showRecommendedOnly = false,
}: MenuTreeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showRecommended, setShowRecommended] = useState(showRecommendedOnly)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const treeRef = useRef<HTMLDivElement>(null)

  // Filter items based on search and recommended toggle
  const filteredItems = useMemo(() => {
    let filtered = items

    if (showRecommended) {
      filtered = filterRecommended(filtered)
    }

    if (searchQuery.trim().length > 0) {
      filtered = filterMenuTree(filtered, searchQuery)
    }

    return filtered
  }, [items, searchQuery, showRecommended])

  // Keyboard navigation for the tree
  const handleTreeKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const focusableItems = treeRef.current?.querySelectorAll('[tabindex="0"]')
      if (!focusableItems || focusableItems.length === 0) return

      const currentIndex = Array.from(focusableItems).findIndex(
        (el) => el === document.activeElement
      )

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = currentIndex < focusableItems.length - 1 ? currentIndex + 1 : 0
        ;(focusableItems[nextIndex] as HTMLElement).focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableItems.length - 1
        ;(focusableItems[prevIndex] as HTMLElement).focus()
      }
    }
  }, [])

  // Handle search input keyboard shortcuts
  const handleSearchKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchQuery('')
      searchInputRef.current?.blur()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const firstItem = treeRef.current?.querySelector('[tabindex="0"]') as HTMLElement
      firstItem?.focus()
    }
  }, [])

  const noResults = filteredItems.length === 0 && (searchQuery.trim().length > 0 || showRecommended)

  return (
    <div className={cn('w-full', className)}>
      {/* Search and filter controls */}
      {showSearch && (
        <div className="mb-4 space-y-3">
          {/* Search input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className={cn(
                'w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-input bg-background',
                'placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'transition-colors'
              )}
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <span className="text-xs">Clear</span>
              </button>
            )}
          </div>

          {/* Recommended filter toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showRecommended}
              onChange={(e) => setShowRecommended(e.target.checked)}
              className="size-4 rounded border-input text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className="text-sm text-muted-foreground">Show only recommended settings</span>
          </label>
        </div>
      )}

      {/* Tree view */}
      <div
        ref={treeRef}
        role="tree"
        aria-label="Menu tree"
        onKeyDown={handleTreeKeyDown}
        className="space-y-1"
      >
        {noResults ? (
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-sm">No menu items found</p>
            {searchQuery && (
              <p className="text-xs mt-1">Try a different search term or clear the filter</p>
            )}
          </div>
        ) : (
          filteredItems.map((item) => (
            <MenuTreeItem
              key={item.id}
              item={item}
              level={0}
              searchQuery={searchQuery}
              defaultExpanded={searchQuery.trim().length > 0}
            />
          ))
        )}
      </div>

      {/* Result count */}
      {searchQuery.trim().length > 0 && filteredItems.length > 0 && (
        <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
          {filteredItems.length} top-level {filteredItems.length === 1 ? 'item' : 'items'} found
        </div>
      )}
    </div>
  )
}
