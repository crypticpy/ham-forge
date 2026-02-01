'use client'

import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, BookOpen, Check, X, RotateCcw, Zap, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QCode {
  code: string
  meaning: string
  category: 'interference' | 'signal' | 'location' | 'frequency' | 'procedure' | 'other'
  examRelevant: boolean
}

const qCodes: QCode[] = [
  // Most exam-relevant codes
  {
    code: 'QRM',
    meaning: 'Interference from other stations',
    category: 'interference',
    examRelevant: true,
  },
  {
    code: 'QRN',
    meaning: 'Interference from natural noise (static)',
    category: 'interference',
    examRelevant: true,
  },
  { code: 'QSY', meaning: 'Change frequency', category: 'frequency', examRelevant: true },
  { code: 'QTH', meaning: 'Location/address', category: 'location', examRelevant: true },
  {
    code: 'QSL',
    meaning: 'Acknowledge receipt / confirmation card',
    category: 'procedure',
    examRelevant: true,
  },
  { code: 'QSO', meaning: 'A conversation or contact', category: 'procedure', examRelevant: true },
  { code: 'QRZ', meaning: 'Who is calling me?', category: 'procedure', examRelevant: true },

  // Additional common codes
  {
    code: 'QRP',
    meaning: 'Low power operation (typically 5W or less)',
    category: 'signal',
    examRelevant: true,
  },
  { code: 'QRO', meaning: 'High power operation', category: 'signal', examRelevant: false },
  { code: 'QRS', meaning: 'Send slower (CW)', category: 'procedure', examRelevant: false },
  { code: 'QRQ', meaning: 'Send faster (CW)', category: 'procedure', examRelevant: false },
  {
    code: 'QRT',
    meaning: 'Stop sending / going off air',
    category: 'procedure',
    examRelevant: false,
  },
  { code: 'QRX', meaning: 'Stand by / wait', category: 'procedure', examRelevant: false },
  { code: 'QSB', meaning: 'Signal fading', category: 'signal', examRelevant: false },
  { code: 'QRV', meaning: 'Ready to receive', category: 'procedure', examRelevant: false },
  { code: 'QRL', meaning: 'Is the frequency in use?', category: 'frequency', examRelevant: false },
  { code: 'QSK', meaning: 'Break-in keying (CW)', category: 'procedure', examRelevant: false },
]

const categories = [
  { id: 'all', label: 'All', icon: BookOpen },
  { id: 'interference', label: 'Interference', icon: Zap },
  { id: 'signal', label: 'Signal', icon: Zap },
  { id: 'frequency', label: 'Frequency', icon: Zap },
  { id: 'procedure', label: 'Procedure', icon: Zap },
  { id: 'location', label: 'Location', icon: Zap },
]

type Mode = 'reference' | 'quiz'

interface QuizState {
  currentCode: QCode
  options: string[]
  answered: boolean
  isCorrect: boolean | null
}

/**
 * Interactive Q-Code Reference and Quiz
 *
 * Features:
 * - Searchable Q-code database
 * - Category filtering
 * - Quiz mode with multiple choice
 * - Highlights exam-relevant codes
 * - Score tracking
 */
