# Learning Modules Enhancement Plan

## Problem Analysis

### Current Issues Identified

**1. Text Formatting Problems**

- **Technician modules**: Dense prose paragraphs without markdown headers or visual breaks
  - Example: T5A packs 4 definitions (current, voltage, power, resistance) plus DC/AC concepts into 3 long paragraphs
- **General modules**: Better formatted with headers, but still present walls of text
- **Paragraph rendering**: Works correctly, but content itself lacks breathing room

**2. Content Density Issues**

- Sections present 500-800 words of continuous technical content
- No visual breaks between conceptual units
- Reader fatigue from information overload
- Mobile experience especially problematic (endless scrolling)

**3. Lack of Interactive Engagement**

- Current interactivity limited to:
  - Quiz at end of section (KnowledgeCheck component)
  - Mark as complete button
  - Navigation between sections
- No learning reinforcement during content consumption
- Passive reading doesn't suit technical material

---

## Requirements

### R1: Text Formatting & Visual Structure

| ID   | Requirement                                                 | Priority |
| ---- | ----------------------------------------------------------- | -------- |
| R1.1 | Add proper paragraph spacing with visual breathing room     | High     |
| R1.2 | Break content into logical subsections with headers         | High     |
| R1.3 | Limit visible content to ~200-300 words per "page"          | Medium   |
| R1.4 | Implement collapsible/expandable sections for dense content | Medium   |
| R1.5 | Add support for info boxes, warnings, and callouts          | Medium   |
| R1.6 | Support markdown tables for data presentation               | Low      |

### R2: Paginated Content Windows

| ID   | Requirement                                                  | Priority |
| ---- | ------------------------------------------------------------ | -------- |
| R2.1 | Implement "Continue Reading" pagination for long sections    | High     |
| R2.2 | Show progress indicator within section (e.g., "Part 2 of 4") | High     |
| R2.3 | Allow navigation forward/backward within paginated content   | Medium   |
| R2.4 | Persist reading position if user leaves and returns          | Medium   |
| R2.5 | Smooth scroll-to-top animation on page transitions           | Low      |

### R3: Interactive Learning Components

| ID   | Requirement                                                       | Priority |
| ---- | ----------------------------------------------------------------- | -------- |
| R3.1 | Each section MUST have at least one interactive element           | High     |
| R3.2 | Interactive elements must be accessible (keyboard, screen reader) | High     |
| R3.3 | Touch targets minimum 44x44px for mobile                          | High     |
| R3.4 | Interactions must provide immediate feedback                      | Medium   |
| R3.5 | Progress/completion state should persist                          | Medium   |
| R3.6 | Interactions should be specific to radio concepts                 | High     |

### R4: Accessibility & Responsiveness

| ID   | Requirement                                      | Priority |
| ---- | ------------------------------------------------ | -------- |
| R4.1 | All content readable at 200% zoom                | High     |
| R4.2 | Color contrast meets WCAG AA (4.5:1 for text)    | High     |
| R4.3 | Keyboard navigation for all interactive elements | High     |
| R4.4 | ARIA labels for custom components                | High     |
| R4.5 | Reduced motion support for animations            | Medium   |
| R4.6 | Content reflows properly on narrow screens       | High     |

---

## Interactive Element Design by Module Type

### Category 1: Electrical Principles (T5, G5)

#### 1A. Ohm's Law Calculator

