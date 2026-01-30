import { SiteHeader } from '@/components/layout/site-header'

/**
 * Study Route Group Layout
 *
 * This layout wraps all study-related pages (practice, exam, learn, dashboard, radio)
 * and provides:
 * - Main content landmark with proper id for skip link target
 * - Semantic HTML structure for assistive technologies
 *
 * Accessibility Notes:
 * - The SkipLink is provided by the root layout (first focusable element in DOM)
 * - main#main-content serves as the skip link target (WCAG 2.4.1 Bypass Blocks)
 * - tabIndex={-1} on main allows programmatic focus without adding to tab order
 * - The SiteHeader provides the navigation landmark
 */
export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="pt-14 outline-none focus:outline-none"
        aria-label="Main content"
      >
        {children}
      </main>
    </>
  )
}
