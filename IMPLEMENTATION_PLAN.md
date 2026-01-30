# Implementation Plan: HamForge Amateur Radio Study Platform

Created: 2026-01-29
Status: PENDING APPROVAL

## Summary

Build a Progressive Web App for FCC Amateur Radio exam preparation (Technician & General) with IC-7300 radio integration. The platform features adaptive spaced repetition learning, practice exams, progress tracking, and offline-first functionality. Deployed on Vercel with Next.js 15, shadcn/ui, Zustand, and Dexie.js.

## Scope

### In Scope

- Next.js 15 App Router PWA with full offline support
- Technician (2022-2026) and General (2023-2027) question pools
- Spaced repetition algorithm (SM-2) for adaptive learning
- Practice mode with immediate feedback
- Timed practice examinations (35 questions)
- Progress dashboard with subelement heatmap
- IC-7300 MK2 reference modules
- Mobile-first responsive design with dark mode default
- IndexedDB persistence via Dexie.js
- Vercel deployment

### Out of Scope

- Extra class exam pool (future consideration)
- Cloud sync/user accounts (future consideration)
- Audio/voice mode (future consideration)
- Social features (future consideration)
- Other radio models (future consideration)

## Prerequisites

- Node.js 18+ installed
- GitHub repo created (done: https://github.com/crypticpy/ham-forge)
- Vercel account for deployment
- Question pool JSON data sources identified

## Parallel Execution Strategy

This plan maximizes parallel execution by organizing work into independent workstreams with clear file ownership. Each phase contains tasks that can run simultaneously via Opus sub-agents.

### Workstream Analysis

| Workstream          | Agent Type     | Files Owned                                                          | Dependencies        |
| ------------------- | -------------- | -------------------------------------------------------------------- | ------------------- |
| Core Infrastructure | Opus sub-agent | next.config.ts, package.json, tsconfig.json, tailwind.config.ts      | None                |
| UI Foundation       | Opus sub-agent | src/components/ui/\*, src/app/layout.tsx, globals.css                | Core Infrastructure |
| Data Layer          | Opus sub-agent | src/lib/db.ts, src/stores/_, src/types/_                             | Core Infrastructure |
| Question Pool       | Opus sub-agent | src/data/\*, question pool JSON files                                | None                |
| Practice Features   | Opus sub-agent | src/app/(study)/practice/_, src/components/features/practice/_       | UI, Data Layer      |
| Exam Features       | Opus sub-agent | src/app/(study)/exam/_, src/components/features/exam/_               | UI, Data Layer      |
| Dashboard Features  | Opus sub-agent | src/app/dashboard/_, src/components/features/dashboard/_             | UI, Data Layer      |
| IC-7300 Modules     | Opus sub-agent | src/app/radio/_, src/components/features/radio/_, src/data/ic7300/\* | UI Foundation       |
| PWA & Deployment    | Opus sub-agent | public/\*, manifest.ts, service worker                               | Core Infrastructure |

---

## Implementation Phases

### Phase 1: Foundation (MVP Core)

**Objective**: Scaffold Next.js 15 project with all dependencies, basic UI components, data layer, and question pool integration

#### Parallel Tasks (run simultaneously via Opus sub-agents)

**Task 1A: Project Scaffold & Configuration**

- Initialize Next.js 15 with App Router and TypeScript
- Configure Tailwind CSS and shadcn/ui
- Set up ESLint, Prettier
- Configure path aliases (@/\*)
- **Owns**: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `components.json`, `.eslintrc.json`, `.prettierrc`, `postcss.config.js`

**Task 1B: Question Pool Data Import**

- Download Technician pool JSON from russolsen/ham_radio_question_pool
- Download General pool JSON from russolsen/ham_radio_question_pool
- Download figure images (T-1, T-2, T-3, G7-1) from NCVEC
- Create TypeScript interfaces for question schema
- Validate and transform data to match our schema
- **Owns**: `src/data/pools/technician.json`, `src/data/pools/general.json`, `src/types/question.ts`, `public/figures/*`

**Task 1C: PWA Configuration**

- Create PWA manifest
- Set up service worker with Serwist
- Create PWA icons (192x192, 512x512, maskable)
- Configure offline caching strategy
- **Owns**: `src/app/manifest.ts`, `public/icons/*`, `public/sw.js`, `serwist.config.ts` (if needed)

#### Sequential Tasks (after parallel tasks complete)

**Task 1D: Core Layout & Navigation**

- Create root layout with providers
- Set up dark/light mode theming
- Create header with navigation
- Create bottom navigation for mobile
- Implement basic routing structure
- **Depends on**: 1A (shadcn/ui must be installed)
- **Owns**: `src/app/layout.tsx`, `src/app/globals.css`, `src/components/layout/*`, `src/app/page.tsx`

**Task 1E: Data Layer Setup**

- Set up Dexie.js database schema
- Create Zustand stores with persistence
- Implement store providers
- Add hydration handling for SSR
- **Depends on**: 1A (dependencies must be installed)
- **Owns**: `src/lib/db.ts`, `src/lib/utils.ts`, `src/stores/*`, `src/hooks/use-*.ts`

#### Files to Modify/Create

| File                                   | Purpose               | Owner |
| -------------------------------------- | --------------------- | ----- |
| `package.json`                         | Dependencies          | 1A    |
| `next.config.ts`                       | Next.js configuration | 1A    |
| `tsconfig.json`                        | TypeScript config     | 1A    |
| `tailwind.config.ts`                   | Tailwind config       | 1A    |
| `components.json`                      | shadcn/ui config      | 1A    |
| `src/types/question.ts`                | Question interfaces   | 1B    |
| `src/types/progress.ts`                | Progress interfaces   | 1B    |
| `src/data/pools/technician.json`       | Tech question pool    | 1B    |
| `src/data/pools/general.json`          | General question pool | 1B    |
| `public/figures/*.jpg`                 | Exam figures          | 1B    |
| `src/app/manifest.ts`                  | PWA manifest          | 1C    |
| `public/icons/*`                       | PWA icons             | 1C    |
| `src/app/layout.tsx`                   | Root layout           | 1D    |
| `src/app/globals.css`                  | Global styles         | 1D    |
| `src/components/layout/header.tsx`     | Header component      | 1D    |
| `src/components/layout/mobile-nav.tsx` | Bottom nav            | 1D    |
| `src/lib/db.ts`                        | Dexie database        | 1E    |
| `src/stores/study-store.ts`            | Study state           | 1E    |
| `src/stores/progress-store.ts`         | Progress state        | 1E    |
| `src/stores/providers.tsx`             | Store providers       | 1E    |

#### Phase Verification

- [ ] `npm run dev` starts without errors
- [ ] App is accessible at localhost:3000
- [ ] Dark mode toggles correctly
- [ ] Question pool JSON loads successfully
- [ ] PWA is installable (check Chrome DevTools > Application)
- [ ] Lighthouse PWA score > 80

#### Phase Review Gate

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 2: Practice Mode & Core Study Features

**Objective**: Implement adaptive practice mode with spaced repetition, question display, and basic progress tracking

#### Parallel Tasks

**Task 2A: Question Display Components**

- Create QuestionCard component with answer options
- Create AnswerButton component with correct/incorrect states
- Create FigureDisplay component for diagrams
- Create ExplanationCard for post-answer explanations
- Implement answer randomization
- **Owns**: `src/components/features/practice/question-card.tsx`, `src/components/features/practice/answer-button.tsx`, `src/components/features/practice/figure-display.tsx`, `src/components/features/practice/explanation-card.tsx`

**Task 2B: Spaced Repetition Algorithm**

- Implement SM-2 algorithm
- Create question scheduling logic
- Implement "due for review" queries
- Create progress recording functions
- **Owns**: `src/lib/spaced-repetition.ts`, `src/lib/question-scheduler.ts`

**Task 2C: Practice Mode UI Shell**

- Create practice mode page layout
- Implement subelement/topic filters
- Create session configuration (exam type, mode)
- Build practice session header with progress indicator
- **Owns**: `src/app/(study)/practice/page.tsx`, `src/app/(study)/practice/layout.tsx`, `src/components/features/practice/practice-header.tsx`, `src/components/features/practice/filter-panel.tsx`

#### Sequential Tasks

**Task 2D: Practice Session Logic**

- Integrate question display with spaced repetition
- Implement answer submission and feedback
- Save progress to IndexedDB
- Handle session completion
- **Depends on**: 2A, 2B, 2C
- **Owns**: `src/hooks/use-practice-session.ts`, `src/app/(study)/practice/[sessionId]/page.tsx`

#### Files to Create

| File                                                    | Purpose            | Owner |
| ------------------------------------------------------- | ------------------ | ----- |
| `src/components/features/practice/question-card.tsx`    | Question display   | 2A    |
| `src/components/features/practice/answer-button.tsx`    | Answer option      | 2A    |
| `src/components/features/practice/figure-display.tsx`   | Figure images      | 2A    |
| `src/components/features/practice/explanation-card.tsx` | Explanations       | 2A    |
| `src/lib/spaced-repetition.ts`                          | SM-2 algorithm     | 2B    |
| `src/lib/question-scheduler.ts`                         | Question selection | 2B    |
| `src/app/(study)/practice/page.tsx`                     | Practice landing   | 2C    |
| `src/app/(study)/practice/layout.tsx`                   | Practice layout    | 2C    |
| `src/components/features/practice/practice-header.tsx`  | Session header     | 2C    |
| `src/components/features/practice/filter-panel.tsx`     | Topic filters      | 2C    |
| `src/hooks/use-practice-session.ts`                     | Session hook       | 2D    |
| `src/app/(study)/practice/session/page.tsx`             | Active session     | 2D    |

#### Phase Verification

- [ ] Can start a practice session for Technician or General
- [ ] Questions display with all 4 answer options (randomized)
- [ ] Correct/incorrect feedback shows immediately
- [ ] Figures display for questions that reference them
- [ ] Progress saves to IndexedDB
- [ ] Spaced repetition schedules reviews correctly

#### Phase Review Gate

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 3: Practice Examinations

**Objective**: Implement realistic exam simulation matching VE exam conditions

#### Parallel Tasks

**Task 3A: Exam Question Selection**

- Implement official exam selection algorithm (1 question per group per subelement)
- Create exam generator for Technician (35 questions from 35 groups)
- Create exam generator for General (35 questions from 35 groups)
- **Owns**: `src/lib/exam-generator.ts`

**Task 3B: Exam UI Components**

- Create exam timer component
- Create question navigator (dots/numbers to jump between)
- Create exam progress bar
- Create exam results card
- Create subelement breakdown chart
- **Owns**: `src/components/features/exam/exam-timer.tsx`, `src/components/features/exam/question-navigator.tsx`, `src/components/features/exam/exam-progress.tsx`, `src/components/features/exam/results-card.tsx`, `src/components/features/exam/subelement-chart.tsx`

**Task 3C: Exam History & Storage**

- Create exam history schema for IndexedDB
- Implement exam save/load functions
- Create exam history list component
- **Owns**: `src/lib/exam-storage.ts`, `src/components/features/exam/exam-history.tsx`

#### Sequential Tasks

**Task 3D: Exam Mode Page**

- Create exam configuration page
- Implement exam session page with all components
- Build exam review mode
- Integrate exam completion and scoring
- **Depends on**: 3A, 3B, 3C
- **Owns**: `src/app/(study)/exam/page.tsx`, `src/app/(study)/exam/[examId]/page.tsx`, `src/app/(study)/exam/[examId]/review/page.tsx`

#### Files to Create

| File                                                  | Purpose            | Owner |
| ----------------------------------------------------- | ------------------ | ----- |
| `src/lib/exam-generator.ts`                           | Question selection | 3A    |
| `src/components/features/exam/exam-timer.tsx`         | Timer display      | 3B    |
| `src/components/features/exam/question-navigator.tsx` | Question nav       | 3B    |
| `src/components/features/exam/exam-progress.tsx`      | Progress bar       | 3B    |
| `src/components/features/exam/results-card.tsx`       | Final results      | 3B    |
| `src/components/features/exam/subelement-chart.tsx`   | Breakdown          | 3B    |
| `src/lib/exam-storage.ts`                             | Exam persistence   | 3C    |
| `src/components/features/exam/exam-history.tsx`       | History list       | 3C    |
| `src/app/(study)/exam/page.tsx`                       | Exam landing       | 3D    |
| `src/app/(study)/exam/[examId]/page.tsx`              | Active exam        | 3D    |
| `src/app/(study)/exam/[examId]/review/page.tsx`       | Exam review        | 3D    |

#### Phase Verification

- [ ] Can start a timed practice exam
- [ ] Exam has exactly 35 questions (one per group)
- [ ] Timer counts down and is visible
- [ ] Can navigate between questions
- [ ] Can submit exam and see pass/fail result
- [ ] Results show per-subelement breakdown
- [ ] Review mode allows seeing all questions with explanations
- [ ] Exam history persists and displays correctly

#### Phase Review Gate

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 4: Progress Dashboard

**Objective**: Build comprehensive progress tracking with visualizations and statistics

#### Parallel Tasks

**Task 4A: Dashboard Page & Layout**

- Create dashboard page layout
- Implement quick-action buttons (Continue Studying, Start Exam)
- Add study streak display
- **Owns**: `src/app/dashboard/page.tsx`, `src/app/dashboard/layout.tsx`

**Task 4B: Subelement Heatmap**

- Create heatmap visualization component
- Implement data aggregation for subelement performance
- Add tooltips with detailed stats
- **Owns**: `src/components/features/dashboard/subelement-heatmap.tsx`, `src/lib/progress-aggregator.ts`

**Task 4C: Statistics Components**

- Create exam readiness score calculator
- Build study streak tracker
- Create question coverage stats
- Build time investment tracker
- **Owns**: `src/components/features/dashboard/readiness-score.tsx`, `src/components/features/dashboard/study-streak.tsx`, `src/components/features/dashboard/coverage-stats.tsx`, `src/components/features/dashboard/time-tracker.tsx`, `src/lib/statistics.ts`

**Task 4D: Detailed Analytics Page**

- Create per-question performance view
- Build group/subelement drill-down
- Implement data export functionality
- **Owns**: `src/app/dashboard/analytics/page.tsx`, `src/components/features/dashboard/question-performance.tsx`, `src/lib/data-export.ts`

#### Files to Create

| File                                                         | Purpose              | Owner |
| ------------------------------------------------------------ | -------------------- | ----- |
| `src/app/dashboard/page.tsx`                                 | Dashboard home       | 4A    |
| `src/app/dashboard/layout.tsx`                               | Dashboard layout     | 4A    |
| `src/components/features/dashboard/subelement-heatmap.tsx`   | Performance heatmap  | 4B    |
| `src/lib/progress-aggregator.ts`                             | Data aggregation     | 4B    |
| `src/components/features/dashboard/readiness-score.tsx`      | Exam readiness       | 4C    |
| `src/components/features/dashboard/study-streak.tsx`         | Streak display       | 4C    |
| `src/components/features/dashboard/coverage-stats.tsx`       | Coverage stats       | 4C    |
| `src/components/features/dashboard/time-tracker.tsx`         | Time tracking        | 4C    |
| `src/lib/statistics.ts`                                      | Stats calculations   | 4C    |
| `src/app/dashboard/analytics/page.tsx`                       | Detailed analytics   | 4D    |
| `src/components/features/dashboard/question-performance.tsx` | Per-question stats   | 4D    |
| `src/lib/data-export.ts`                                     | Export functionality | 4D    |

#### Phase Verification

- [ ] Dashboard shows overall progress at a glance
- [ ] Subelement heatmap visualizes strengths/weaknesses
- [ ] Exam readiness score updates based on performance
- [ ] Study streak tracks consecutive days
- [ ] Can view detailed statistics per question
- [ ] Can export progress data

#### Phase Review Gate

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 5: Learning Modules

**Objective**: Create structured learning content with concept explanations and embedded practice

#### Parallel Tasks

**Task 5A: Module Data Structure**

- Define module content schema
- Create module content for all Technician subelements
- Create module content for all General subelements
- **Owns**: `src/types/module.ts`, `src/data/modules/technician/*.json`, `src/data/modules/general/*.json`

**Task 5B: Module Browser**

- Create module category browser
- Implement module list with progress indicators
- Add search/filter functionality
- **Owns**: `src/app/modules/page.tsx`, `src/components/features/modules/module-browser.tsx`, `src/components/features/modules/module-card.tsx`

**Task 5C: Module Viewer Components**

- Create concept display component
- Create visual aid display component
- Create IC-7300 relevance callout component
- Create embedded quiz component
- **Owns**: `src/components/features/modules/concept-display.tsx`, `src/components/features/modules/visual-aid.tsx`, `src/components/features/modules/radio-callout.tsx`, `src/components/features/modules/embedded-quiz.tsx`

#### Sequential Tasks

**Task 5D: Module Viewer Page**

- Create module viewer page
- Implement progress tracking through modules
- Connect modules to related questions
- **Depends on**: 5A, 5B, 5C
- **Owns**: `src/app/modules/[moduleId]/page.tsx`, `src/hooks/use-module-progress.ts`

#### Files to Create

| File                                                  | Purpose                | Owner |
| ----------------------------------------------------- | ---------------------- | ----- |
| `src/types/module.ts`                                 | Module interfaces      | 5A    |
| `src/data/modules/technician/*.json`                  | Tech module content    | 5A    |
| `src/data/modules/general/*.json`                     | General module content | 5A    |
| `src/app/modules/page.tsx`                            | Module browser         | 5B    |
| `src/components/features/modules/module-browser.tsx`  | Browser component      | 5B    |
| `src/components/features/modules/module-card.tsx`     | Module card            | 5B    |
| `src/components/features/modules/concept-display.tsx` | Concept viewer         | 5C    |
| `src/components/features/modules/visual-aid.tsx`      | Visual aids            | 5C    |
| `src/components/features/modules/radio-callout.tsx`   | IC-7300 callouts       | 5C    |
| `src/components/features/modules/embedded-quiz.tsx`   | Inline quizzes         | 5C    |
| `src/app/modules/[moduleId]/page.tsx`                 | Module page            | 5D    |
| `src/hooks/use-module-progress.ts`                    | Module progress        | 5D    |

#### Phase Verification

- [ ] Can browse all learning modules by category
- [ ] Module cards show completion status
- [ ] Module content displays concepts before questions
- [ ] Visual aids and diagrams render correctly
- [ ] IC-7300 relevance shows where applicable
- [ ] Embedded quizzes work within modules
- [ ] Progress saves when module completed

#### Phase Review Gate

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 6: IC-7300 Integration

**Objective**: Build dedicated IC-7300 MK2 reference and operation guides

#### Parallel Tasks

**Task 6A: IC-7300 Data & Content**

- Create front panel control data (buttons, knobs, displays)
- Create menu system hierarchy data
- Create mode operation guides (SSB, CW, AM, FM, digital)
- **Owns**: `src/data/ic7300/controls.json`, `src/data/ic7300/menus.json`, `src/data/ic7300/modes/*.json`

**Task 6B: Interactive Front Panel**

- Create front panel diagram component
- Implement clickable hotspots for controls
- Create control detail popup/drawer
- **Owns**: `src/components/features/radio/front-panel.tsx`, `src/components/features/radio/control-hotspot.tsx`, `src/components/features/radio/control-detail.tsx`, `public/images/ic7300-panel.svg`

**Task 6C: Menu System Guide**

- Create hierarchical menu browser
- Create setting detail view
- Implement search functionality
- **Owns**: `src/components/features/radio/menu-browser.tsx`, `src/components/features/radio/menu-item.tsx`, `src/components/features/radio/setting-detail.tsx`

**Task 6D: Mode Operation Guides**

- Create mode selector component
- Create step-by-step operation guides
- Create concept bridge links to exam questions
- **Owns**: `src/components/features/radio/mode-selector.tsx`, `src/components/features/radio/operation-guide.tsx`, `src/components/features/radio/concept-bridge.tsx`

#### Sequential Tasks

**Task 6E: IC-7300 Reference Pages**

- Create main IC-7300 reference page
- Create front panel page
- Create menu system page
- Create mode operation pages
- Add search across all radio content
- **Depends on**: 6A, 6B, 6C, 6D
- **Owns**: `src/app/radio/page.tsx`, `src/app/radio/panel/page.tsx`, `src/app/radio/menus/page.tsx`, `src/app/radio/modes/[mode]/page.tsx`, `src/app/radio/layout.tsx`

#### Files to Create

| File                                                | Purpose             | Owner |
| --------------------------------------------------- | ------------------- | ----- |
| `src/data/ic7300/controls.json`                     | Control definitions | 6A    |
| `src/data/ic7300/menus.json`                        | Menu hierarchy      | 6A    |
| `src/data/ic7300/modes/*.json`                      | Mode guides         | 6A    |
| `public/images/ic7300-panel.svg`                    | Panel diagram       | 6B    |
| `src/components/features/radio/front-panel.tsx`     | Interactive panel   | 6B    |
| `src/components/features/radio/control-hotspot.tsx` | Clickable areas     | 6B    |
| `src/components/features/radio/control-detail.tsx`  | Control info        | 6B    |
| `src/components/features/radio/menu-browser.tsx`    | Menu navigation     | 6C    |
| `src/components/features/radio/menu-item.tsx`       | Menu item display   | 6C    |
| `src/components/features/radio/setting-detail.tsx`  | Setting info        | 6C    |
| `src/components/features/radio/mode-selector.tsx`   | Mode selection      | 6D    |
| `src/components/features/radio/operation-guide.tsx` | Step guides         | 6D    |
| `src/components/features/radio/concept-bridge.tsx`  | Exam links          | 6D    |
| `src/app/radio/page.tsx`                            | Radio landing       | 6E    |
| `src/app/radio/panel/page.tsx`                      | Panel page          | 6E    |
| `src/app/radio/menus/page.tsx`                      | Menus page          | 6E    |
| `src/app/radio/modes/[mode]/page.tsx`               | Mode pages          | 6E    |

#### Phase Verification

- [ ] Interactive front panel has clickable controls
- [ ] Clicking a control shows its function
- [ ] Menu system is browsable hierarchically
- [ ] Mode operation guides are step-by-step
- [ ] Cross-references link to related exam questions
- [ ] Search works across all radio content

#### Phase Review Gate

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 7: Polish & Deployment

**Objective**: Optimize performance, accessibility, and deploy to production

#### Parallel Tasks

**Task 7A: Performance Optimization**

- Implement code splitting and lazy loading
- Optimize images and assets
- Add loading skeletons throughout
- Run Lighthouse and fix issues
- **Owns**: Performance-related changes across app

**Task 7B: Accessibility Improvements**

- Add ARIA labels throughout
- Ensure keyboard navigation works
- Test with screen reader
- Fix color contrast issues
- Target Lighthouse accessibility > 95
- **Owns**: Accessibility-related changes across app

**Task 7C: Final UI Polish**

- Review and refine all UI components
- Ensure consistent spacing and typography
- Add micro-interactions and transitions
- Test responsive layouts (320px to 2560px)
- **Owns**: UI refinement changes across app

**Task 7D: Vercel Deployment**

- Configure Vercel project
- Set up environment variables
- Configure custom domain (if applicable)
- Set up preview deployments
- **Owns**: `vercel.json`, deployment configuration

#### Phase Verification

- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 95
- [ ] Lighthouse PWA score passes all checks
- [ ] App loads in < 3 seconds on 4G
- [ ] Full offline functionality works
- [ ] Responsive layout works 320px - 2560px
- [ ] Production deployment successful

#### Phase Review Gate

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

## Final Deliverable Review

**MANDATORY**: After all phases complete:

1. **`final-review-completeness`** - Full codebase scan for:
   - Incomplete implementations
   - TODO comments
   - Placeholder content
   - Mock data that should be real
   - Missing error handling

2. **`principal-code-reviewer`** - Comprehensive quality assessment:
   - Code quality and consistency
   - Security review
   - Performance patterns
   - Accessibility compliance
   - Best practices adherence

---

## Testing Strategy

### Unit Tests

- Spaced repetition algorithm (SM-2)
- Exam question selection
- Progress calculations
- Data transformations

### Integration Tests

- IndexedDB operations via Dexie
- Zustand store persistence
- Question pool loading

### E2E Tests (Playwright)

- Complete practice session flow
- Full exam session flow
- Dashboard interactions
- Offline functionality

### Manual Testing

- PWA installation on iOS, Android, Desktop
- Dark/Light mode switching
- All viewport sizes
- Keyboard navigation

---

## Rollback Plan

1. **Vercel**: Instant rollback via deployment history
2. **IndexedDB**: Version migration supports rollback
3. **Git**: All phases committed separately for easy revert

---

## Risks and Mitigations

| Risk                                  | Likelihood | Impact | Mitigation                                |
| ------------------------------------- | ---------- | ------ | ----------------------------------------- |
| Question pool format changes          | Low        | Medium | Validate JSON schema, abstract data layer |
| File conflict between parallel agents | Medium     | High   | Clear file ownership matrix in each phase |
| PWA caching issues                    | Medium     | Medium | Cache versioning, clear update strategy   |
| IndexedDB storage limits              | Low        | Medium | Implement data cleanup for old history    |
| Offline sync complexity               | Low        | High   | MVP is offline-only, no sync needed       |
| IC-7300 content accuracy              | Medium     | Low    | User can contribute corrections           |

---

## Open Questions

1. **Question pool licensing**: Should we attribute NCVEC for question pools? (Likely yes, per their terms)
2. **IC-7300 images**: Should we create custom SVG diagrams or use actual photos? (Recommend SVG for clarity)
3. **Analytics**: Should we add anonymous usage analytics? (Optional, user preference)
4. **Module content depth**: How detailed should concept explanations be? (Recommend concise, practical focus)

---

**USER: Please review this plan. Edit any section directly, then confirm to proceed.**