**Purpose**: Reinforce the I = E/R relationships through hands-on calculation

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Ohm's Law Calculator                           │
│  ┌─────────────────────────────────────────┐   │
│  │         ┌─────┐                          │   │
│  │         │  E  │  Voltage (V)             │   │
│  │         └──┬──┘                          │   │
│  │           / \                            │   │
│  │     ┌────┘   └────┐                      │   │
│  │  ┌──┴──┐     ┌────┴───┐                  │   │
│  │  │  I  │     │   R    │                  │   │
│  │  └─────┘     └────────┘                  │   │
│  │  Current(A)   Resistance(Ω)              │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Enter any TWO values:                          │
│  Voltage:    [____12____] V                     │
│  Current:    [____3_____] A                     │
│  Resistance: [   4.0    ] Ω  ← Calculated!     │
│                                                 │
│  Formula used: R = E ÷ I = 12 ÷ 3 = 4 ohms     │
└─────────────────────────────────────────────────┘
```

**Interaction**:

- Click triangle section to "solve for" that variable
- Input any two values, third auto-calculates
- Shows formula used and step-by-step calculation
- Includes practice problems with "Check Answer" button

**Accessibility**:

- Tab between input fields
- Screen reader announces which value is being calculated
- High contrast mode for triangle visualization

#### 1B. Decibel Visualizer

**Purpose**: Make logarithmic relationships intuitive

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Power & Decibels                               │
│                                                 │
│  Input Power:  [____100____] watts              │
│                                                 │
│  ────────────────────────────────────────────   │
│  -10dB   -6dB   -3dB    0dB   +3dB  +6dB +10dB │
│    │      │      │       │     │     │     │   │
│  [10W]  [25W]  [50W]  [100W] [200W][400W][1kW] │
│                           ▲                     │
│                      Reference                  │
│  ────────────────────────────────────────────   │
│                                                 │
│  Quick Quiz: What is 50W relative to 100W?      │
│  [A: -3dB]  [B: -6dB]  [C: +3dB]  [D: +6dB]    │
└─────────────────────────────────────────────────┘
```

**Interaction**:

- Slider or input to set reference power
- Visual scale updates showing power at each dB step
- Built-in quick quiz questions
- "Show me -3dB" highlights the 50% power point

#### 1C. Unit Converter

**Purpose**: Practice metric prefix conversions

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Frequency Converter                            │
│                                                 │
│  [___14.225___] [MHz ▼]  =  14,225 kHz          │
│                          =  14,225,000 Hz       │
│                                                 │
│  Practice Problem:                              │
│  Convert 28,400 kHz to MHz: [________]          │
│  [Check Answer]                                 │
└─────────────────────────────────────────────────┘
```

---

### Category 2: Propagation (T3, G3)

#### 2A. Ionosphere Layer Visualizer

**Purpose**: Understand how radio waves travel through ionospheric layers

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Ionospheric Propagation                   🌙   │
│  Time: [Day ━━━○━━━ Night]                      │
│                                                 │
│  250mi ╭─────────────────────────────────╮      │
│   F2   │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ↺     │
│  150mi ├─────────────────────────────────┤      │
│   F1   │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│      │
│   90mi ├─────────────────────────────────┤      │
│   E    │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ↺     │
│   55mi ├─────────────────────────────────┤      │
│   D    │████ ABSORBS <10MHz █████████│ ☀️only │
│   30mi ├─────────────────────────────────┤      │
│        │  🏠 ~~~~~~~ 🌍 ~~~~~~~ 🏠      │      │
│        ╰─────────────────────────────────╯      │
│                                                 │
│  Frequency: [━━○━━━━━━━] 14.2 MHz (20m)        │
│                                                 │
│  Signal Path: [Animated wave path shown]        │
│  Skip Distance: ~1,800 miles                    │
│  Best for: Worldwide DX                         │
└─────────────────────────────────────────────────┘
```

**Interaction**:

- Day/night slider changes D layer visibility
- Frequency slider shows which layers affect the signal
- Animated signal path shows refraction angle
- Click layers for detailed info popup
- "Why can't I work 80m during the day?" scenario button

**Accessibility**:

- Layers described in text below visualization
- Keyboard can cycle through frequencies
- High contrast mode available

#### 2B. Solar Cycle & Band Conditions

