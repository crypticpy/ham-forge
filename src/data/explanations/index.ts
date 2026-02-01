/**
 * Question Explanations Index
 * Provides lazy-loading lookup functions for explanations
 */

// Cache for loaded explanation modules by exam level prefix
const explanationCache = new Map<string, Record<string, string>>()

// Track loading promises to prevent duplicate imports
const loadingPromises = new Map<string, Promise<Record<string, string>>>()

/**
 * Get the exam level prefix from a question ID
 * @param questionId - The question ID (e.g., 'T1A01', 'G5B03')
 * @returns The prefix ('T' for technician, 'G' for general)
 */
function getExamPrefix(questionId: string): string {
  return questionId.charAt(0).toUpperCase()
}

/**
 * Get the subelement number from a question ID
 * @param questionId - The question ID (e.g., 'T1A01', 'G5B03')
 * @returns The subelement number (1-9, 0)
 */
function getSubelementNumber(questionId: string): string {
  return questionId.charAt(1)
}

/**
 * Load explanations for a given exam level and subelement range
 * @param prefix - The exam prefix ('T' or 'G')
 * @param subelementNum - The subelement number
 * @returns Promise resolving to the explanation record
 */
async function loadExplanationModule(
  prefix: string,
  subelementNum: string
): Promise<Record<string, string>> {
  const cacheKey = `${prefix}${subelementNum}`

  // Return cached if available
  if (explanationCache.has(cacheKey)) {
    return explanationCache.get(cacheKey)!
  }

  // Return existing loading promise if in progress
  if (loadingPromises.has(cacheKey)) {
    return loadingPromises.get(cacheKey)!
  }

  // Determine which module to load based on prefix and subelement
  let loadPromise: Promise<Record<string, string>>

  if (prefix === 'T') {
    // Technician explanations
    const num = parseInt(subelementNum, 10)
    if (num >= 1 && num <= 3) {
      loadPromise = import('./technician-t1-t3').then((m) => m.explanationsT1T3)
    } else if (num >= 4 && num <= 6) {
      loadPromise = import('./technician-t4-t6').then((m) => m.explanationsT4T6)
    } else {
      // T7, T8, T9, T0
      loadPromise = import('./technician-t7-t0').then((m) => m.explanationsT7T0)
    }
  } else if (prefix === 'G') {
    // General explanations
    const num = parseInt(subelementNum, 10)
    if (num >= 1 && num <= 5) {
      loadPromise = import('./general-g1-g5').then((m) => m.explanationsG1G5)
    } else {
      // G6, G7, G8, G9, G0
      loadPromise = import('./general-g6-g0').then((m) => m.explanationsG6G0)
    }
  } else {
    // Unknown prefix, return empty
    return {}
  }

  loadingPromises.set(cacheKey, loadPromise)

  try {
    const explanations = await loadPromise
    explanationCache.set(cacheKey, explanations)
    loadingPromises.delete(cacheKey)
    return explanations
  } catch (error) {
    loadingPromises.delete(cacheKey)
    console.error(`Failed to load explanations for ${cacheKey}:`, error)
    return {}
  }
}

/**
 * Get the explanation for a specific question (synchronous version)
 * Uses cached explanations only - returns undefined if not yet loaded
 * @param questionId - The question ID (e.g., 'T1A01', 'G5B03')
 * @returns The explanation string, or undefined if not found or not loaded
 */
export function getExplanation(questionId: string): string | undefined {
  const prefix = getExamPrefix(questionId)
  const subelementNum = getSubelementNumber(questionId)
  const cacheKey = `${prefix}${subelementNum}`

  const cached = explanationCache.get(cacheKey)
  if (cached) {
    return cached[questionId]
  }

  // Trigger async load for future calls (fire and forget)
  loadExplanationModule(prefix, subelementNum)

  return undefined
}

/**
 * Get the explanation for a specific question (async version)
 * Loads the explanation module if needed
 * @param questionId - The question ID (e.g., 'T1A01', 'G5B03')
 * @returns Promise resolving to the explanation string, or undefined if not found
 */
export async function getExplanationAsync(questionId: string): Promise<string | undefined> {
  const prefix = getExamPrefix(questionId)
  const subelementNum = getSubelementNumber(questionId)

  const explanations = await loadExplanationModule(prefix, subelementNum)
  return explanations[questionId]
}

/**
 * Check if an explanation exists for a question
 * Note: This is async as it may need to load the explanation module
 * @param questionId - The question ID to check
 * @returns Promise resolving to true if an explanation exists
 */
export async function hasExplanation(questionId: string): Promise<boolean> {
  const explanation = await getExplanationAsync(questionId)
  return explanation !== undefined
}

/**
 * Preload explanations for an exam level
 * Useful for preloading all explanations when entering a study session
 * @param examLevel - 'technician' or 'general'
 */
export async function preloadExplanations(examLevel: 'technician' | 'general'): Promise<void> {
  if (examLevel === 'technician') {
    await Promise.all([
      import('./technician-t1-t3').then((m) => {
        explanationCache.set('T1', m.explanationsT1T3)
        explanationCache.set('T2', m.explanationsT1T3)
        explanationCache.set('T3', m.explanationsT1T3)
      }),
      import('./technician-t4-t6').then((m) => {
        explanationCache.set('T4', m.explanationsT4T6)
        explanationCache.set('T5', m.explanationsT4T6)
        explanationCache.set('T6', m.explanationsT4T6)
      }),
      import('./technician-t7-t0').then((m) => {
        explanationCache.set('T7', m.explanationsT7T0)
        explanationCache.set('T8', m.explanationsT7T0)
        explanationCache.set('T9', m.explanationsT7T0)
        explanationCache.set('T0', m.explanationsT7T0)
      }),
    ])
  } else if (examLevel === 'general') {
    await Promise.all([
      import('./general-g1-g5').then((m) => {
        explanationCache.set('G1', m.explanationsG1G5)
        explanationCache.set('G2', m.explanationsG1G5)
        explanationCache.set('G3', m.explanationsG1G5)
        explanationCache.set('G4', m.explanationsG1G5)
        explanationCache.set('G5', m.explanationsG1G5)
      }),
      import('./general-g6-g0').then((m) => {
        explanationCache.set('G6', m.explanationsG6G0)
        explanationCache.set('G7', m.explanationsG6G0)
        explanationCache.set('G8', m.explanationsG6G0)
        explanationCache.set('G9', m.explanationsG6G0)
        explanationCache.set('G0', m.explanationsG6G0)
      }),
    ])
  }
}

/**
 * Get the total count of available explanations
 * Note: This requires loading all explanation modules
 * @returns Promise resolving to the number of explanations in the database
 */
export async function getExplanationCount(): Promise<number> {
  // Load all modules
  await Promise.all([preloadExplanations('technician'), preloadExplanations('general')])

  // Count unique explanations
  const allIds = new Set<string>()
  for (const explanations of explanationCache.values()) {
    for (const id of Object.keys(explanations)) {
      allIds.add(id)
    }
  }

  return allIds.size
}

// Re-export individual explanation sets for direct access if needed
export { explanationsT1T3 } from './technician-t1-t3'
export { explanationsT4T6 } from './technician-t4-t6'
export { explanationsT7T0 } from './technician-t7-t0'
export { explanationsG1G5 } from './general-g1-g5'
export { explanationsG6G0 } from './general-g6-g0'
