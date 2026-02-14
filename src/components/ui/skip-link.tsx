'use client'

/**
 * Skip Link Component
 *
 * Provides keyboard users and screen reader users a way to skip
 * directly to the main content, bypassing navigation elements.
 *
 * WCAG 2.1 AA Requirement: 2.4.1 Bypass Blocks
 *
 * Usage: Place at the very top of the page layout, before any navigation.
 * The target element should have id="main-content".
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:min-h-[44px] focus:px-4 focus:py-2.5 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:shadow-lg"
    >
      Skip to main content
    </a>
  )
}
