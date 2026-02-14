import { SiteHeader } from '@/components/layout/site-header'
import { StudyDelightFooter } from '@/components/layout/study-delight-footer'
import { TimeTrackingProvider } from '@/providers/time-tracking-provider'

/**
 * Study Route Group Layout
 *
 * This layout wraps all study-related pages (practice, exam, learn, dashboard, radio)
 * and provides:
 * - Main content landmark with proper id for skip link target
 * - Semantic HTML structure for assistive technologies
 * - Time tracking provider for study session duration
 *
 * Accessibility Notes:
 * - The SkipLink is provided by the root layout (first focusable element in DOM)
 * - main#main-content serves as the skip link target (WCAG 2.4.1 Bypass Blocks)
 * - tabIndex={-1} on main allows programmatic focus without adding to tab order
 * - The SiteHeader provides the navigation landmark
 */
export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <TimeTrackingProvider>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="pt-safe-header outline-none focus:outline-none relative overflow-x-clip"
        aria-label="Main content"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block" aria-hidden="true">
          <div className="study-ambient study-ambient-one" />
          <div className="study-ambient study-ambient-two" />
          <div className="study-ambient study-ambient-three" />
        </div>
        <div className="animate-fade-in">{children}</div>
        <StudyDelightFooter />
      </main>
    </TimeTrackingProvider>
  )
}
