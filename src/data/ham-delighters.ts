export type DelighterContext =
  | 'home'
  | 'practice'
  | 'exam'
  | 'learn'
  | 'flashcards'
  | 'radio'
  | 'dashboard'
  | 'general'

interface HamFaq {
  question: string
  answer: string
}

interface HamAnecdote {
  title: string
  story: string
}

const encouragementByContext: Record<DelighterContext, string[]> = {
  home: [
    'Every operator started as a beginner. You are right on track.',
    'Small daily sessions beat occasional marathons. Keep showing up.',
    'Curiosity plus consistency is the fastest path to a license.',
    'You do not need perfect sessions. You need repeatable sessions.',
    'Your future on-air confidence is being built right now.',
    'Five focused minutes today still counts as progress.',
    'Most operators remember who helped them start. You are joining that story.',
    'One day soon, this material will feel familiar instead of new.',
    'You are not just studying rules. You are learning a craft.',
    'The best time to start was earlier. The second-best time is this session.',
  ],
  practice: [
    'Progress comes from reps, not perfection. One question at a time.',
    'Wrong answers are useful signal. They show exactly what to reinforce.',
    'You are building exam reflexes every time you press Next.',
    'If you miss one, great. You just found the next high-value rep.',
    'Consistency in practice creates calm on exam day.',
    'Read the full stem, then decide. Clean process beats rushing.',
    'Your brain remembers effortful recall better than easy recognition.',
    'Stack enough quality reps and hard topics become automatic.',
    'Practice is where pressure gets converted into confidence.',
    'You are training both speed and accuracy. That combination wins.',
  ],
  exam: [
    'Treat this like flight simulation: calm pace, clean decisions.',
    'Confidence is preparation remembered under pressure.',
    'Steady breathing and steady reading both improve scores.',
    'One question at a time. Do not spend energy on the whole test at once.',
    'If a question feels noisy, mark your best choice and keep momentum.',
    'Your prep is already in memory. Let it surface without forcing it.',
    'Fast is smooth when the process is stable.',
    'A calm reset between questions can recover more points than rushing.',
    'You are allowed to be deliberate. Deliberate is not slow.',
    'Control pace, control stress, control performance.',
  ],
  learn: [
    'Understanding beats memorizing. You are building durable knowledge.',
    'If a concept feels fuzzy, that is where growth is happening.',
    'Short focused study windows compound quickly over a week.',
    'When you can explain it simply, you own it.',
    'Confusion is not failure. It is a map to what matters next.',
    'Concept first, details second. That order pays off on tricky questions.',
    'Slow, accurate thinking now creates fast, accurate thinking later.',
    'Connect each new idea to a practical station example.',
    'Deep understanding reduces test anxiety because fewer answers feel random.',
    'You are building a mental model, not a pile of facts.',
  ],
  flashcards: [
    'Recall is a skill. Every flip strengthens it.',
    'Fast misses now prevent costly misses on exam day.',
    'Spaced repetition feels hard because it is working.',
    'If recall feels effortful, the memory trace is getting stronger.',
    'Frequent short sets beat occasional giant sets.',
    'Honest self-rating now makes future review smarter.',
    'Misses are expensive only when ignored. You are not ignoring them.',
    'Each pass reduces friction for the next pass.',
    'Repetition with spacing turns recognition into retrieval.',
    'You are converting uncertainty into recall speed.',
  ],
  radio: [
    'Learning the rig now makes on-air confidence come naturally later.',
    'Radio skill is pattern recognition. You are training that muscle.',
    'A little setup knowledge saves a lot of frustration on the air.',
    'Good operators are made through reps, notes, and curiosity.',
    'Every control you learn now reduces cognitive load on the air.',
    'The culture rewards patience, clarity, and helpfulness. You are practicing all three.',
    'You do not need every feature today. Master the essentials first.',
    'Strong operating habits are a bigger advantage than expensive gear.',
    'Clear procedure makes contacts feel easier and cleaner.',
    'You are learning the language and rhythm of radio culture.',
  ],
  dashboard: [
    'Metrics are feedback, not judgment. Use them to steer next steps.',
    'Consistency trends matter more than any single score.',
    'You are not behind. You are in progress.',
    'Look for direction, not perfection. Trend lines matter most.',
    'A small uptick in consistency is a big long-term win.',
    'Use weak-topic data to choose your next best 15 minutes.',
    'The best dashboard move is picking one clear next action.',
    'Numbers are tools. They are here to help, not to grade your effort.',
    'Strong habits often appear in the graph before they feel obvious.',
    'Measure, adjust, repeat. That loop is how mastery happens.',
  ],
  general: [
    'Good operators are made, not born.',
    'Momentum matters more than intensity.',
    'The best study plan is the one you can repeat tomorrow.',
    'Progress hides in routines that feel ordinary.',
    'Stay curious and steady. That combination is hard to beat.',
    'You are closer than you think when you keep showing up.',
    'Skill compounds quietly until one day it feels obvious.',
    'Small wins are still wins. Collect enough and they become momentum.',
    'A clear next step beats a perfect long-term plan.',
    'Reliable effort is the strongest signal in the noise.',
  ],
}

