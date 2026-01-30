/**
 * Setup Verification Test
 *
 * Ensures the test framework is properly configured
 */

import { describe, it, expect } from 'vitest'

describe('Test Framework Setup', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true)
  })

  it('should have localStorage mock available', () => {
    localStorage.setItem('test', 'value')
    expect(localStorage.getItem('test')).toBe('value')
  })

  it('should have sessionStorage mock available', () => {
    sessionStorage.setItem('test', 'value')
    expect(sessionStorage.getItem('test')).toBe('value')
  })

  it('should clear storage between tests', () => {
    // This test verifies that the previous test's storage was cleared
    expect(localStorage.getItem('test')).toBeNull()
    expect(sessionStorage.getItem('test')).toBeNull()
  })
})
