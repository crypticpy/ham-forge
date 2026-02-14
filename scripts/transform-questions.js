#!/usr/bin/env node

/**
 * Transform question pool data from russolsen/ham_radio_question_pool format
 * to our QuestionPool format.
 */

const fs = require('fs')
const path = require('path')

// Figure reference patterns and their normalized names
const figurePatterns = [
  { pattern: /figure\s+T-1/i, figure: 'T1' },
  { pattern: /figure\s+T-2/i, figure: 'T2' },
  { pattern: /figure\s+T-3/i, figure: 'T3' },
  { pattern: /figure\s+G7-1/i, figure: 'G7-1' },
  { pattern: /Figure\s+G7-1/i, figure: 'G7-1' },
  // Extra (2024-2028) figures
  { pattern: /figure\s+E5-1/i, figure: 'E5-1' },
  { pattern: /figure\s+E6-1/i, figure: 'E6-1' },
  { pattern: /figure\s+E6-2/i, figure: 'E6-2' },
  { pattern: /figure\s+E6-3/i, figure: 'E6-3' },
  { pattern: /figure\s+E7-1/i, figure: 'E7-1' },
  { pattern: /figure\s+E7-2/i, figure: 'E7-2' },
  { pattern: /figure\s+E7-3/i, figure: 'E7-3' },
  { pattern: /figure\s+E9-1/i, figure: 'E9-1' },
  { pattern: /figure\s+E9-2/i, figure: 'E9-2' },
]

/**
 * Extract figure reference from question text
 */
function extractFigure(questionText) {
  for (const { pattern, figure } of figurePatterns) {
    if (pattern.test(questionText)) {
      return figure
    }
  }
  return undefined
}

/**
 * Extract subelement from question ID (e.g., 'T1A01' -> 'T1')
 */
function extractSubelement(id) {
  // Match pattern like T1, T2, G1, G2, etc.
  const match = id.match(/^([TGE]\d+)/)
  return match ? match[1] : ''
}

/**
 * Extract group from question ID (e.g., 'T1A01' -> 'A')
 */
function extractGroup(id) {
  // Match pattern like T1A01 -> 'A'
  const match = id.match(/^[TGE]\d+([A-Z])/)
  return match ? match[1] : ''
}

/**
 * Transform a single question from russolsen format to our format
 */
function transformQuestion(rawQuestion) {
  const figure = extractFigure(rawQuestion.question)

  const transformed = {
    id: rawQuestion.id,
    subelement: extractSubelement(rawQuestion.id),
    group: extractGroup(rawQuestion.id),
    question: rawQuestion.question,
    answers: rawQuestion.answers,
    correctAnswer: rawQuestion.correct,
  }

  // Only add optional fields if they have values
  if (figure) {
    transformed.figure = figure
  }
  if (rawQuestion.refs) {
    transformed.refs = rawQuestion.refs
  }

  return transformed
}

/**
 * Transform an entire question pool
 */
function transformPool(rawQuestions, config) {
  const questions = rawQuestions.map(transformQuestion)

  return {
    examLevel: config.examLevel,
    effectiveFrom: config.effectiveFrom,
    effectiveTo: config.effectiveTo,
    questions,
  }
}

// Pool configurations
const poolConfigs = {
  technician: {
    examLevel: 'technician',
    effectiveFrom: '2022-07-01',
    effectiveTo: '2026-06-30',
    inputFile: 'tech_raw.json',
    outputFile: 'technician.json',
  },
  general: {
    examLevel: 'general',
    effectiveFrom: '2023-07-01',
    effectiveTo: '2027-06-30',
    inputFile: 'general_raw.json',
    outputFile: 'general.json',
  },
  extra: {
    examLevel: 'extra',
    effectiveFrom: '2024-07-01',
    effectiveTo: '2028-06-30',
    inputFile: 'extra_raw.json',
    outputFile: 'extra.json',
  },
}

// Main execution
const poolsDir = path.join(__dirname, '..', 'src', 'data', 'pools')

for (const [name, config] of Object.entries(poolConfigs)) {
  const inputPath = path.join(poolsDir, config.inputFile)
  const outputPath = path.join(poolsDir, config.outputFile)

  try {
    console.log(`Processing ${name} pool...`)

    const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
    const transformed = transformPool(rawData, config)

    fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2))

    // Count figures
    const figureCount = transformed.questions.filter((q) => q.figure).length

    console.log(`  - Input: ${inputPath}`)
    console.log(`  - Output: ${outputPath}`)
    console.log(`  - Questions: ${transformed.questions.length}`)
    console.log(`  - Questions with figures: ${figureCount}`)
    console.log(`  - Effective: ${config.effectiveFrom} to ${config.effectiveTo}`)
    console.log('')
  } catch (error) {
    console.error(`Error processing ${name}: ${error.message}`)
    process.exit(1)
  }
}

console.log('Transformation complete!')
