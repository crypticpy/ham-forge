'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Radio, Mic, Check, X, RotateCcw, ChevronRight, BookOpen, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFlashcardStore } from '@/stores/flashcard-store'
import { spellCallsignString } from '@/lib/phonetics'

interface QSOScenario {
  id: string
  type: 'cq' | 'report' | 'etiquette' | 'qsl'
  title: string
  setup: string
  prompt: string
  frequency?: string
  pronounceCallsign?: string
  correctResponses: string[]
  feedback: {
    correct: string
    incorrect: string
  }
  hints?: string[]
}

const scenarios: QSOScenario[] = [
  {
    id: 'freq-etiquette',
    type: 'etiquette',
    title: 'Frequency Etiquette',
    setup: 'You want to make a call on 146.520 MHz. The frequency appears clear.',
    prompt: 'What should you say BEFORE calling CQ?',
    frequency: '146.520 MHz',
    correctResponses: [
      'is the frequency in use',
      'is this frequency in use',
      'qrl',
      'is the frequency in use?',
      'is this frequency in use?',
      'qrl?',
      'frequency in use',
      'anyone using this frequency',
    ],
    feedback: {
      correct:
        'Always ask if the frequency is in use before calling. This prevents QRM (interference) and shows good operating practice.',
      incorrect:
        'Before calling CQ, always ask "Is the frequency in use?" or "QRL?" to avoid causing interference to ongoing contacts.',
    },
    hints: ['Think about courtesy to other operators', "There's a Q-code for this"],
  },
  {
    id: 'basic-cq',
    type: 'cq',
    title: 'Basic CQ Call',
    setup: 'The frequency is clear. Your callsign is W1ABC. Make a CQ call.',
    prompt: 'What do you say?',
    frequency: '146.520 MHz',
    pronounceCallsign: 'W1ABC',
    correctResponses: [
      'cq cq cq this is w1abc w1abc calling cq and listening',
      'cq cq cq this is w1abc w1abc calling cq',
      'cq cq cq w1abc w1abc calling cq and listening',
      'cq cq this is w1abc w1abc',
      'cq cq cq de w1abc w1abc',
      'cq cq cq this is w1abc',
      'cq cq cq w1abc',
    ],
    feedback: {
      correct:
        'A proper CQ call includes CQ 2-3 times, your callsign (often twice), and optionally "listening" or "standing by".',
      incorrect:
        'A CQ call should include: "CQ CQ CQ this is [your callsign] [your callsign] calling CQ and listening"',
    },
    hints: ['Say CQ multiple times', 'Include your callsign', "Let others know you're listening"],
  },
  {
    id: 'respond-cq',
    type: 'cq',
    title: 'Responding to CQ',
    setup: 'You hear "CQ CQ CQ this is N2XYZ calling CQ". Your callsign is W1ABC.',
    prompt: 'How do you respond?',
    frequency: '146.520 MHz',
    pronounceCallsign: 'W1ABC',
    correctResponses: [
      'n2xyz this is w1abc',
      'n2xyz w1abc',
      'n2xyz de w1abc',
      'n2xyz this is w1abc w1abc',
      'n2xyz n2xyz this is w1abc w1abc',
    ],
    feedback: {
      correct:
        'When responding to CQ, say their callsign first, then yours. This helps them know who is calling them.',
      incorrect:
        'When responding to a CQ, say the other station\'s callsign first, then identify yourself: "[their call] this is [your call]"',
    },
    hints: ['Their callsign comes first', 'Then identify yourself'],
  },
  {
    id: 'signal-report',
    type: 'report',
    title: 'Signal Report Exchange',
    setup: 'N2XYZ responds to your call. The signal is strong and clear (S9, no noise).',
    prompt: 'What signal report do you give?',
    frequency: '146.520 MHz',
    correctResponses: [
      '59',
      '5-9',
      'five nine',
      'five-nine',
      'five by nine',
      '5 9',
      '5 by 9',
      'five and nine',
      '59 59',
    ],
    feedback: {
      correct:
        '59 means perfectly readable (5) and extremely strong signal (9). This is a common "armchair copy" report.',
      incorrect:
        'For a strong, clear SSB signal, give a 59 report: 5 = perfectly readable, 9 = extremely strong.',
    },
    hints: [
      'RS report: Readability (1-5) and Strength (1-9)',
      'Perfect readability is 5, strongest signal is 9',
    ],
  },
  {
    id: 'qsl-end',
    type: 'qsl',
    title: 'QSL Confirmation',
    setup: 'The contact is ending. N2XYZ says "Thanks for the contact, 73!"',
    prompt: 'How do you end the contact?',
    frequency: '146.520 MHz',
    correctResponses: [
      '73',
      '73 w1abc clear',
      '73 de w1abc',
      'qsl 73',
      '73 and clear',
      'thanks 73',
      '73 w1abc',
      '73s',
      'best 73',
      '73 clear',
    ],
    feedback: {
      correct:
        '73 is ham radio shorthand for "best regards". It\'s the standard way to end a contact politely.',
      incorrect:
        '73 means "best regards" in ham radio. Always say 73 to end a contact: "73" or "73, [your call] clear"',
    },
    hints: ['Ham radio shorthand for best regards', 'A number that means goodbye'],
  },
  {
    id: 'phonetic-call',
    type: 'etiquette',
    title: 'Phonetic Callsign',
    setup:
      'The other operator asks you to repeat your callsign phonetically. Your callsign is W1ABC.',
    prompt: 'How do you say W1ABC phonetically?',
    frequency: '146.520 MHz',
    pronounceCallsign: 'W1ABC',
    correctResponses: [
      'whiskey one alpha bravo charlie',
      'whiskey 1 alpha bravo charlie',
      'w1abc whiskey one alpha bravo charlie',
      'whiskey one alpha bravo charlie w1abc',
    ],
    feedback: {
      correct:
        'Use ITU phonetics: Whiskey One Alpha Bravo Charlie. This ensures clarity, especially in poor conditions.',
      incorrect: 'Use the ITU phonetic alphabet: W=Whiskey, 1=One, A=Alpha, B=Bravo, C=Charlie',
    },
    hints: ['Use the ITU/NATO phonetic alphabet', 'W = Whiskey, A = Alpha, B = Bravo, C = Charlie'],
  },
]

