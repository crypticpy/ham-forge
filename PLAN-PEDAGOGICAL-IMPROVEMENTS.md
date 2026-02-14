# Implementation Plan: Pedagogical Audit Recommendations

Created: January 31, 2026
Status: PENDING APPROVAL

## Summary

This plan implements all 7 recommendations from the pedagogical audit report to improve HamForge's educational effectiveness. The work spans a new Virtual QSO Trainer component, algorithm enhancements for interleaving, integrated skill tracking, new callout types, content audits for mnemonics/voice consistency, and streak freeze token functionality.

## Scope

### In Scope

1. **Recommendation #5** (Critical): Virtual QSO Trainer with simulated contact scenarios
2. **Recommendation #2** (High): Interleaving in flashcard card selection algorithm (30% cross-subelement mixing)
3. **Recommendation #4** (High): Skill mastery tracking integrated into progress model
4. **Recommendation #1** (Medium): "Exam Focus" callout type for learning modules
5. **Recommendation #3** (Medium): Mnemonic coverage audit and additions
6. **Recommendation #6** (Medium): Streak freeze tokens (earned through study)
7. **Recommendation #7** (Medium): Voice/tone consistency audit of flashcard content

### Out of Scope

- Changes to question pool content
- Changes to exam simulation mode
- New learning modules
- Mobile app specific changes
- General exam class content (focusing on Technician first)

## Prerequisites

- All existing tests passing
- Current build compiles without errors
- Familiarity with existing trainer component patterns

## Parallel Execution Strategy

Work is organized into 4 phases. Within each phase, independent workstreams execute in parallel via Opus sub-agents. File ownership is explicitly assigned to prevent conflicts.

### Workstream Analysis

| Phase | Workstream            | Agent Type     | Files Owned                                         | Dependencies   |
| ----- | --------------------- | -------------- | --------------------------------------------------- | -------------- |
| 1     | Algorithm Enhancement | Opus sub-agent | `flashcard-algorithm.ts`                            | None           |
| 1     | Callout System        | Opus sub-agent | `markdown-renderer.tsx`, learning module files      | None           |
| 1     | Store Enhancement     | Opus sub-agent | `flashcard-store.ts`, `progress-store.ts`           | None           |
| 2     | QSO Trainer           | Opus sub-agent | New: `qso-trainer.tsx`, `qso-trainer.test.ts`       | Phase 1 Store  |
| 2     | Skill Tracker UI      | Opus sub-agent | New: `skill-tracker.tsx`, dashboard changes         | Phase 1 Store  |
| 3     | Mnemonic Audit        | Opus sub-agent | `technician-learning-cards.ts`                      | None           |
| 3     | Voice/Tone Audit      | Opus sub-agent | `technician-learning-cards.ts` (different sections) | Mnemonic Audit |
| 4     | Testing & Integration | Opus sub-agent | Test files only                                     | All previous   |

### File Ownership Matrix

| File                                                           | Phase 1 Owner   | Phase 2 Owner  | Phase 3 Owner         |
| -------------------------------------------------------------- | --------------- | -------------- | --------------------- |
| `src/lib/flashcard-algorithm.ts`                               | Algorithm Agent | -              | -                     |
| `src/stores/flashcard-store.ts`                                | Store Agent     | -              | -                     |
| `src/stores/progress-store.ts`                                 | Store Agent     | -              | -                     |
| `src/components/features/learning/markdown-renderer.tsx`       | Callout Agent   | -              | -                     |
| `src/data/modules/technician/*.ts`                             | Callout Agent   | -              | -                     |
| `src/components/features/learning/interactive/qso-trainer.tsx` | -               | QSO Agent      | -                     |
| `src/components/features/dashboard/skill-tracker.tsx`          | -               | Skill UI Agent | -                     |
| `src/data/flashcards/technician-learning-cards.ts`             | -               | -              | Mnemonic/Voice Agents |
| `src/types/learning.ts`                                        | Callout Agent   | -              | -                     |

---

## Implementation Phases

### Phase 1: Foundation Enhancements

**Objective**: Enhance core algorithm, stores, and markdown system to support new features

**Parallel Tasks** (run simultaneously via Opus sub-agents):

#### Task 1A: Interleaving Algorithm Enhancement

**Owner**: Algorithm Agent
**Files**: `src/lib/flashcard-algorithm.ts`

Add interleaving to `selectCards()` function:

- After category-based selection, apply interleaving shuffle
- Ensure minimum 30% of cards come from different subelements than adjacent cards
- Add `INTERLEAVING_RATIO = 0.3` constant
- Implement `applyInterleaving()` function that:
  1. Groups selected cards by subelement
  2. Distributes cards using round-robin across subelements
  3. Falls back to random shuffle if single subelement

**Verification**:

```typescript
// Test: Session of 10 cards should have ≤7 consecutive same-subelement cards
```

#### Task 1B: "Exam Focus" Callout Type

**Owner**: Callout Agent
**Files**:

- `src/components/features/learning/markdown-renderer.tsx`
- `src/types/learning.ts` (if CalloutType exported)
- Select module files for initial usage

Add new callout type:

1. Add `examfocus` to calloutStyles object with magenta/pink theme
2. Add target/bullseye icon to calloutIcons
3. Update callout regex pattern: `(info|warning|tip|definition|formula|radio|examfocus)`
4. Add default title: "Exam Focus"
5. Add 2-3 example usages in T5 (Electrical Principles) module sections

**Verification**:

- Callout renders correctly in light/dark mode
- Syntax `:::examfocus` works with and without title

#### Task 1C: Store Enhancements for Skills & Streaks

**Owner**: Store Agent
**Files**:

- `src/stores/flashcard-store.ts`
- `src/stores/progress-store.ts`
- `src/types/flashcard.ts` (type additions)

Enhancements:

1. **Skill Tracking** in flashcard-store:
   - Add `skillProgress: Record<SkillType, SkillMastery>` to state
   - Define `SkillType = 'phonetic' | 'rst' | 'qso' | 'q-codes'`
   - Define `SkillMastery = { attempts: number, accuracy: number, lastPracticed: string, level: 1-5 }`
   - Add `updateSkillProgress(skill: SkillType, passed: boolean)` action
   - Add `getSkillLevel(skill: SkillType)` query

2. **Streak Freeze Tokens** in flashcard-store:
   - Add `freezeTokens: number` (max 2) to state
   - Add `freezeTokensEarned: number` (total earned)
   - Add `lastFreezeUsed: string | null`
   - Add `earnFreezeToken()` action (called when 7-day streak achieved)
   - Add `useFreezeToken()` action (auto-called when streak would break)
   - Modify `recordSession()` to auto-use freeze token if available and streak at risk

**Verification**:

- Freeze token caps at 2
- Token auto-consumed to preserve streak
- Skill progress persists across sessions

**Phase 1 Verification**:

- [ ] Build compiles without errors
- [ ] Interleaving distributes cards across subelements
- [ ] Exam Focus callout renders correctly
- [ ] Skill tracking stores persist

**Phase 1 Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 2: New Components

**Objective**: Build Virtual QSO Trainer and Skill Tracker UI components

**Parallel Tasks** (run simultaneously via Opus sub-agents):

#### Task 2A: Virtual QSO Trainer Component

**Owner**: QSO Agent
**Files**:

- New: `src/components/features/learning/interactive/qso-trainer.tsx`
- Update: `src/components/features/learning/interactive/index.ts`
- Update: `src/types/learning.ts` (add 'qso-trainer' to InteractiveComponentType)
- Update: `src/app/(study)/learn/[moduleId]/[sectionId]/page.tsx` (add to componentMap)

Features:

1. **Two Modes**: Learn (reference) and Practice (scenarios)
2. **Scenario Types**:
   - Basic CQ call (proper phonetics, listen-ask-verify-call)
   - Signal report exchange (RST format)
   - Frequency etiquette ("Is this frequency in use?")
   - QSL confirmation
3. **Scenario Structure**:
   ```typescript
   interface QSOScenario {
     id: string
     type: 'cq' | 'report' | 'etiquette' | 'qsl'
     setup: string // Context for the user
     expectedActions: string[] // What user should do
     correctResponses: string[] // Acceptable answers
     feedback: { correct: string; incorrect: string }
   }
   ```
4. **UI Elements**:
   - Simulated radio display showing frequency
   - User input area (callsign entry, signal report, etc.)
   - Step-by-step guidance in learn mode
   - Score tracking (correct/total)
   - Feedback after each scenario
5. **Integration**:
   - Call `updateSkillProgress('qso', passed)` after each scenario
   - Audio pronunciation for callsigns (reuse from PhoneticTrainer)

