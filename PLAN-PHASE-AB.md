# Implementation Plan: Phase A & B - Question Pool & Learning Modules

Created: 2026-01-30
Status: COMPLETED

## Summary

This plan implements Phase A (Question Pool Enrichment) and Phase B (Learning Module Expansion) from the ROADMAP. Phase A adds rich explanations to all 838 questions across Technician and General pools. Phase B creates 18 new learning modules (9 Technician, 9 General) and adds module completion tracking to the progress store.

## Scope

### In Scope

- Create explanation data files for all Technician questions (411 questions)
- Create explanation data files for all General questions (427 questions)
- Update question retrieval to merge explanations
- Create 9 Technician learning modules (T2-T0)
- Create 9 General learning modules (G2-G0)
- Add module completion tracking to progress store
- Add "Mark Complete" / "Reset" functionality to module UI

### Out of Scope

- Adding `relatedModules` field to questions (deferred - modules must exist first)
- Adding `ic7300Relevance` field to questions (deferred to Phase D)
- Question-to-radio cross-references (Phase D)
- Missing figure files (verified: all referenced figures exist)
- Knowledge check mini-quizzes within modules (Phase E)

## Prerequisites

- None - this builds on existing infrastructure

## Parallel Execution Strategy

Work is divided into independent workstreams that don't share files:

### Phase A (Question Pool)

- 4 parallel sub-agents create explanation files (split by subelement groups)
- 1 sub-agent updates question-scheduler to merge explanations

### Phase B (Learning Modules)

- 9 parallel sub-agents create Technician modules (T2-T0)
- 9 parallel sub-agents create General modules (G2-G0)
- 2 sub-agents update index files (after module creation)
- 1 sub-agent adds module tracking to progress store

### Workstream Analysis

| Workstream         | Agent Type | Files Owned                                             | Dependencies            |
| ------------------ | ---------- | ------------------------------------------------------- | ----------------------- |
| Explanations T1-T3 | Opus       | `src/data/explanations/technician-t1-t3.ts`             | None                    |
| Explanations T4-T6 | Opus       | `src/data/explanations/technician-t4-t6.ts`             | None                    |
| Explanations T7-T0 | Opus       | `src/data/explanations/technician-t7-t0.ts`             | None                    |
| Explanations G1-G5 | Opus       | `src/data/explanations/general-g1-g5.ts`                | None                    |
| Explanations G6-G0 | Opus       | `src/data/explanations/general-g6-g0.ts`                | None                    |
| Explanation Index  | Opus       | `src/data/explanations/index.ts`                        | After explanation files |
| Question Scheduler | Opus       | `src/lib/question-scheduler.ts`                         | After explanation index |
| Module T2          | Opus       | `src/data/modules/technician/operating-procedures.ts`   | None                    |
| Module T3          | Opus       | `src/data/modules/technician/radio-wave-propagation.ts` | None                    |
| Module T4          | Opus       | `src/data/modules/technician/amateur-practices.ts`      | None                    |
| Module T5          | Opus       | `src/data/modules/technician/electrical-principles.ts`  | None                    |
| Module T6          | Opus       | `src/data/modules/technician/circuit-components.ts`     | None                    |
| Module T7          | Opus       | `src/data/modules/technician/station-equipment.ts`      | None                    |
| Module T8          | Opus       | `src/data/modules/technician/modulation-signals.ts`     | None                    |
| Module T9          | Opus       | `src/data/modules/technician/antennas-feed-lines.ts`    | None                    |
| Module T0          | Opus       | `src/data/modules/technician/safety.ts`                 | None                    |
| Module G2          | Opus       | `src/data/modules/general/operating-procedures.ts`      | None                    |
| Module G3          | Opus       | `src/data/modules/general/radio-wave-propagation.ts`    | None                    |
| Module G4          | Opus       | `src/data/modules/general/amateur-practices.ts`         | None                    |
| Module G5          | Opus       | `src/data/modules/general/electrical-principles.ts`     | None                    |
| Module G6          | Opus       | `src/data/modules/general/circuit-components.ts`        | None                    |
| Module G7          | Opus       | `src/data/modules/general/practical-circuits.ts`        | None                    |
| Module G8          | Opus       | `src/data/modules/general/signals-emissions.ts`         | None                    |
| Module G9          | Opus       | `src/data/modules/general/antennas-feed-lines.ts`       | None                    |
| Module G0          | Opus       | `src/data/modules/general/safety.ts`                    | None                    |
| Tech Index         | Opus       | `src/data/modules/technician/index.ts`                  | After T modules         |
| General Index      | Opus       | `src/data/modules/general/index.ts`                     | After G modules         |
| Progress Store     | Opus       | `src/stores/progress-store.ts`                          | None                    |
| Module UI          | Opus       | `src/app/(study)/learn/[moduleId]/page.tsx`             | After progress store    |

