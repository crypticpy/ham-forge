# Implementation Plan: Create Missing Learning Cards

Created: 2026-01-31
Status: PENDING APPROVAL

## Summary

Create learning cards for the 4 missing subelements (T4, T5, T7, T9) to provide complete coverage of all Technician exam topics. This adds approximately 24 new cards with mnemonics and exam tips.

## Scope

### In Scope

- T4: Amateur Practices (6 cards) - Station setup, interference, grounding
- T5: Electrical Principles (6 cards) - Ohm's law, power, decibels, AC/DC
- T7: Station Equipment (6 cards) - Transceivers, receivers, meters, batteries
- T9: Antennas & Feed Lines (6 cards) - Antenna types, SWR, connectors

### Out of Scope

- Existing learning cards (T0, T1, T2, T3, T6, T8)
- Question cards (already complete)
- Algorithm changes

## Prerequisites

- Existing card format in `technician-learning-cards.ts`

## Parallel Execution Strategy

Four independent sub-agents create cards for different subelements simultaneously. No file conflicts since all append to the same array but in sequential phases.

### Workstream Analysis

| Workstream | Topic                    | Cards | Dependencies |
| ---------- | ------------------------ | ----- | ------------ |
| Stream 1   | T4 Amateur Practices     | 6     | None         |
| Stream 2   | T5 Electrical Principles | 6     | None         |
| Stream 3   | T7 Station Equipment     | 6     | None         |
| Stream 4   | T9 Antennas & Feed Lines | 6     | None         |

## Implementation Phases

### Phase 1: Create All Missing Cards

**Objective**: Add 24 new learning cards across 4 subelements

**Sequential execution** (single file, append in order):

1. **T4 Cards** (Amateur Practices):
   - Station grounding
   - RF interference (RFI)
   - Audio frequency interference
   - Station setup best practices
   - Power supply requirements
   - Antenna installation

2. **T5 Cards** (Electrical Principles):
   - Ohm's Law (V=IR)
   - Power formulas (P=IE)
   - Decibel calculations
   - AC vs DC
   - Frequency/wavelength relationship
   - Impedance basics

3. **T7 Cards** (Station Equipment):
   - Transceiver components
   - Receiver specifications
   - Power meters/SWR meters
   - Dummy loads
   - Batteries and power
   - Computer interfaces

4. **T9 Cards** (Antennas & Feed Lines):
   - Dipole antennas
   - Vertical antennas
   - Yagi antennas
   - Coaxial cable types
   - SWR and matching
   - Connectors (PL-259, BNC, N)

**File to Modify**:

- `src/data/flashcards/technician-learning-cards.ts` - Append 24 new cards

**Phase Verification**:

- [ ] All 24 cards have unique IDs
- [ ] All cards have mnemonic and examTip
- [ ] Card format matches existing cards
- [ ] TypeScript compiles without errors

### Phase 2: Verification

**Objective**: Ensure cards work in the flashcard system

**Tasks**:

1. Run tests: `npm test`
2. Run build: `npm run build`
3. Manual test: Start session, verify new cards appear

**Phase Review Gate**:

- [ ] All tests pass
- [ ] Build succeeds
- [ ] Cards render correctly

## Card Content Guidelines

Each card must include:

- `id`: Format `lc-tXy-NN` (e.g., `lc-t4a-01`)
- `subelement`: T4, T5, T7, or T9
- `group`: Specific group (T4A, T5A, etc.)
- `front.title`: Concise concept name
- `front.prompt`: Question format
- `front.category`: Topic name
- `back.explanation`: 2-3 sentence explanation
- `back.keyFact`: Single memorable fact
- `back.mnemonic`: Memory aid
- `back.examTip`: Test-taking advice
- `relatedQuestionIds`: Array of related question IDs

## Testing Strategy

- Existing tests should pass (no API changes)
- Manual verification of card rendering

## Rollback Plan

- Revert commit if issues found

## Risks and Mitigations

| Risk                   | Likelihood | Impact | Mitigation                       |
| ---------------------- | ---------- | ------ | -------------------------------- |
| Incorrect exam content | Low        | High   | Reference official question pool |
| Card ID conflicts      | Low        | Med    | Use consistent naming scheme     |

---

**USER: Please review this plan. Confirm to proceed with card creation.**