**Purpose**: Connect solar activity to band openings

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Solar Activity & Band Conditions               │
│                                                 │
│  Solar Flux Index (SFI): [━━━━━━○━━] 145       │
│  Sunspot Number: ~95                            │
│                                                 │
│  Band Predictions:                              │
│  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐  │
│  │160m │ 80m │ 40m │ 20m │ 15m │ 12m │ 10m │  │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤  │
│  │ 🟢  │ 🟢  │ 🟢  │ 🟢  │ 🟡  │ 🟡  │ 🔴  │  │
│  │Good │Good │Good │Excel│Fair │Fair │Poor │  │
│  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘  │
│                                                 │
│  📖 At SFI 145, expect good 20m propagation    │
│     with improving conditions on 15m.          │
└─────────────────────────────────────────────────┘
```

**Interaction**:

- Drag SFI slider from 65 (solar minimum) to 300 (solar maximum)
- Band conditions update in real-time
- Explanatory text changes with conditions
- "Simulate solar flare" button shows disruption effects

#### 2C. MUF/LUF Simulator

**Purpose**: Understand frequency window concept

**Design**:

```
┌─────────────────────────────────────────────────┐
│  MUF & LUF - Your Propagation Window            │
│                                                 │
│  Path: New York → London (3,500 mi)             │
│                                                 │
│       MHz  2   5   10   15   20   25   30      │
│            │   │    │    │    │    │    │      │
│  ─────────[████████████████████░░░░░░]─────    │
│           LUF=4MHz        MUF=22MHz            │
│                                                 │
│  Your frequency: [━━━━━━━━○━] 14.2 MHz         │
│                                                 │
│  ✅ 14.2 MHz is WITHIN the propagation window  │
│  Signal will be refracted back to Earth        │
│                                                 │
│  [Try 28 MHz]  [Try 3.5 MHz]  [What happens?]  │
└─────────────────────────────────────────────────┘
```

---

### Category 3: Operating Procedures (T2, G2)

#### 3A. Phonetic Alphabet Trainer

**Purpose**: Build fluency with ITU phonetic alphabet

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Phonetic Alphabet Trainer          Score: 8/10 │
│                                                 │
│  What is the phonetic for:                      │
│                                                 │
│           ╭───────╮                             │
│           │   Q   │                             │
│           ╰───────╯                             │
│                                                 │
│  [Quebec]  [Queen]  [Quota]  [Quality]         │
│                                                 │
│  ─────────────────────────────────────────      │
│  Your callsign: [W5ABC]                         │
│  Spelled: Whiskey Five Alpha Bravo Charlie      │
│  [🔊 Hear it]                                   │
└─────────────────────────────────────────────────┘
```

**Interaction**:

- Flash card style quiz
- Audio pronunciation option
- Enter your callsign to hear phonetic spelling
- Speed rounds with timer

#### 3B. Q-Signal Matcher

**Purpose**: Learn common Q-signals through context

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Q-Signal Challenge                             │
│                                                 │
│  Match the Q-signal to its meaning:             │
│                                                 │
│  ┌─────────┐      ┌────────────────────────┐   │
│  │  QRM    │──────│ Man-made interference  │   │
│  └─────────┘      └────────────────────────┘   │
│  ┌─────────┐      ┌────────────────────────┐   │
│  │  QRN    │  ?   │ Natural interference   │   │
│  └─────────┘      └────────────────────────┘   │
│  ┌─────────┐      ┌────────────────────────┐   │
│  │  QSB    │  ?   │ Signal fading          │   │
│  └─────────┘      └────────────────────────┘   │
│  ┌─────────┐      ┌────────────────────────┐   │
│  │  QTH    │  ?   │ My location is...      │   │
│  └─────────┘      └────────────────────────┘   │
│                                                 │
│  Drag Q-signals to match their meanings         │
└─────────────────────────────────────────────────┘
```

**Interaction**:

- Drag-and-drop matching
- Context examples shown after correct match
- Supports touch and keyboard
- Progressive difficulty (common → obscure)

---

### Category 4: Antennas (T9, G9)

#### 4A. Antenna Pattern Visualizer

**Purpose**: Understand radiation patterns and polarization

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Antenna Radiation Pattern                      │
│                                                 │
│  Antenna Type: [Dipole ▼]                       │
│                                                 │
│            Top View          Side View          │
│         ╭─────────────╮   ╭─────────────╮      │
│         │     ●       │   │      │      │      │
│         │   ╱   ╲     │   │   ───●───   │      │
│         │  ╱ max ╲    │   │    ╱ │ ╲    │      │
│         │ ╱       ╲   │   │   ╱  │  ╲   │      │
│         │◀─antenna─▶ │   │  ╱   │   ╲  │      │
│         │ ╲       ╱   │   │ null │ null│      │
│         │  ╲     ╱    │   │      │      │      │
│         │   ╲   ╱     │   │      │      │      │
│         ╰─────────────╯   ╰─────────────╯      │
│                                                 │
│  📖 Dipole has figure-8 pattern with nulls     │
│     off the ends and max radiation broadside   │
│                                                 │
│  Polarization: [Horizontal ○] [Vertical ○]     │
└─────────────────────────────────────────────────┘
```

