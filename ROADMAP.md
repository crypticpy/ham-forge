# HamForge Roadmap

> Generated from PRD gap analysis on 2026-01-30

## Overview

This roadmap addresses all gaps identified between the current implementation and the PRD requirements. Phases are ordered by priority and dependency.

**Current Coverage: 52% of PRD requirements**
**Target: 95%+ coverage**

---

## Phase A: Question Pool Enrichment

**Goal:** Complete the question data layer with explanations and missing figures

### A.1 - Add Question Explanations

- [ ] Create `src/data/explanations/technician.ts` with explanations keyed by question ID
- [ ] Create `src/data/explanations/general.ts` with explanations keyed by question ID
- [ ] Update `getQuestionById` to merge explanation data
- [ ] Update ExplanationCard to display rich explanations (not just FCC refs)

### A.2 - Complete Figure Assets

- [ ] Audit all questions with `figure` field to identify missing images
- [ ] Source/create missing Technician figures (T4+)
- [ ] Source/create missing General figures (G1-G6, G8-G9)
- [ ] Verify all figure paths resolve correctly

### A.3 - Add Question Metadata Fields

- [ ] Add `relatedModules: string[]` field to question type
- [ ] Add `ic7300Relevance?: string` field to question type
- [ ] Create mapping file linking questions to modules
- [ ] Create mapping file linking questions to IC-7300 features

**Deliverables:** Rich explanations, complete figures, cross-reference metadata

---

## Phase B: Learning Module Expansion

**Goal:** Complete all 20 learning modules (10 Technician + 10 General)

### B.1 - Technician Modules (T2-T0)

- [ ] T2 - Operating Procedures
- [ ] T3 - Radio Wave Characteristics
- [ ] T4 - Amateur Radio Practices
- [ ] T5 - Electrical Principles
- [ ] T6 - Electronic and Electrical Components
- [ ] T7 - Practical Circuits
- [ ] T8 - Signals and Emissions
- [ ] T9 - Antennas and Feed Lines
- [ ] T0 - Safety

### B.2 - General Modules (G2-G0)

- [ ] G2 - Operating Procedures
- [ ] G3 - Radio Wave Propagation
- [ ] G4 - Amateur Radio Practices
- [ ] G5 - Electrical Principles
- [ ] G6 - Circuit Components
- [ ] G7 - Practical Circuits
- [ ] G8 - Signals and Emissions
- [ ] G9 - Antennas and Feed Lines
- [ ] G0 - Safety

### B.3 - Module Tracking Features

- [ ] Add `completedModules` to progress store
- [ ] Add `markModuleComplete(moduleId)` action
- [ ] Add `resetModuleProgress(moduleId)` action
- [ ] Show completion status on module cards
- [ ] Add "Mark Complete" button to module view

**Deliverables:** 20 complete learning modules with progress tracking

---

## Phase C: Practice Mode Enhancements

**Goal:** Complete all adaptive practice features from PRD

### C.1 - Filter by Topic Group

- [ ] Add group filter to FilterPanel (T1A, T1B, etc.)
- [ ] Update question scheduler to filter by group
- [ ] Show group breakdown in practice stats

### C.2 - Question Flagging in Practice

- [ ] Add `flaggedQuestions: Set<string>` to practice session state
- [ ] Add flag toggle button to QuestionCard in practice mode
- [ ] Add "Flagged Only" filter option
- [ ] Persist flagged questions in progress store

### C.3 - Confidence Tracking

- [ ] Add confidence selector after answering (1-5 scale)
- [ ] Store confidence history with attempts
- [ ] Factor confidence into spaced repetition algorithm
- [ ] Show confidence vs accuracy comparison in analytics

### C.4 - Quick Study Mode

- [ ] Add "5-Minute Study" button to practice page
- [ ] Create timed practice session (5 min countdown)
- [ ] Auto-complete session when time expires
- [ ] Show mini-summary at end

**Deliverables:** Group filtering, flagging, confidence tracking, quick study

---

## Phase D: IC-7300 Integration Expansion

**Goal:** Complete IC-7300 reference features per PRD

### D.1 - Interactive Front Panel

- [ ] Create SVG/image of IC-7300 front panel
- [ ] Add clickable hotspots for each control
- [ ] Link hotspots to control detail cards
- [ ] Mobile-friendly touch interaction

### D.2 - Menu System Guide

- [ ] Document IC-7300 menu hierarchy
- [ ] Create expandable menu tree component
- [ ] Add search within menu items
- [ ] Include recommended settings for new operators

### D.3 - Mode Operation Guides

- [ ] Expand SSB guide (setup, operation, tips)
- [ ] Expand CW guide (setup, keying, filters)
- [ ] Expand FM guide (repeaters, CTCSS/DCS)
- [ ] Add digital modes guide (FT8, JS8, etc.)
- [ ] Add AM guide

