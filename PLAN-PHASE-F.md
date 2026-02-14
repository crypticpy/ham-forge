# Implementation Plan: Phase F - Performance & Testing

Created: 2026-01-30
Status: PENDING APPROVAL

## Summary

Phase F implements the final roadmap items: performance optimization to achieve Lighthouse scores >90, accessibility improvements to reach >95, and a comprehensive test suite for the spaced repetition algorithm, exam generator, and user flows (practice/exam sessions).

## Scope

### In Scope

- F.1: Performance Optimization (Lighthouse Performance >90)
  - Run Lighthouse audit and document baseline
  - Configure Next.js for optimal bundle splitting
  - Implement `next/image` for all images
  - Add lazy loading for heavy components
  - Optimize bundle size with dynamic imports

- F.2: Accessibility Audit (Lighthouse Accessibility >95)
  - Run Lighthouse accessibility audit
  - Add `prefers-reduced-motion` support
  - Fix mobile menu ARIA attributes
  - Add `aria-live` regions for dynamic content
  - Test with screen reader (documented manual testing)

- F.3: Test Coverage
  - Set up Vitest testing framework
  - Unit tests for spaced repetition algorithm (100% function coverage)
  - Unit tests for exam generator (all functions)
  - Integration tests for practice session flow
  - Integration tests for exam session flow

### Out of Scope

- End-to-end testing with Playwright (future enhancement)
- Full visual regression testing
- Performance monitoring in production (APM)
- PWA/service worker implementation (deferred per roadmap)

## Prerequisites

- Node.js and npm installed
- All Phases A-E completed (verified)
- Development server can start successfully

## Parallel Execution Strategy

The three sub-features (F.1 Performance, F.2 Accessibility, F.3 Testing) are **largely independent** but have some shared concerns:

1. **F.1 and F.2** both involve configuration changes but target different files
2. **F.3** is completely independent - can run in full parallel
3. Within F.3, unit tests and integration tests can be written in parallel

### Workstream Analysis

| Workstream             | Agent Type     | Files Owned                                                 | Dependencies         |
| ---------------------- | -------------- | ----------------------------------------------------------- | -------------------- |
| F.1 Performance        | Opus sub-agent | next.config.ts, components/ui/image-\*.tsx                  | None                 |
| F.2 Accessibility      | Opus sub-agent | globals.css (a11y section), layout files, header.tsx        | None                 |
| F.3a Unit Tests        | Opus sub-agent | **tests**/lib/\*.test.ts, vitest.config.ts                  | Test framework setup |
| F.3b Integration Tests | Opus sub-agent | **tests**/hooks/_.test.ts, **tests**/integration/_.test.tsx | Test framework setup |

### File Ownership Matrix

| File                                                | F.1       | F.2               | F.3a           | F.3b |
| --------------------------------------------------- | --------- | ----------------- | -------------- | ---- |
| next.config.ts                                      | ✅        | -                 | -              | -    |
| package.json                                        | ✅ (deps) | -                 | ✅ (test deps) | -    |
| vitest.config.ts                                    | -         | -                 | ✅             | -    |
| src/app/globals.css                                 | -         | ✅ (a11y section) | -              | -    |
| src/components/layout/header.tsx                    | -         | ✅                | -              | -    |
| src/components/ui/optimized-image.tsx               | ✅        | -                 | -              | -    |
| src/components/features/practice/figure-display.tsx | ✅        | -                 | -              | -    |
| src/**tests**/lib/\*.test.ts                        | -         | -                 | ✅             | -    |
| src/**tests**/hooks/\*.test.ts                      | -         | -                 | -              | ✅   |

**Note**: package.json modifications need coordination - F.1 runs first (adds image deps if needed), then F.3a (adds test deps).

## Implementation Phases

### Phase 1: Test Framework Setup + Performance Baseline

**Objective**: Establish testing infrastructure and capture performance baseline

**Sequential Task** (must run first):

1. **Task 1.0**: Install Vitest and testing dependencies
   - Add vitest, @testing-library/react, @testing-library/dom, jsdom, @vitejs/plugin-react
   - Create vitest.config.ts
   - Add test scripts to package.json
   - Owns: `package.json`, `vitest.config.ts`

**Parallel Tasks** (run after 1.0):

1. **Task 1A**: Run Lighthouse audit and document baseline - Owns: `docs/LIGHTHOUSE-BASELINE.md` (new)
2. **Task 1B**: Create test utilities and setup file - Owns: `src/__tests__/setup.ts`, `src/__tests__/utils.ts`

**Files to Modify**:

- `package.json` - Add Vitest, testing-library dependencies - Owner: Task 1.0
- `vitest.config.ts` (new) - Vitest configuration - Owner: Task 1.0
- `src/__tests__/setup.ts` (new) - Test setup/globals - Owner: Task 1B
- `src/__tests__/utils.ts` (new) - Test utilities - Owner: Task 1B