const faqs: HamFaq[] = [
  {
    question: 'Why is it called "ham" radio?',
    answer:
      'The exact origin is debated, but by the early 1900s "ham" was slang for amateur operators and the community embraced it with pride.',
  },
  {
    question: 'Do I need Morse code to get licensed?',
    answer:
      'No. Morse testing was removed from FCC amateur exams in 2007. You can still learn CW later because it is efficient and fun.',
  },
  {
    question: 'Can new operators really make long-distance contacts?',
    answer:
      'Yes. Even Technician operators can work impressive distances, especially on VHF/UHF repeaters, satellites, and 10 meters when conditions open.',
  },
  {
    question: 'Is ham radio still useful in the smartphone era?',
    answer:
      'Absolutely. Amateur radio is independent infrastructure and remains valuable for emergency communication, experimentation, and public service.',
  },
  {
    question: 'Can I talk to astronauts on the ISS?',
    answer:
      'Sometimes. The ISS carries amateur radio equipment, and licensed operators can make contacts when passes and operating schedules line up.',
  },
  {
    question: 'What is the easiest first on-air setup?',
    answer:
      'A handheld radio plus a local repeater is often the simplest path. It helps you build operating habits before bigger station upgrades.',
  },
]

const anecdotes: HamAnecdote[] = [
  {
    title: 'ARRL Was Founded in 1914',
    story:
      'Hiram Percy Maxim and Clarence Tuska started a relay network so amateur stations could pass messages beyond single-hop range.',
  },
  {
    title: 'First Amateur Transatlantic Contact',
    story:
      'In 1923, amateur stations completed two-way transatlantic communication, proving what coordinated experimentation could achieve.',
  },
  {
    title: 'Satellites Started Early',
    story:
      'OSCAR 1 launched in 1961 as one of the earliest non-government satellites, showing how active amateur innovation was in space.',
  },
  {
    title: 'Field Day Is a Culture Staple',
    story:
      'Since 1933, Field Day has mixed emergency-readiness practice with community building, portable setups, and lots of mentoring.',
  },
  {
    title: 'Emergency Service Legacy',
    story:
      'Amateurs have repeatedly supported disaster response when normal systems were overloaded, damaged, or unavailable.',
  },
  {
    title: 'Global Friendship by Callsign',
    story:
      'A classic ham tradition is collecting QSL cards, physical proof of contacts that often become keepsakes of shared moments on the air.',
  },
]

function hashSeed(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return hash
}

function pickStable<T>(items: T[], seed: string): T {
  const hash = hashSeed(seed)
  return items[hash % items.length]
}

export function getHamDelighterBundle(context: DelighterContext, seed: string) {
  const encouragementPool = encouragementByContext[context] ?? encouragementByContext.general
  return {
    encouragement: pickStable(encouragementPool, `${seed}:encourage`),
    faq: pickStable(faqs, `${seed}:faq`),
    anecdote: pickStable(anecdotes, `${seed}:history`),
  }
}