**Interaction**:

- Dropdown to select antenna type (dipole, vertical, Yagi, etc.)
- Animated pattern that rotates
- Click to see gain at different angles
- Toggle polarization to see effect

#### 4B. Wavelength/Antenna Length Calculator

**Purpose**: Connect frequency to physical antenna dimensions

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Antenna Length Calculator                      │
│                                                 │
│  Frequency: [____14.2____] MHz                  │
│  Wavelength: 21.1 meters (69.3 feet)            │
│                                                 │
│  Antenna Lengths:                               │
│  ┌────────────────────────────────────────┐    │
│  │ Half-wave dipole: 32.9 ft (10.0 m)     │    │
│  │ ════════════════════════════════       │    │
│  │ Quarter-wave vertical: 16.5 ft (5.0 m) │    │
│  │ ═══════════════════                    │    │
│  │ 5/8 wave vertical: 41.2 ft (12.5 m)    │    │
│  │ ══════════════════════════════════     │    │
│  └────────────────────────────────────────┘    │
│                                                 │
│  Formula: Length(ft) = 468 / Frequency(MHz)     │
└─────────────────────────────────────────────────┘
```

---

### Category 5: Safety (T0, G0)

#### 5A. RF Exposure Calculator

**Purpose**: Understand power density and safe distances

**Design**:

```
┌─────────────────────────────────────────────────┐
│  RF Exposure Evaluation                         │
│                                                 │
│  Transmitter Power: [___100___] watts           │
│  Antenna Gain: [___6___] dBi                    │
│  Frequency: [___146___] MHz                     │
│                                                 │
│  ⚠️  Minimum Safe Distance: 4.2 feet            │
│                                                 │
│         🏠                                       │
│          │ ← You are here                       │
│    ══════╪══════ Antenna                        │
│          │                                       │
│    ◄─4.2ft─►                                    │
│    [DANGER] [SAFE ZONE →→→→→→→→→→]             │
│                                                 │
│  📖 At 100W and 6dBi gain, stay at least       │
│     4.2 feet from the antenna during TX        │
└─────────────────────────────────────────────────┘
```

#### 5B. Safety Scenario Quiz

**Purpose**: Apply safety knowledge to realistic situations

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Safety Scenario                                │
│                                                 │
│  🏗️ You're helping a friend install a new      │
│  antenna. The tower is 40 feet tall and        │
│  located near power lines.                      │
│                                                 │
│  What is the FIRST thing you should do?         │
│                                                 │
│  ○ Start climbing the tower                     │
│  ○ Check wind conditions                        │
│  ● Verify clearance from power lines            │
│  ○ Test your radio equipment                    │
│                                                 │
│  ✅ Correct! Power line contact is the #1      │
│     cause of amateur radio fatalities.          │
│     Always ensure adequate clearance.           │
│                                                 │
│  [Next Scenario →]                              │
└─────────────────────────────────────────────────┘
```

---

### Category 6: Regulations (T1, G1)

#### 6A. Band Plan Explorer