type Mode = 'learn' | 'practice'

interface PracticeState {
  currentIndex: number
  userAnswer: string
  answered: boolean
  isCorrect: boolean | null
  showHint: boolean
  hintIndex: number
}

/**
 * Interactive QSO (Contact) Trainer
 *
 * Features:
 * - Learn mode: Reference for proper QSO procedures
 * - Practice mode: Realistic scenario-based training
 * - Score tracking with skill progression
 * - Hints available for struggling learners
 */
export function QSOTrainer() {
  const [mode, setMode] = useState<Mode>('learn')
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [practice, setPractice] = useState<PracticeState>({
    currentIndex: 0,
    userAnswer: '',
    answered: false,
    isCorrect: null,
    showHint: false,
    hintIndex: 0,
  })

  // Get skill progress updater from store
  const updateSkillProgress = useFlashcardStore((state) => state.updateSkillProgress)

  // Speak text using Web Speech API (best-effort)
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return
    if (!('speechSynthesis' in window)) return
    if (!('SpeechSynthesisUtterance' in window)) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }, [])

  // Normalize answer for comparison (lowercase, trim, remove punctuation)
  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/[?.!,]/g, '')
      .replace(/\s+/g, ' ')
  }

  // Check if user answer matches any correct response
  const checkAnswer = useCallback((userAnswer: string, correctResponses: string[]): boolean => {
    const normalized = normalizeAnswer(userAnswer)
    return correctResponses.some((correct) => {
      const normalizedCorrect = normalizeAnswer(correct)
      // Exact match or contains the key phrase
      return normalized === normalizedCorrect || normalized.includes(normalizedCorrect)
    })
  }, [])

  // Handle answer submission
  const handleSubmit = useCallback(() => {
    if (practice.answered || !practice.userAnswer.trim()) return

    const currentScenario = scenarios[practice.currentIndex]
    const isCorrect = checkAnswer(practice.userAnswer, currentScenario.correctResponses)

    setPractice((prev) => ({
      ...prev,
      answered: true,
      isCorrect,
    }))

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))

    // Update skill progress in the store
    updateSkillProgress('qso', isCorrect)
  }, [
    practice.answered,
    practice.userAnswer,
    practice.currentIndex,
    checkAnswer,
    updateSkillProgress,
  ])

  // Move to next scenario
  const handleNext = useCallback(() => {
    const nextIndex = (practice.currentIndex + 1) % scenarios.length
    setPractice({
      currentIndex: nextIndex,
      userAnswer: '',
      answered: false,
      isCorrect: null,
      showHint: false,
      hintIndex: 0,
    })
  }, [practice.currentIndex])

  // Show hint
  const handleShowHint = useCallback(() => {
    const currentScenario = scenarios[practice.currentIndex]
    if (!currentScenario.hints || practice.hintIndex >= currentScenario.hints.length) return

    setPractice((prev) => ({
      ...prev,
      showHint: true,
      hintIndex: prev.hintIndex + 1,
    }))
  }, [practice.currentIndex, practice.hintIndex])

  // Reset practice session
  const handleReset = useCallback(() => {
    setScore({ correct: 0, total: 0 })
    setPractice({
      currentIndex: 0,
      userAnswer: '',
      answered: false,
      isCorrect: null,
      showHint: false,
      hintIndex: 0,
    })
  }, [])

  // Start practice mode
  const startPractice = useCallback(() => {
    setMode('practice')
    setPractice({
      currentIndex: 0,
      userAnswer: '',
      answered: false,
      isCorrect: null,
      showHint: false,
      hintIndex: 0,
    })
  }, [])

  const currentScenario = scenarios[practice.currentIndex]
  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg">
            <Radio className="size-5 text-rose-500" aria-hidden="true" />
            Virtual QSO Trainer
          </span>
          {mode === 'practice' && (
            <span className="text-sm font-normal text-muted-foreground">
              Score: {score.correct}/{score.total}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setMode('learn')}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === 'learn'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
            aria-selected={mode === 'learn'}
            role="tab"
          >
            Learn
          </button>
          <button
            onClick={startPractice}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === 'practice'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
            aria-selected={mode === 'practice'}
            role="tab"
          >
            Practice
          </button>
        </div>

        {/* Learn Mode */}
        {mode === 'learn' && (
          <div className="space-y-6">
            {/* QSO Overview */}
            <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Mic className="size-4 text-rose-500" aria-hidden="true" />
                What is a QSO?
              </h3>
              <p className="text-sm text-muted-foreground">
                A <strong>QSO</strong> is a two-way radio contact between amateur radio operators.
                Following proper procedures ensures clear communication and shows good operating
                practice.
              </p>
            </div>

            {/* Standard QSO Procedure */}
            <div className="space-y-4">
              <h3 className="font-semibold">Standard QSO Procedure</h3>
              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: 'Check the Frequency',
                    content: 'Ask "Is the frequency in use?" or "QRL?" before transmitting.',
                  },
                  {
                    step: 2,
                    title: 'Call CQ',
                    content: '"CQ CQ CQ, this is [your callsign], calling CQ and listening."',
                  },
                  {
                    step: 3,
                    title: 'Answer a CQ',
                    content: '"[Their callsign], this is [your callsign]."',
                  },
                  {
                    step: 4,
                    title: 'Exchange Information',
                    content:
                      'Share signal reports (59 = strong), names, locations, and other info.',
                  },
                  {
                    step: 5,
                    title: 'End the Contact',
                    content: '"73" (best regards), then "[your callsign] clear" or "signing off."',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 p-3 rounded-lg bg-muted/30 border">
                    <div className="flex-shrink-0 size-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Reference */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Common Phrases</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="font-mono font-bold text-rose-600 dark:text-rose-400">CQ</div>
                  <div className="text-muted-foreground">Calling any station</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="font-mono font-bold text-rose-600 dark:text-rose-400">73</div>
                  <div className="text-muted-foreground">Best regards</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="font-mono font-bold text-rose-600 dark:text-rose-400">QRL?</div>
                  <div className="text-muted-foreground">Is frequency in use?</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="font-mono font-bold text-rose-600 dark:text-rose-400">QSL</div>
                  <div className="text-muted-foreground">I confirm / Understood</div>
                </div>
              </div>
            </div>

            {/* Start Practice Button */}
            <div className="pt-4">
              <Button
                onClick={startPractice}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white"
              >
                <Radio className="size-4 mr-2" aria-hidden="true" />
                Start Practice Session
              </Button>
            </div>
          </div>
        )}

        {/* Practice Mode */}
        {mode === 'practice' && (
          <div className="space-y-6">
            {/* Scenario Header */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Scenario {practice.currentIndex + 1} of {scenarios.length}
              </span>
              <div className="flex items-center gap-2">
                {currentScenario.frequency && (
                  <div
                    className="px-3 py-1 rounded-md border bg-black/90 text-green-300 font-mono text-xs tracking-widest"
                    aria-label={`Frequency ${currentScenario.frequency}`}
                  >
                    {currentScenario.frequency}
                  </div>
                )}
                <span
                  className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    currentScenario.type === 'cq' &&
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                    currentScenario.type === 'report' &&
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                    currentScenario.type === 'etiquette' &&
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                    currentScenario.type === 'qsl' &&
                      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  )}
                >
                  {currentScenario.type.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Scenario Card */}
            <div className="p-6 rounded-xl bg-muted/30 border">
              <h3 className="font-semibold mb-3">{currentScenario.title}</h3>
              <div className="p-4 rounded-lg bg-background border mb-4">
                <p className="text-sm text-muted-foreground italic">{currentScenario.setup}</p>
              </div>
              <p className="font-medium flex items-center gap-2">
                <Mic className="size-4 text-rose-500" aria-hidden="true" />
                {currentScenario.prompt}
              </p>

              {/* Callsign pronunciation helper */}
              {currentScenario.pronounceCallsign && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => speak(spellCallsignString(currentScenario.pronounceCallsign!))}
                  >
                    <Volume2 className="size-4 mr-2" aria-hidden="true" />
                    Pronounce {currentScenario.pronounceCallsign}
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Uses ITU phonetics via your browser&apos;s speech engine
                  </span>
                </div>
              )}
            </div>

            {/* Hint Display */}
            {practice.showHint && currentScenario.hints && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                <p className="text-sm">
                  <strong>Hint:</strong> {currentScenario.hints[practice.hintIndex - 1]}
                </p>
              </div>
            )}

            {/* Answer Input */}
            {!practice.answered && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="qso-answer" className="sr-only">
                    Your response
                  </label>
                  <Input
                    id="qso-answer"
                    value={practice.userAnswer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPractice((prev) => ({ ...prev, userAnswer: e.target.value }))
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter' && practice.userAnswer.trim()) {
                        handleSubmit()
                      }
                    }}
                    placeholder="Type your response..."
                    className="text-lg"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={!practice.userAnswer.trim()}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    <Check className="size-4 mr-2" aria-hidden="true" />
                    Check Answer
                  </Button>
                  {currentScenario.hints && practice.hintIndex < currentScenario.hints.length && (
                    <Button variant="outline" onClick={handleShowHint}>
                      <BookOpen className="size-4 mr-2" aria-hidden="true" />
                      Hint
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Result Display */}
            {practice.answered && (
              <div className="space-y-4">
                <div
                  className={cn(
                    'p-4 rounded-lg',
                    practice.isCorrect
                      ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900'
                      : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900'
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {practice.isCorrect ? (
                      <>
                        <Check
                          className="size-5 text-green-600 dark:text-green-400"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-green-700 dark:text-green-300">
                          Correct!
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="size-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                        <span className="font-semibold text-red-700 dark:text-red-300">
                          Not quite right
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {practice.isCorrect
                      ? currentScenario.feedback.correct
                      : currentScenario.feedback.incorrect}
                  </p>
                  {!practice.isCorrect && (
                    <p className="text-sm mt-2">
                      <strong>Example answer:</strong>{' '}
                      <span className="font-mono text-rose-600 dark:text-rose-400">
                        {currentScenario.correctResponses[0]}
                      </span>
                    </p>
                  )}
                </div>

                <Button onClick={handleNext} className="w-full">
                  Next Scenario
                  <ChevronRight className="size-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            )}

            {/* Stats */}
            {score.total >= 2 && (
              <div className="pt-4 border-t">
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-2xl font-bold text-rose-500">{accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{score.correct}</div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{score.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            )}

            {/* Reset Button */}
            {score.total > 0 && (
              <div className="flex justify-center">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="size-4 mr-2" aria-hidden="true" />
                  Reset Session
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Exam Tips */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Exam Tips</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Always identify with your callsign at the start and end of a contact</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Check if the frequency is in use before calling CQ</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>
                73 means &quot;best regards&quot; - it&apos;s singular (not &quot;73s&quot;)
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