---

## Implementation Phases

### Phase 1: Create Question Explanations (Parallel)

**Objective**: Generate educational explanations for all 838 questions

**Parallel Tasks** (run simultaneously via Opus sub-agents):

1. **Task 1A**: Create Technician explanations T1-T3 (137 questions)
   - Owns: `src/data/explanations/technician-t1-t3.ts`
   - Export: `Record<string, string>` keyed by question ID

2. **Task 1B**: Create Technician explanations T4-T6 (123 questions)
   - Owns: `src/data/explanations/technician-t4-t6.ts`

3. **Task 1C**: Create Technician explanations T7-T0 (151 questions)
   - Owns: `src/data/explanations/technician-t7-t0.ts`

4. **Task 1D**: Create General explanations G1-G5 (252 questions)
   - Owns: `src/data/explanations/general-g1-g5.ts`

5. **Task 1E**: Create General explanations G6-G0 (175 questions)
   - Owns: `src/data/explanations/general-g6-g0.ts`

**Explanation Format**:

```typescript
// Each file exports a Record<questionId, explanation>
export const explanationsT1T3: Record<string, string> = {
  T1A01: 'The Amateur Radio Service was created by the FCC...',
  T1A02: 'The FCC (Federal Communications Commission) is...',
  // ...
}
```

**Explanation Guidelines**:

- 1-3 sentences explaining WHY the correct answer is correct
- Focus on understanding, not memorization
- Include practical context where helpful
- Avoid simply restating the question/answer

**Files to Create**:

- `src/data/explanations/technician-t1-t3.ts`
- `src/data/explanations/technician-t4-t6.ts`
- `src/data/explanations/technician-t7-t0.ts`
- `src/data/explanations/general-g1-g5.ts`
- `src/data/explanations/general-g6-g0.ts`

**Phase Verification**:

- [ ] All 411 Technician questions have explanations
- [ ] All 427 General questions have explanations
- [ ] No TypeScript errors in explanation files

---

### Phase 2: Integrate Explanations into Question System (Sequential)

**Objective**: Make explanations available when questions are loaded

**Sequential Tasks**:

1. **Task 2A**: Create explanation index
   - Owns: `src/data/explanations/index.ts`
   - Merges all explanation files into single lookup function

2. **Task 2B**: Update question-scheduler to merge explanations
   - Modifies: `src/lib/question-scheduler.ts`
   - Add `getExplanation(questionId)` function
   - Modify `getQuestionPool()` to optionally merge explanations

**New Files to Create**:

- `src/data/explanations/index.ts`

**Files to Modify**:

- `src/lib/question-scheduler.ts` - Add explanation merging

**Phase Verification**:

- [ ] `getExplanation('T1A01')` returns the explanation
- [ ] Questions display explanations in ExplanationCard
- [ ] Build passes with no TypeScript errors

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 3: Create Technician Learning Modules (Parallel)

**Objective**: Create 9 Technician learning modules covering all remaining subelements

**Parallel Tasks** (9 sub-agents simultaneously):

1. **Task 3A**: T2 - Operating Procedures
   - Owns: `src/data/modules/technician/operating-procedures.ts`
   - Sections: T2A, T2B, T2C

2. **Task 3B**: T3 - Radio Wave Propagation
   - Owns: `src/data/modules/technician/radio-wave-propagation.ts`
   - Sections: T3A, T3B, T3C

3. **Task 3C**: T4 - Amateur Radio Practices
   - Owns: `src/data/modules/technician/amateur-practices.ts`
   - Sections: T4A, T4B

4. **Task 3D**: T5 - Electrical Principles
   - Owns: `src/data/modules/technician/electrical-principles.ts`
   - Sections: T5A, T5B, T5C, T5D

5. **Task 3E**: T6 - Circuit Components
   - Owns: `src/data/modules/technician/circuit-components.ts`
   - Sections: T6A, T6B, T6C, T6D

6. **Task 3F**: T7 - Station Equipment
   - Owns: `src/data/modules/technician/station-equipment.ts`
   - Sections: T7A, T7B, T7C, T7D

