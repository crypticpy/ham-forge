'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, X, RotateCcw, Zap, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFlashcardStore } from '@/stores/flashcard-store'
import { ITU_PHONETIC_ALPHABET, spellCallsignToWords } from '@/lib/phonetics'

// Common wrong answers for multiple choice
const distractors: Record<string, string[]> = {
  A: ['Adam', 'Able', 'America'],
  B: ['Baker', 'Boy', 'Boston'],
  C: ['Carol', 'Chicago', 'Cat'],
  D: ['David', 'Dog', 'Denver'],
  E: ['Easy', 'Edward', 'Europe'],
  F: ['Frank', 'Fox', 'Florida'],
  G: ['George', 'Green', 'Germany'],
  H: ['Henry', 'Happy', 'Houston'],
  I: ['Ida', 'Italy', 'Igloo'],
  J: ['John', 'Japan', 'Jack'],
  K: ['King', 'Kansas', 'Knight'],
  L: ['Lincoln', 'London', 'Larry'],
  M: ['Mary', 'Miami', 'Mexico'],
  N: ['Nancy', 'New York', 'Norway'],
  O: ['Ocean', 'Oliver', 'Ohio'],
  P: ['Peter', 'Paris', 'Paul'],
  Q: ['Queen', 'Quiet', 'Quest'],
  R: ['Roger', 'Robert', 'Russia'],
  S: ['Sugar', 'Sam', 'Spain'],
  T: ['Tom', 'Texas', 'Turkey'],
  U: ['Uncle', 'Utah', 'United'],
  V: ['Vincent', 'Venus', 'Virginia'],
  W: ['William', 'Washington', 'Walter'],
  X: ['Xavier', 'X-men', 'Xena'],
  Y: ['Yellow', 'York', 'Young'],
  Z: ['Zebra', 'Zero', 'Zone'],
}

type Mode = 'quiz' | 'callsign' | 'results'

interface QuizState {
  currentLetter: string
  options: string[]
  correctAnswer: string
  answered: boolean
  isCorrect: boolean | null
}

function createQuizQuestion(): QuizState {
  const letters = Object.keys(ITU_PHONETIC_ALPHABET).filter((k) => k.match(/^[A-Z]$/))
  const randomLetter = letters[Math.floor(Math.random() * letters.length)]
  const correctAnswer = ITU_PHONETIC_ALPHABET[randomLetter]
  const letterDistractors = distractors[randomLetter] || ['Unknown', 'Mystery', 'Hidden']
  const shuffledDistractors = [...letterDistractors].sort(() => Math.random() - 0.5).slice(0, 3)
  const options = [...shuffledDistractors, correctAnswer].sort(() => Math.random() - 0.5)

  return {
    currentLetter: randomLetter,
    options,
    correctAnswer,
    answered: false,
    isCorrect: null,
  }
}

/**
 * Interactive Phonetic Alphabet Trainer
 *
 * Features:
 * - Flash card quiz mode
 * - Callsign spelling practice
 * - Score tracking
 * - Audio pronunciation (using Web Speech API)
 */