**New Files to Create**:

- `vitest.config.ts` - Vitest configuration with jsdom, path aliases
- `src/__tests__/setup.ts` - Global test setup (mock localStorage, IndexedDB)
- `src/__tests__/utils.ts` - Render helpers, mock factories

**Phase Verification**:

- [ ] `npm run test` executes without errors
- [ ] Baseline Lighthouse scores documented

**Phase Review Gate**:

- [ ] Verify test framework runs
- [ ] Verify Lighthouse CLI works

---

### Phase 2: Unit Tests (Parallel with Phase 3)

**Objective**: Add comprehensive unit tests for core algorithms

**Parallel Tasks**:

1. **Task 2A**: Spaced repetition algorithm tests - Owns: `src/__tests__/lib/spaced-repetition.test.ts`
   - Test `calculateSM2()` for all quality ratings (0-5)
   - Test `processAnswer()` for correct/incorrect with various confidence levels
   - Test `calculateConfidenceAdjustment()` edge cases
   - Test `getMasteryStatus()` transitions
   - Test `isDue()` and `calculatePriority()`
   - Test `updateConfidenceHistory()` and `getAverageConfidence()`

2. **Task 2B**: Exam generator tests - Owns: `src/__tests__/lib/exam-generator.test.ts`
   - Test `getExamGroups()` returns correct groups for each exam level
   - Test `getQuestionsForGroup()` returns correct questions
   - Test `generateExam()` produces valid 35-question exams
   - Test `calculateExamResult()` computes correct pass/fail
   - Test `getExamConfig()` returns correct configuration

3. **Task 2C**: Question scheduler tests - Owns: `src/__tests__/lib/question-scheduler.test.ts`
   - Test `getQuestionPool()` loads correct pool
   - Test `getSubelements()` returns correct subelements
   - Test `getDueQuestions()` with mocked IndexedDB
   - Test `getNewQuestions()` filters correctly
   - Test `getPracticeQuestions()` respects limits and filters

**Files to Create**:

- `src/__tests__/lib/spaced-repetition.test.ts` - Owner: Task 2A
- `src/__tests__/lib/exam-generator.test.ts` - Owner: Task 2B
- `src/__tests__/lib/question-scheduler.test.ts` - Owner: Task 2C

**Phase Verification**:

- [ ] All unit tests pass
- [ ] Coverage report shows >90% for tested files

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 3: Performance Optimization (Parallel with Phase 2)

**Objective**: Achieve Lighthouse Performance score >90

**Parallel Tasks**:

1. **Task 3A**: Next.js configuration optimization - Owns: `next.config.ts`
   - Enable image optimization domains
   - Configure bundle analyzer (optional)
   - Add appropriate caching headers

2. **Task 3B**: Image optimization - Owns: `src/components/features/practice/figure-display.tsx`
   - Replace `<img>` with Next.js `<Image>` component
   - Add proper width/height or fill mode
   - Add loading="lazy" for below-fold images
   - Add priority for above-fold images

3. **Task 3C**: Code splitting with dynamic imports - Owns: `src/app/(study)/radio/panel/page.tsx`, `src/app/(study)/radio/menu/page.tsx`
   - Add `dynamic()` imports for heavy components (FrontPanel, MenuTree)
   - Add loading states for dynamic components

**Files to Modify**:

- `next.config.ts` - Add image optimization config - Owner: Task 3A
- `src/components/features/practice/figure-display.tsx` - Use next/image - Owner: Task 3B
- `src/app/(study)/radio/panel/page.tsx` - Dynamic import FrontPanel - Owner: Task 3C
- `src/app/(study)/radio/menu/page.tsx` - Dynamic import MenuTree - Owner: Task 3C

**Phase Verification**:

- [ ] Lighthouse Performance score >90
- [ ] No hydration errors in console
- [ ] Images load correctly with optimization

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 4: Accessibility Improvements (Parallel with Phase 2)

**Objective**: Achieve Lighthouse Accessibility score >95

**Parallel Tasks**:

1. **Task 4A**: Reduced motion support - Owns: `src/app/globals.css`
   - Add `@media (prefers-reduced-motion: reduce)` rules
   - Disable animations for spinner, transitions
   - Ensure essential animations still work (progress bars)

2. **Task 4B**: Mobile menu ARIA fixes - Owns: `src/components/layout/header.tsx`
   - Add `aria-expanded` to mobile menu toggle
   - Add `aria-controls` referencing menu ID
   - Add `aria-hidden` to menu when closed
   - Add Escape key handler to close menu

3. **Task 4C**: Live region announcements - Owns: `src/components/features/practice/question-card.tsx`, `src/components/features/exam/question-navigator.tsx`
   - Add `aria-live="polite"` for answer feedback
   - Add `aria-live` for question progress updates
   - Add `role="status"` for loading states

**Files to Modify**:

- `src/app/globals.css` - Add prefers-reduced-motion styles - Owner: Task 4A
- `src/components/layout/header.tsx` - Fix mobile menu ARIA - Owner: Task 4B
- `src/components/features/practice/question-card.tsx` - Add live regions - Owner: Task 4C

**Phase Verification**:

- [ ] Lighthouse Accessibility score >95
- [ ] Mobile menu announces state changes
- [ ] Animations respect reduced motion preference

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 5: Integration Tests

**Objective**: Add integration tests for practice and exam flows

**Parallel Tasks**:

1. **Task 5A**: Practice session hook tests - Owns: `src/__tests__/hooks/use-practice-session.test.ts`
   - Test session initialization with various configs
   - Test question loading and filtering
   - Test answer submission flow
   - Test session completion
   - Test Quick Study timer mode

2. **Task 5B**: Exam session hook tests - Owns: `src/__tests__/hooks/use-exam-session.test.ts`
   - Test exam generation and state initialization
   - Test answer selection and navigation
   - Test flagging functionality
   - Test timer countdown
   - Test exam submission and result calculation

3. **Task 5C**: Store tests - Owns: `src/__tests__/stores/progress-store.test.ts`
   - Test progress store actions
   - Test persistence to localStorage
   - Test streak calculations
   - Test module completion tracking

**Files to Create**:

- `src/__tests__/hooks/use-practice-session.test.ts` - Owner: Task 5A
- `src/__tests__/hooks/use-exam-session.test.ts` - Owner: Task 5B
- `src/__tests__/stores/progress-store.test.ts` - Owner: Task 5C

**Phase Verification**:

- [ ] All integration tests pass
- [ ] Mocked IndexedDB works correctly
- [ ] Timer tests use fake timers

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 6: Final Verification & Documentation

**Objective**: Verify all targets met and update roadmap

**Sequential Tasks**:

1. **Task 6A**: Run final Lighthouse audits
   - Performance score >90
   - Accessibility score >95
   - Document final scores

2. **Task 6B**: Run full test suite
   - All tests pass
   - Generate coverage report
   - Document coverage metrics

3. **Task 6C**: Update ROADMAP.md
   - Mark Phase F as Complete (100%)
   - Add completed work log entry
   - Update overall progress to 100%

**Files to Modify**:

- `ROADMAP.md` - Update Phase F status - Owner: Task 6C

**Phase Verification**:

- [ ] Lighthouse Performance >90
- [ ] Lighthouse Accessibility >95
- [ ] All tests pass
- [ ] ROADMAP shows 100% complete

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent on ENTIRE deliverable
- [ ] Run `principal-code-reviewer` agent on ENTIRE deliverable

---

## Final Deliverable Review

**MANDATORY**: After all phases complete, run both review agents on the ENTIRE deliverable:

1. `final-review-completeness` - Full codebase scan for incomplete items
2. `principal-code-reviewer` - Comprehensive quality assessment

## Testing Strategy

### Unit Tests (Vitest)

- `src/__tests__/lib/spaced-repetition.test.ts` - SM-2 algorithm
- `src/__tests__/lib/exam-generator.test.ts` - Exam generation
- `src/__tests__/lib/question-scheduler.test.ts` - Question selection

### Integration Tests (Vitest + Testing Library)

- `src/__tests__/hooks/use-practice-session.test.ts` - Practice flow
- `src/__tests__/hooks/use-exam-session.test.ts` - Exam flow
- `src/__tests__/stores/progress-store.test.ts` - State management

### Manual Testing

- Lighthouse audit in Chrome DevTools
- Screen reader testing (VoiceOver on macOS)
- Reduced motion preference testing

## Rollback Plan

- All changes are additive (new test files, new config)
- Performance optimizations can be reverted by removing `next/image` usage
- Accessibility additions are non-breaking
- Test files can be deleted without affecting runtime

## Risks and Mitigations

| Risk                                   | Likelihood | Impact | Mitigation                                        |
| -------------------------------------- | ---------- | ------ | ------------------------------------------------- |
| Vitest setup conflicts with Next.js    | Low        | Medium | Use official @vitejs/plugin-react                 |
| Dynamic imports cause hydration issues | Medium     | High   | Test thoroughly before finalizing                 |
| IndexedDB mocking complexity           | Medium     | Medium | Use fake-indexeddb library                        |
| File conflict between agents           | Med        | High   | Clear file ownership matrix above                 |
| Lighthouse scores vary by environment  | Medium     | Low    | Document baseline and final in CI-like conditions |

## Open Questions

1. Should we add a CI workflow for running tests? (Recommend: Yes, but defer to Phase G/future)
2. Should we add bundle analyzer for ongoing monitoring? (Recommend: Optional, can add if helpful)
3. What is the target browser support for accessibility testing? (Assume: Modern browsers, Safari VoiceOver)

---

**USER: Please review this plan. Edit any section directly, then confirm to proceed.**