7. **Task 3G**: T8 - Modulation and Signals
   - Owns: `src/data/modules/technician/modulation-signals.ts`
   - Sections: T8A, T8B, T8C, T8D

8. **Task 3H**: T9 - Antennas and Feed Lines
   - Owns: `src/data/modules/technician/antennas-feed-lines.ts`
   - Sections: T9A, T9B

9. **Task 3I**: T0 - Safety
   - Owns: `src/data/modules/technician/safety.ts`
   - Sections: T0A, T0B, T0C

**Module Template** (each agent should follow):

```typescript
import type { LearningModule } from '@/types/learning'

export const operatingProceduresModule: LearningModule = {
  id: 'T2',
  examLevel: 'technician',
  title: 'Operating Procedures',
  description: 'Brief description of what this module covers.',
  estimatedMinutes: 30-50,
  sections: [
    {
      id: 'T2A',
      title: 'Section Title',
      content: `Multi-paragraph markdown content...`,
      keyPoints: [
        'Key point 1',
        'Key point 2',
        // 5 key points
      ],
      relatedQuestionIds: ['T2A01', 'T2A02', ...],
    },
    // More sections...
  ],
}
```

**Content Guidelines**:

- Each section should be 2-4 paragraphs of educational content
- Content should explain concepts, not just list facts
- Include practical examples and real-world applications
- Key points should be exam-relevant takeaways
- relatedQuestionIds should list all questions in that group

**Files to Create**:

- `src/data/modules/technician/operating-procedures.ts`
- `src/data/modules/technician/radio-wave-propagation.ts`
- `src/data/modules/technician/amateur-practices.ts`
- `src/data/modules/technician/electrical-principles.ts`
- `src/data/modules/technician/circuit-components.ts`
- `src/data/modules/technician/station-equipment.ts`
- `src/data/modules/technician/modulation-signals.ts`
- `src/data/modules/technician/antennas-feed-lines.ts`
- `src/data/modules/technician/safety.ts`

**Phase Verification**:

- [ ] All 9 Technician module files created
- [ ] Each module has correct sections matching question pool groups
- [ ] Each section has content, keyPoints, and relatedQuestionIds
- [ ] No TypeScript errors

---

### Phase 4: Create General Learning Modules (Parallel)

**Objective**: Create 9 General learning modules covering all remaining subelements

**Parallel Tasks** (9 sub-agents simultaneously):

1. **Task 4A**: G2 - Operating Procedures
   - Owns: `src/data/modules/general/operating-procedures.ts`
   - Sections: G2A, G2B, G2C, G2D, G2E

2. **Task 4B**: G3 - Radio Wave Propagation
   - Owns: `src/data/modules/general/radio-wave-propagation.ts`
   - Sections: G3A, G3B, G3C

3. **Task 4C**: G4 - Amateur Radio Practices
   - Owns: `src/data/modules/general/amateur-practices.ts`
   - Sections: G4A, G4B, G4C, G4D, G4E

4. **Task 4D**: G5 - Electrical Principles
   - Owns: `src/data/modules/general/electrical-principles.ts`
   - Sections: G5A, G5B, G5C

5. **Task 4E**: G6 - Circuit Components
   - Owns: `src/data/modules/general/circuit-components.ts`
   - Sections: G6A, G6B

6. **Task 4F**: G7 - Practical Circuits
   - Owns: `src/data/modules/general/practical-circuits.ts`
   - Sections: G7A, G7B, G7C

7. **Task 4G**: G8 - Signals and Emissions
   - Owns: `src/data/modules/general/signals-emissions.ts`
   - Sections: G8A, G8B, G8C

8. **Task 4H**: G9 - Antennas and Feed Lines
   - Owns: `src/data/modules/general/antennas-feed-lines.ts`
   - Sections: G9A, G9B, G9C, G9D

9. **Task 4I**: G0 - Electrical and RF Safety
   - Owns: `src/data/modules/general/safety.ts`
   - Sections: G0A, G0B

**Files to Create**:

- `src/data/modules/general/operating-procedures.ts`
- `src/data/modules/general/radio-wave-propagation.ts`
- `src/data/modules/general/amateur-practices.ts`
- `src/data/modules/general/electrical-principles.ts`
- `src/data/modules/general/circuit-components.ts`
- `src/data/modules/general/practical-circuits.ts`
- `src/data/modules/general/signals-emissions.ts`
- `src/data/modules/general/antennas-feed-lines.ts`
- `src/data/modules/general/safety.ts`

**Phase Verification**:

- [ ] All 9 General module files created
- [ ] Each module has correct sections matching question pool groups
- [ ] No TypeScript errors

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 5: Update Module Indexes (Sequential)

**Objective**: Register all new modules in index files

**Sequential Tasks**:

1. **Task 5A**: Update Technician index
   - Modifies: `src/data/modules/technician/index.ts`
   - Import and add all 9 new modules to `technicianModules` array

2. **Task 5B**: Update General index
   - Modifies: `src/data/modules/general/index.ts`
   - Import and add all 9 new modules to `generalModules` array

**Files to Modify**:

- `src/data/modules/technician/index.ts`
- `src/data/modules/general/index.ts`

**Phase Verification**:

- [ ] `getModulesForExamLevel('technician')` returns 10 modules
- [ ] `getModulesForExamLevel('general')` returns 10 modules
- [ ] Build passes

---

### Phase 6: Add Module Completion Tracking (Sequential)

**Objective**: Add persistent module/section completion tracking

**Sequential Tasks**:

1. **Task 6A**: Update progress store
   - Modifies: `src/stores/progress-store.ts`
   - Add `completedModules: Record<string, string[]>` (moduleId -> sectionIds)
   - Add `markSectionComplete(moduleId, sectionId)` action
   - Add `markModuleComplete(moduleId)` action
   - Add `resetModuleProgress(moduleId)` action
   - Add `isModuleComplete(moduleId)` selector
   - Add `isSectionComplete(moduleId, sectionId)` selector

2. **Task 6B**: Update module page UI
   - Modifies: `src/app/(study)/learn/[moduleId]/page.tsx`
   - Show completion status on section list
   - Add "Mark Complete" button when all sections done
   - Add "Reset Progress" option

3. **Task 6C**: Update section page UI
   - Modifies: `src/app/(study)/learn/[moduleId]/[sectionId]/page.tsx`
   - Add "Mark as Read" button at bottom
   - Show completion status
   - Remove existing localStorage-based progress (migrate to store)

**Files to Modify**:

- `src/stores/progress-store.ts`
- `src/app/(study)/learn/[moduleId]/page.tsx`
- `src/app/(study)/learn/[moduleId]/[sectionId]/page.tsx`

**Phase Verification**:

- [ ] Can mark sections as complete
- [ ] Module shows complete when all sections done
- [ ] Can reset module progress
- [ ] Progress persists across page reloads
- [ ] Build passes

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

## Final Deliverable Review

**MANDATORY**: After all phases complete, run both review agents on the ENTIRE deliverable:

1. `final-review-completeness` - Full codebase scan for:
   - Incomplete explanations (placeholders, TODOs)
   - Empty module sections
   - Missing relatedQuestionIds
   - Any "coming soon" or placeholder text

2. `principal-code-reviewer` - Comprehensive quality assessment:
   - TypeScript type safety
   - Consistent code style
   - Educational content quality
   - No hardcoded values that should be dynamic

---

## Testing Strategy

### Manual Testing

1. Navigate to /practice and answer questions - verify explanations appear
2. Navigate to /learn and verify all 20 modules appear (10 Tech, 10 General)
3. Click through each module to verify sections load
4. Mark sections as complete and verify persistence
5. Reset a module and verify it clears completion state

### Build Verification

```bash
npm run build    # Verify no TypeScript errors
npm run lint     # Verify no lint errors
npm run dev      # Verify app loads correctly
```

---

## Rollback Plan

If issues arise:

1. Explanation files are additive - can be deleted without affecting existing functionality
2. Module files are additive - can be deleted without affecting T1/G1
3. Progress store changes can be reverted by removing new fields (backwards compatible due to Zustand persist)

---

## Risks and Mitigations

| Risk                                                | Likelihood | Impact | Mitigation                                                      |
| --------------------------------------------------- | ---------- | ------ | --------------------------------------------------------------- |
| Explanation content quality varies                  | Med        | Med    | Review sample from each agent before proceeding                 |
| Module content is too sparse                        | Med        | Med    | Provide detailed content guidelines, review samples             |
| File conflict between agents                        | Low        | High   | Clear file ownership matrix, no shared files in parallel phases |
| Question IDs in relatedQuestionIds don't match pool | Low        | Med    | Each agent should verify against question pool JSON             |
| Progress store migration breaks existing data       | Low        | High   | New fields have default empty values                            |

---

## Open Questions

None - all requirements are clear from the ROADMAP and existing patterns.

---

**USER: Please review this plan. Edit any section directly, then confirm to proceed.**