export function QCodeReference() {
  const [mode, setMode] = useState<Mode>('reference')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [quiz, setQuiz] = useState<QuizState | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showExamOnly, setShowExamOnly] = useState(false)

  // Filter codes based on search and category
  const filteredCodes = useMemo(() => {
    return qCodes.filter((code) => {
      const matchesSearch =
        code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || code.category === selectedCategory
      const matchesExamFilter = !showExamOnly || code.examRelevant
      return matchesSearch && matchesCategory && matchesExamFilter
    })
  }, [searchTerm, selectedCategory, showExamOnly])

  // Generate a quiz question
  const generateQuestion = useCallback(() => {
    const examCodes = qCodes.filter((c) => c.examRelevant)
    const randomCode = examCodes[Math.floor(Math.random() * examCodes.length)]

    // Get 3 random wrong answers
    const wrongAnswers = qCodes
      .filter((c) => c.code !== randomCode.code)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.meaning)

    const options = [...wrongAnswers, randomCode.meaning].sort(() => Math.random() - 0.5)

    setQuiz({
      currentCode: randomCode,
      options,
      answered: false,
      isCorrect: null,
    })
  }, [])

  // Handle quiz answer
  const handleAnswer = (answer: string) => {
    if (!quiz || quiz.answered) return

    const isCorrect = answer === quiz.currentCode.meaning

    setQuiz({
      ...quiz,
      answered: true,
      isCorrect,
    })

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
  }

  // Reset quiz
  const handleResetQuiz = () => {
    setScore({ correct: 0, total: 0 })
    generateQuestion()
  }

  // Start quiz mode
  const startQuiz = () => {
    setMode('quiz')
    generateQuestion()
  }

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg">
            <HelpCircle className="size-5 text-primary" aria-hidden="true" />
            Q-Code Reference
          </span>
          {mode === 'quiz' && (
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
            onClick={() => setMode('reference')}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === 'reference'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Reference
          </button>
          <button
            onClick={startQuiz}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === 'quiz'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Quiz Mode
          </button>
        </div>

        {/* Reference Mode */}
        {mode === 'reference' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search Q-codes..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      'px-3 py-1 text-xs rounded-full transition-colors',
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowExamOnly(!showExamOnly)}
                className={cn(
                  'px-3 py-1 text-xs rounded-full transition-colors ml-auto',
                  showExamOnly
                    ? 'bg-amber-500 text-white'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                )}
              >
                Exam Focus
              </button>
            </div>

            {/* Code List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredCodes.map((code) => (
                <div
                  key={code.code}
                  className={cn(
                    'p-3 rounded-lg border transition-colors',
                    code.examRelevant
                      ? 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'border-border bg-muted/30'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="font-mono font-bold text-lg text-primary min-w-[50px]">
                      {code.code}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{code.meaning}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground capitalize">
                          {code.category}
                        </span>
                        {code.examRelevant && (
                          <span className="text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400">
                            Exam
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCodes.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No Q-codes match your search
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quiz Mode */}
        {mode === 'quiz' && quiz && (
          <div className="space-y-6">
            {/* Question */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">What does this Q-code mean?</p>
              <div
                className={cn(
                  'inline-flex items-center justify-center px-8 py-4 rounded-xl text-4xl font-mono font-bold transition-all',
                  quiz.answered
                    ? quiz.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'bg-primary/10 text-primary'
                )}
              >
                {quiz.currentCode.code}
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-2">
              {quiz.options.map((option, index) => {
                const isCorrectOption = option === quiz.currentCode.meaning
                const showResult = quiz.answered

                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswer(option)}
                    disabled={quiz.answered}
                    className={cn(
                      'w-full h-auto py-3 px-4 text-left justify-start whitespace-normal',
                      showResult &&
                        isCorrectOption &&
                        'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300',
                      showResult && !isCorrectOption && 'opacity-50'
                    )}
                  >
                    <span className="flex-1">{option}</span>
                    {showResult && isCorrectOption && (
                      <Check className="size-5 ml-2 text-green-600 flex-shrink-0" />
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
                          {quiz.currentCode.code} = {quiz.currentCode.meaning}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button onClick={generateQuestion}>Next Question</Button>
                </div>
              </div>
            )}

            {/* Stats */}
            {score.total >= 3 && (
              <div className="pt-4 border-t">
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{accuracy}%</div>
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
                <Button variant="outline" onClick={handleResetQuiz}>
                  <RotateCcw className="size-4 mr-2" />
                  Reset Score
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Exam Tips */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
            Key Q-Codes for the Exam
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 rounded bg-muted/50">
              <span className="font-mono font-bold text-primary">QRM</span>
              <span className="text-muted-foreground ml-2">= Station interference</span>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <span className="font-mono font-bold text-primary">QRN</span>
              <span className="text-muted-foreground ml-2">= Natural noise/static</span>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <span className="font-mono font-bold text-primary">QSY</span>
              <span className="text-muted-foreground ml-2">= Change frequency</span>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <span className="font-mono font-bold text-primary">QTH</span>
              <span className="text-muted-foreground ml-2">= Location</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