export function PhoneticTrainer() {
  const [mode, setMode] = useState<Mode>('quiz')
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [quiz, setQuiz] = useState<QuizState>(() => createQuizQuestion())
  const [callsign, setCallsign] = useState('')
  const [spelledCallsign, setSpelledCallsign] = useState<string[]>([])
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  const updateSkillProgress = useFlashcardStore((s) => s.updateSkillProgress)

  // Generate a new quiz question
  const generateQuestion = useCallback(() => {
    setQuiz(createQuizQuestion())
  }, [])

  // Handle answer selection
  const handleAnswer = (selected: string) => {
    if (quiz.answered) return

    const isCorrect = selected === quiz.correctAnswer

    setQuiz({
      ...quiz,
      answered: true,
      isCorrect,
    })

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))

    if (isCorrect) {
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > bestStreak) {
        setBestStreak(newStreak)
      }
    } else {
      setStreak(0)
    }

    // Track procedural skill mastery
    updateSkillProgress('phonetic', isCorrect)
  }

  // Proceed to next question
  const handleNext = () => {
    generateQuestion()
  }

  // Speak the phonetic using Web Speech API
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  // Spell out a callsign
  const spellCallsign = useCallback(() => {
    const spelled = spellCallsignToWords(callsign)
    setSpelledCallsign(spelled)

    // Speak it
    const spokenText = spelled.join(' ')
    speak(spokenText)
  }, [callsign])

  // Reset everything
  const handleReset = () => {
    setScore({ correct: 0, total: 0 })
    setStreak(0)
    setBestStreak(0)
    generateQuestion()
    setMode('quiz')
  }

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg">
            <Volume2 className="size-5 text-primary" aria-hidden="true" />
            Phonetic Alphabet Trainer
          </span>
          {mode === 'quiz' && (
            <div className="flex items-center gap-3 text-sm font-normal">
              <span className="text-muted-foreground">
                Score: {score.correct}/{score.total}
              </span>
              {streak > 2 && (
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Zap className="size-4" /> {streak} streak!
                </span>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode tabs */}
        <div role="tablist" aria-label="Training mode selection" className="flex border-b">
          <button
            role="tab"
            id="quiz-tab"
            aria-selected={mode === 'quiz'}
            aria-controls="quiz-panel"
            tabIndex={mode === 'quiz' ? 0 : -1}
            onClick={() => setMode('quiz')}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault()
                setMode(mode === 'quiz' ? 'callsign' : 'quiz')
              }
            }}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === 'quiz'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Quiz Mode
          </button>
          <button
            role="tab"
            id="callsign-tab"
            aria-selected={mode === 'callsign'}
            aria-controls="callsign-panel"
            tabIndex={mode === 'callsign' ? 0 : -1}
            onClick={() => setMode('callsign')}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault()
                setMode(mode === 'quiz' ? 'callsign' : 'quiz')
              }
            }}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === 'callsign'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Spell Callsign
          </button>
        </div>

        {/* Quiz Mode */}
        {mode === 'quiz' && (
          <div role="tabpanel" id="quiz-panel" aria-labelledby="quiz-tab" className="space-y-6">
            {/* Letter Display */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">What is the phonetic for:</p>
              <div
                className={cn(
                  'inline-flex items-center justify-center size-24 rounded-2xl text-5xl font-bold transition-all',
                  quiz.answered
                    ? quiz.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'bg-primary/10 text-primary'
                )}
              >
                {quiz.currentLetter}
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {quiz.options.map((option) => {
                const isCorrectOption = option === quiz.correctAnswer
                const showResult = quiz.answered

                return (
                  <Button
                    key={option}
                    variant="outline"
                    size="lg"
                    onClick={() => handleAnswer(option)}
                    disabled={quiz.answered}
                    className={cn(
                      'h-14 text-lg transition-all',
                      showResult &&
                        isCorrectOption &&
                        'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300',
                      showResult && !isCorrectOption && 'opacity-50'
                    )}
                  >
                    {option}
                    {showResult && isCorrectOption && (
                      <Check className="size-5 ml-2 text-green-600" />
                    )}
                  </Button>
                )
              })}
            </div>

            {/* Result and Next */}
            {quiz.answered && (
              <div className="space-y-4">
                <div
                  className={cn(
                    'p-4 rounded-lg text-center',
                    quiz.isCorrect
                      ? 'bg-green-50 dark:bg-green-950/30'
                      : 'bg-red-50 dark:bg-red-950/30'
                  )}
                >
                  {quiz.isCorrect ? (
                    <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
                      <Check className="size-5" />
                      <span className="font-semibold">Correct!</span>
                    </div>
                  ) : (
                    <div className="text-red-700 dark:text-red-300">
                      <div className="flex items-center justify-center gap-2">
                        <X className="size-5" />
                        <span className="font-semibold">
                          The correct answer is: {quiz.correctAnswer}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => speak(quiz.correctAnswer)}>
                    <Volume2 className="size-4 mr-2" />
                    Hear It
                  </Button>
                  <Button onClick={handleNext}>Next Question</Button>
                </div>
              </div>
            )}

            {/* Stats */}
            {score.total >= 5 && (
              <div className="pt-4 border-t">
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {bestStreak}
                    </div>
                    <div className="text-xs text-muted-foreground">Best Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{score.total}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Callsign Mode */}
        {mode === 'callsign' && (
          <div
            role="tabpanel"
            id="callsign-panel"
            aria-labelledby="callsign-tab"
            className="space-y-6"
          >
            <div className="space-y-3">
              <Label htmlFor="callsign">Enter a callsign to spell phonetically:</Label>
              <div className="flex gap-2">
                <Input
                  id="callsign"
                  value={callsign}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCallsign(e.target.value.toUpperCase())
                  }
                  placeholder="W1AW"
                  className="text-lg font-mono uppercase"
                  maxLength={10}
                />
                <Button onClick={spellCallsign} disabled={!callsign}>
                  <Volume2 className="size-4 mr-2" />
                  Spell It
                </Button>
              </div>
            </div>

            {spelledCallsign.length > 0 && (
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-3">Phonetic Spelling:</h4>
                <div className="flex flex-wrap gap-2">
                  {callsign.split('').map((char, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-3 rounded-lg bg-background border min-w-[80px]"
                    >
                      <span className="text-2xl font-bold text-primary">{char}</span>
                      <span className="text-sm text-muted-foreground">
                        {spelledCallsign[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Reference */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                Common Callsign Prefixes
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                {['W', 'K', 'N', 'AA-AL', 'KA-KZ', 'NA-NZ', 'WA-WZ'].map((prefix) => (
                  <button
                    key={prefix}
                    onClick={() => {
                      if (prefix.length === 1) {
                        setCallsign(prefix + '1ABC')
                      }
                    }}
                    className={cn(
                      'p-2 rounded border text-center hover:bg-muted transition-colors',
                      prefix.length === 1 && 'cursor-pointer'
                    )}
                  >
                    {prefix}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reset button */}
        {mode === 'quiz' && score.total > 0 && (
          <div className="flex justify-center pt-4 border-t">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="size-4 mr-2" />
              Reset Score
            </Button>
          </div>
        )}

        {/* Key Facts */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Exam Tips</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>The ITU phonetic alphabet is used internationally for clarity</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Always use phonetics when spelling your callsign on the air</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Numbers are spoken as words: &quot;Five&quot; not &quot;Fife&quot;</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