**Purpose**: Interactive visualization of frequency allocations

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Band Plan Explorer                             │
│                                                 │
│  License Class: [Technician ▼]                  │
│                                                 │
│  2 Meter Band (144-148 MHz)                     │
│  ═══════════════════════════════════════════   │
│  144.0          145.5          147.0     148.0  │
│  │──────────────│──────────────│──────────│    │
│  │    CW/SSB    │   FM/Digital │Repeater  │    │
│  │   Weak Sig   │    Simplex   │ Inputs   │    │
│  ═══════════════════════════════════════════   │
│                                                 │
│  Click frequency: [____146.520____] MHz         │
│                                                 │
│  📍 146.520 MHz - National FM Simplex Calling  │
│     ✅ Technician: Full privileges              │
│     ✅ General: Full privileges                 │
│     Mode: FM Voice                              │
│     Max Power: 1500 watts PEP                   │
└─────────────────────────────────────────────────┘
```

**Interaction**:

- Visual band segments with color coding
- Click anywhere to see frequency info
- Toggle between license classes to compare
- Search for specific frequency

---

### Category 7: Circuit Components (G6, G7)

#### 7A. Component Identifier

**Purpose**: Learn schematic symbols and component functions

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Component Challenge                            │
│                                                 │
│  What component does this symbol represent?     │
│                                                 │
│              ┌───┤├───┐                         │
│              │        │                         │
│         ─────┤        ├─────                    │
│              │        │                         │
│              └────────┘                         │
│                                                 │
│  [Resistor]  [Capacitor]  [Inductor]  [Diode]  │
│                                                 │
│  ✅ Capacitor - stores energy in electric field │
│     Unit: Farad (F)                             │
│     Blocks DC, passes AC                        │
└─────────────────────────────────────────────────┘
```

#### 7B. Simple Circuit Builder

**Purpose**: Understand series vs parallel connections

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Build a Circuit                                │
│                                                 │
│  Components Available:                          │
│  [🔋 12V] [◇ 100Ω] [◇ 200Ω] [💡 LED]           │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  +                                    -  │  │
│  │  ●────[100Ω]────[200Ω]────[LED]─────●  │  │
│  │  │                                    │  │  │
│  │  └──────────────[12V]────────────────┘  │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Circuit Analysis:                              │
│  Total Resistance: 300Ω (series adds)           │
│  Current: 0.04A (I = 12V ÷ 300Ω)               │
│  LED Status: 💡 ON (sufficient current)         │
│                                                 │
│  [Reset] [Calculate] [Explain]                  │
└─────────────────────────────────────────────────┘
```

---

### Category 8: Signals & Emissions (G8)

#### 8A. Modulation Type Visualizer

**Purpose**: See and hear different modulation types

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Modulation Types                               │
│                                                 │
│  Select: [AM ○] [FM ●] [SSB ○] [CW ○]          │
│                                                 │
│  Carrier Wave:                                  │
│  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿             │
│                                                 │
│  Audio Signal:                                  │
│  ╭──╮    ╭──╮    ╭──╮                          │
│  │  │    │  │    │  │                          │
│  ╰──╯────╰──╯────╰──╯────                      │
│                                                 │
│  FM Modulated Output:                           │
│  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿              │
│  [compressed][normal][compressed]               │
│                                                 │
│  📖 FM varies the frequency while keeping       │
│     amplitude constant. Less noise than AM.     │
│                                                 │
│  [🔊 Hear FM]  [🔊 Compare to AM]               │
└─────────────────────────────────────────────────┘
```

#### 8B. Bandwidth Visualizer

**Purpose**: Understand occupied bandwidth for different modes

**Design**:

```
┌─────────────────────────────────────────────────┐
│  Signal Bandwidth                               │
│                                                 │
│  Mode: [FM Voice ▼]   Deviation: ±5 kHz        │
│                                                 │
│  Spectrum View (centered on 146.52 MHz):        │
│       │                                         │
│    ▁▂▃█████████████████████▃▂▁                 │
│       │                                         │
│  ◄────────── 16 kHz bandwidth ──────────►      │
│                                                 │
│  Compare Modes:                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ CW:        ▏│▏         ~150 Hz          │   │
│  │ SSB:      ▃███▃        ~2.8 kHz         │   │
│  │ AM:     ▂▅████▅▂       ~6 kHz           │   │
│  │ FM:   ▁▂████████▂▁     ~16 kHz          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  📖 Narrower bandwidth = more signals fit       │
│     Wider bandwidth = better audio quality      │
└─────────────────────────────────────────────────┘
```