**Verification**:

- Renders in T2A (Operating Procedures) section
- Scores persist within session
- Updates skill store correctly

#### Task 2B: Skill Tracker Dashboard Component

**Owner**: Skill UI Agent
**Files**:

- New: `src/components/features/dashboard/skill-tracker.tsx`
- Update: `src/app/(study)/dashboard/page.tsx` (add SkillTracker to insights section)

Features:

1. **Visual Display**:
   - 4 skill cards (Phonetic, RST, QSO, Q-Codes)
   - Each shows: Level (1-5 stars), Accuracy %, Last practiced
   - Progress bar to next level
2. **Level Thresholds**:
   - Level 1: < 10 attempts
   - Level 2: 10+ attempts, 60%+ accuracy
   - Level 3: 25+ attempts, 75%+ accuracy
   - Level 4: 50+ attempts, 85%+ accuracy
   - Level 5: 100+ attempts, 90%+ accuracy
3. **Quick Practice Links**: Button to jump to each trainer
4. **Streak Freeze Display**:
   - Show current freeze tokens (0-2)
   - "Protected" badge if tokens available
   - Subtle note on how to earn more

**Verification**:

- Renders on dashboard
- Skill levels update when trainers used
- Freeze tokens display correctly

**Phase 2 Verification**:

- [ ] QSO Trainer renders and functions
- [ ] Skill Tracker displays on dashboard
- [ ] Skills update when trainers used
- [ ] Freeze tokens display and function

**Phase 2 Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 3: Content Audits & Enhancements

**Objective**: Audit and improve flashcard content quality

**Sequential Tasks** (mnemonic first, then voice audit):

#### Task 3A: Mnemonic Coverage Audit

**Owner**: Mnemonic Agent
**Files**: `src/data/flashcards/technician-learning-cards.ts`

Process:

1. Identify all 25 cards WITHOUT mnemonics
2. Prioritize cards for:
   - Frequently confused pairs (ARES/RACES already has one - verify others)
   - Calculation formulas (Ohm's Law, power, wavelength)
   - Procedural steps (CQ calling, frequency checking)
   - FCC regulations (identification, power limits)
3. Add mnemonics following existing patterns:
   - Acronym expansions
   - Rhymes or rhythms
   - Visual associations
   - Wordplay (e.g., "ARES helps Anyone, RACES is for Real emergencies")
4. Target: Add mnemonics to at least 15 additional cards (bringing total from 12 to 27+)

**Cards to prioritize** (from audit):

- T5D cards (Ohm's Law calculations) - need formula mnemonics
- T0A/T0B cards (Safety) - need procedural memory aids
- T1 cards (Regulations) - need distinction helpers
- T3 cards (Propagation) - need frequency/layer associations

#### Task 3B: Voice/Tone Consistency Audit

**Owner**: Voice Agent
**Files**: `src/data/flashcards/technician-learning-cards.ts` (AFTER mnemonic audit)

Process:

1. Review all 37 cards for voice consistency
2. Establish voice guidelines:
   - **Explanations**: Authoritative, direct, technical-but-accessible
   - **Key Facts**: Concise, emphatic, capitalization for emphasis
   - **Exam Tips**: Practical, insider-knowledge tone
   - **Mnemonics**: Playful but never juvenile
3. Identify inconsistencies:
   - Overly casual phrasing ("Just remember...")
   - Inconsistent capitalization patterns
   - Exclamation mark overuse
   - Passive voice where active preferred
4. Fix inconsistencies while preserving content accuracy
5. Ensure all `examTip` fields present (currently 23/37 have them - add remaining 14)

**Phase 3 Verification**:

- [ ] At least 15 new mnemonics added
- [ ] Voice is consistent across all cards
- [ ] All cards have examTip fields
- [ ] No content accuracy issues introduced

**Phase 3 Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 4: Testing & Integration

**Objective**: Verify all components work together, add tests, final polish

**Parallel Tasks**:

#### Task 4A: Algorithm Tests

**Owner**: Test Agent A
**Files**: New: `src/__tests__/lib/flashcard-algorithm.test.ts`

Tests:

- `calculateCategoryWeights()` returns expected weights
- `allocateSlots()` respects MAX_CATEGORY_WEIGHT cap
- `selectCards()` with interleaving distributes cards correctly
- Interleaving ratio is approximately 30%

#### Task 4B: Component Tests

**Owner**: Test Agent B
**Files**:

- New: `src/__tests__/components/qso-trainer.test.tsx`
- New: `src/__tests__/components/skill-tracker.test.tsx`

Tests:

- QSO Trainer renders scenarios
- QSO Trainer updates skill progress on completion
- Skill Tracker displays correct levels
- Streak freeze tokens display correctly

#### Task 4C: Integration Verification

**Owner**: Integration Agent
**Files**: None (verification only)

Verify:

1. Full study session flow: Flashcards → Questions → Results
2. Interleaving visible in card sequence
3. Trainer → Skill progress → Dashboard display flow
4. Streak freeze auto-consumption when streak at risk
5. Exam Focus callouts render in learning modules
6. Build compiles, no TypeScript errors

**Phase 4 Verification**:

- [ ] All new tests pass
- [ ] Integration flows work end-to-end
- [ ] No regressions in existing functionality

**Phase 4 Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

## Final Deliverable Review

**MANDATORY**: After all phases complete, run both review agents on the ENTIRE deliverable:

1. **`final-review-completeness`** - Full codebase scan for:
   - Incomplete implementations
   - TODO/FIXME comments left behind
   - Placeholder content
   - Missing error handling
   - Unused imports/variables

2. **`principal-code-reviewer`** - Comprehensive quality assessment:
   - Code patterns match existing codebase
   - TypeScript types are complete
   - Accessibility requirements met
   - Performance considerations
   - Security best practices

---

## Testing Strategy

### Unit Tests (New)

- `flashcard-algorithm.test.ts`: Interleaving logic
- `qso-trainer.test.tsx`: Component rendering and scoring
- `skill-tracker.test.tsx`: Level calculation and display

### Integration Tests

- Full session flow with interleaving verification
- Skill progress updates across components

### Manual Testing

- [ ] Create flashcard session, verify card interleaving
- [ ] Use QSO Trainer, verify skill progress updates
- [ ] Check dashboard shows skill levels
- [ ] Verify streak freeze auto-consumption
- [ ] View learning module with Exam Focus callouts
- [ ] Test all features in light/dark mode
- [ ] Test on mobile viewport

---

## Rollback Plan

If issues arise after implementation:

1. **Phase-level rollback**: Each phase is independently revertable via git
2. **Feature flags**: Consider adding `ENABLE_INTERLEAVING` and `ENABLE_SKILL_TRACKING` flags for gradual rollout
3. **Store reset**: Add `resetSkillProgress()` and `resetFreezeTokens()` actions for user data reset

Git strategy:

```bash
# If Phase 2 needs rollback:
git revert <phase-2-commit-hash>
```

---

## Risks and Mitigations

| Risk                                                  | Likelihood | Impact | Mitigation                                                |
| ----------------------------------------------------- | ---------- | ------ | --------------------------------------------------------- |
| Interleaving reduces category targeting effectiveness | Low        | Medium | Make interleaving configurable; monitor user feedback     |
| QSO Trainer scenarios too complex                     | Medium     | Low    | Start with 5-6 simple scenarios; expand based on feedback |
| Mnemonic additions feel forced                        | Low        | Low    | Peer review before merge; maintain existing quality bar   |
| Streak freeze creates unintended behavior             | Low        | Medium | Comprehensive testing of edge cases (midnight, timezone)  |
| File conflicts between agents                         | Med        | High   | Clear file ownership matrix; phase gates                  |

---

## Open Questions

1. **Interleaving ratio**: Should 30% be configurable by user? (Currently: No, fixed at 30%)
2. **QSO Trainer audio**: Should we include Web Speech API pronunciation? (Currently: Yes, reuse from PhoneticTrainer)
3. **Freeze token earning**: Should tokens require consecutive days or just total study days? (Currently: Consecutive 7-day streak)
4. **General exam class**: Should Phase 3 content audit also cover General cards? (Currently: Out of scope, Technician only)

---

## Estimated Effort

| Phase   | Parallel Tasks      | Sequential Dependencies        |
| ------- | ------------------- | ------------------------------ |
| Phase 1 | 3 tasks in parallel | None                           |
| Phase 2 | 2 tasks in parallel | Requires Phase 1 store changes |
| Phase 3 | 2 tasks sequential  | None (content only)            |
| Phase 4 | 3 tasks in parallel | Requires all previous phases   |

---

**USER: Please review this plan. Edit any section directly, then confirm to proceed.**