### D.4 - Additional Guides

- [ ] Spectrum scope usage guide
- [ ] Filter configuration guide
- [ ] Memory channel programming guide
- [ ] Antenna tuner usage guide

### D.5 - Question Cross-References

- [ ] Create question→control mapping data
- [ ] Add "Related IC-7300 Features" section to question review
- [ ] Add "Related Exam Questions" section to control cards
- [ ] Bidirectional navigation between content

**Deliverables:** Interactive panel, menu guide, mode guides, cross-references

---

## Phase E: Dashboard & UX Polish

**Goal:** Complete dashboard features and UX improvements

### E.1 - Data Export

- [ ] Add "Export Progress" button to settings/dashboard
- [ ] Export as JSON (progress, exam history, streaks)
- [ ] Add "Import Progress" functionality
- [ ] Add data backup reminder after milestones

### E.2 - Study Time Tracking

- [ ] Track session start/end times
- [ ] Calculate total study duration
- [ ] Show daily/weekly/monthly time charts
- [ ] Add to analytics page

### E.3 - Continue Where You Left Off

- [ ] Store last activity (page, question, module)
- [ ] Add "Continue" button to home/dashboard
- [ ] Show context (e.g., "Continue T5 Practice - Q12 of 25")
- [ ] Handle edge cases (deleted session, etc.)

### E.4 - Module Knowledge Checks

- [ ] Add mini-quiz component to module sections
- [ ] 3-5 questions from related question pool
- [ ] Must pass to mark section complete
- [ ] Track quiz attempts and scores

**Deliverables:** Data export, time tracking, continue feature, knowledge checks

---

## Phase F: Performance & Testing

**Goal:** Meet PRD performance and quality requirements

### F.1 - Performance Optimization

- [ ] Run Lighthouse audit
- [ ] Optimize bundle size (code splitting)
- [ ] Optimize image loading (next/image, lazy loading)
- [ ] Target: Performance score >90

### F.2 - Accessibility Audit

- [ ] Run Lighthouse accessibility audit
- [ ] Fix any identified issues
- [ ] Test with screen reader
- [ ] Target: Accessibility score >95

### F.3 - Test Coverage

- [ ] Add unit tests for spaced repetition algorithm
- [ ] Add unit tests for exam generator
- [ ] Add integration tests for practice flow
- [ ] Add integration tests for exam flow

**Deliverables:** Lighthouse scores >90/95, test suite

---

## Progress Tracking

| Phase                     | Status      | Completion |
| ------------------------- | ----------- | ---------- |
| A - Question Pool         | Complete    | 100%       |
| B - Learning Modules      | Complete    | 100%       |
| C - Practice Enhancements | Complete    | 100%       |
| D - IC-7300 Integration   | Not Started | 0%         |
| E - Dashboard & UX        | Not Started | 0%         |
| F - Performance & Testing | Not Started | 0%         |

---

## Notes

- Offline/PWA service worker deferred (acceptable per user)
- Extra class pool deferred (future consideration per PRD)
- Cloud sync deferred (future consideration per PRD)
- Audio mode deferred (future consideration per PRD)

---

_Last updated: 2026-01-30_

---

## Completed Work Log

### Phase A - Question Pool Enrichment (Completed 2026-01-30)

- Created 838 question explanations across 5 files
- Added explanation index with `getExplanation()` function
- Integrated explanations into question-scheduler.ts

### Phase B - Learning Modules (Completed 2026-01-30)

- Created 9 Technician modules (T2-T0): 31 sections total
- Created 9 General modules (G2-G0): 31 sections total
- Updated module indexes for both exam levels
- Added module completion tracking to progress store
- Added "Mark as Complete" and "Reset Progress" UI

### Phase C - Practice Enhancements (Completed 2026-01-30)

- **C.1 Group Filter**: Added topic group filtering (T1A, T1B, etc.)
  - New `getQuestionsByGroup()` and `getGroupsForSubelement()` functions
  - Updated FilterPanel with Topic Groups section
  - Updated session config and hook to support group filtering

- **C.2 Question Flagging**: Flag questions for later review
  - Added `flaggedQuestions` array to progress store
  - Created FlagButton component with toggle behavior
  - Added "Flagged Only" filter to FilterPanel with Switch toggle
  - Flags persist in localStorage

- **C.3 Confidence Tracking**: Rate confidence after answering
  - Created ConfidenceSelector component (1-5 scale)
  - Updated spaced repetition algorithm to factor confidence
  - High confidence + correct = bonus interval
  - Low confidence + correct = reduced interval (lucky guess)
  - High confidence + wrong = larger penalty (overconfidence)

- **C.4 Quick Study Mode**: 5-minute timed practice
  - Created QuickStudyTimer component with countdown
  - Added "5-Minute Quick Study" quick start option
  - Timer auto-completes session when time expires
  - Shows questions answered and average time per question