---

## Implementation Architecture

### Component Structure

```
src/components/features/learning/
├── markdown-renderer.tsx      (enhanced)
├── paginated-content.tsx      (NEW)
├── content-card.tsx           (NEW)
├── info-box.tsx               (NEW)
├── interactive/
│   ├── ohms-law-calculator.tsx
│   ├── decibel-visualizer.tsx
│   ├── unit-converter.tsx
│   ├── ionosphere-visualizer.tsx
│   ├── solar-conditions.tsx
│   ├── muf-luf-simulator.tsx
│   ├── phonetic-trainer.tsx
│   ├── q-signal-matcher.tsx
│   ├── antenna-pattern.tsx
│   ├── wavelength-calculator.tsx
│   ├── rf-exposure-calc.tsx
│   ├── safety-scenarios.tsx
│   ├── band-plan-explorer.tsx
│   ├── component-identifier.tsx
│   ├── circuit-builder.tsx
│   ├── modulation-visualizer.tsx
│   └── bandwidth-visualizer.tsx
└── index.ts
```

### Content Enhancement Strategy

**Phase 1: Markdown & Pagination (Foundation)**

1. Enhance MarkdownRenderer with callout/info box support
2. Add table parsing support
3. Implement PaginatedContent component
4. Add section progress tracking

**Phase 2: Content Restructuring**

1. Add headers to Technician prose modules
2. Break dense paragraphs into logical chunks
3. Insert `<!-- interactive: component-name -->` markers
4. Add info boxes for key definitions

**Phase 3: Core Interactive Components**

1. Ohm's Law Calculator (highest impact, used across T5 & G5)
2. Ionosphere Visualizer (G3 - propagation understanding)
3. Phonetic Alphabet Trainer (T2 & G2 - practical skill)
4. Band Plan Explorer (T1 & G1 - regulatory understanding)

**Phase 4: Advanced Interactive Components**

1. Remaining calculators and visualizers
2. Audio components (modulation sounds)
3. Drag-and-drop interactions
4. Circuit builder

---

## Mobile & Accessibility Considerations

### Touch Interaction

- All buttons/controls minimum 44x44px
- Swipe gestures for pagination
- Pull-to-refresh for progress sync
- Bottom sheet for detailed info (not modals)

### Keyboard Navigation

- Tab through all interactive elements
- Arrow keys for sliders
- Enter/Space to activate
- Escape to close expanded views

### Screen Reader Support

- ARIA labels on all custom controls
- Live regions for calculation results
- Descriptive alt text for visualizations
- Skip links for pagination

### Reduced Motion

- Respect `prefers-reduced-motion`
- Static alternatives for animations
- No autoplay on any animation

---

## Success Metrics

1. **Engagement**: Time spent per section increases
2. **Completion**: Higher section completion rates
3. **Comprehension**: Improved quiz scores after interactive use
4. **Accessibility**: Lighthouse accessibility score > 95
5. **Performance**: Interactive components load < 200ms

---

## Priority Implementation Order

| Priority | Component                 | Modules Affected | Impact     |
| -------- | ------------------------- | ---------------- | ---------- |
| P0       | Markdown/Pagination fixes | ALL              | Foundation |
| P1       | Ohm's Law Calculator      | T5, G5           | High       |
| P1       | Ionosphere Visualizer     | G3               | High       |
| P1       | Phonetic Trainer          | T2, G2           | High       |
| P2       | Band Plan Explorer        | T1, G1           | Medium     |
| P2       | Decibel Visualizer        | T5, G5           | Medium     |
| P2       | Antenna Pattern           | T9, G9           | Medium     |
| P3       | Unit Converter            | T5, G5           | Medium     |
| P3       | MUF/LUF Simulator         | G3               | Medium     |
| P3       | Safety Scenarios          | T0, G0           | Medium     |
| P4       | Circuit Builder           | G6, G7           | Lower      |
| P4       | Modulation Visualizer     | G8               | Lower      |
| P4       | All remaining             | Various          | Lower      |
