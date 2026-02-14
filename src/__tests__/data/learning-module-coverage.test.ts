import { describe, it, expect } from 'vitest'

import { getQuestionPool } from '@/lib/question-scheduler'
import { getModulesForExamLevel } from '@/lib/learning-modules'

function sortIds(ids: string[]): string[] {
  return [...ids].sort()
}

describe('Learning modules cover the full question pool by group', () => {
  it('Technician: every group section includes all pool question IDs', async () => {
    const pool = await getQuestionPool('technician')
    const modules = getModulesForExamLevel('technician')
    const modulesById = new Map(modules.map((m) => [m.id, m]))

    const idsByGroup = new Map<string, string[]>()
    for (const q of pool) {
      const groupId = q.subelement + q.group // e.g., T1A
      const list = idsByGroup.get(groupId) ?? []
      list.push(q.id)
      idsByGroup.set(groupId, list)
    }

    for (const [groupId, groupQuestionIds] of idsByGroup) {
      const moduleId = groupId.slice(0, 2) // e.g., T1
      const moduleEntry = modulesById.get(moduleId)
      expect(moduleEntry, `Missing module for ${moduleId}`).toBeDefined()

      const section = moduleEntry!.sections.find((s) => s.id === groupId)
      expect(section, `Missing section ${groupId} in module ${moduleId}`).toBeDefined()

      expect(section!.content.trim().length, `Empty content for section ${groupId}`).toBeGreaterThan(
        0
      )
      expect(
        section!.relatedQuestionIds?.length,
        `Missing relatedQuestionIds for section ${groupId}`
      ).toBeGreaterThan(0)

      expect(sortIds(section!.relatedQuestionIds!), `Mismatched relatedQuestionIds for ${groupId}`)
        .toEqual(sortIds(groupQuestionIds))
    }
  })

  it('General: every group section includes all pool question IDs', async () => {
    const pool = await getQuestionPool('general')
    const modules = getModulesForExamLevel('general')
    const modulesById = new Map(modules.map((m) => [m.id, m]))

    const idsByGroup = new Map<string, string[]>()
    for (const q of pool) {
      const groupId = q.subelement + q.group // e.g., G1A
      const list = idsByGroup.get(groupId) ?? []
      list.push(q.id)
      idsByGroup.set(groupId, list)
    }

    for (const [groupId, groupQuestionIds] of idsByGroup) {
      const moduleId = groupId.slice(0, 2) // e.g., G1
      const moduleEntry = modulesById.get(moduleId)
      expect(moduleEntry, `Missing module for ${moduleId}`).toBeDefined()

      const section = moduleEntry!.sections.find((s) => s.id === groupId)
      expect(section, `Missing section ${groupId} in module ${moduleId}`).toBeDefined()

      expect(section!.content.trim().length, `Empty content for section ${groupId}`).toBeGreaterThan(
        0
      )
      expect(
        section!.relatedQuestionIds?.length,
        `Missing relatedQuestionIds for section ${groupId}`
      ).toBeGreaterThan(0)

      expect(sortIds(section!.relatedQuestionIds!), `Mismatched relatedQuestionIds for ${groupId}`)
        .toEqual(sortIds(groupQuestionIds))
    }
  })

  it('Extra: every group section includes all pool question IDs', async () => {
    const pool = await getQuestionPool('extra')
    const modules = getModulesForExamLevel('extra')
    const modulesById = new Map(modules.map((m) => [m.id, m]))

    const idsByGroup = new Map<string, string[]>()
    for (const q of pool) {
      const groupId = q.subelement + q.group // e.g., E1A
      const list = idsByGroup.get(groupId) ?? []
      list.push(q.id)
      idsByGroup.set(groupId, list)
    }

    for (const [groupId, groupQuestionIds] of idsByGroup) {
      const moduleId = groupId.slice(0, 2) // e.g., E1
      const moduleEntry = modulesById.get(moduleId)
      expect(moduleEntry, `Missing module for ${moduleId}`).toBeDefined()

      const section = moduleEntry!.sections.find((s) => s.id === groupId)
      expect(section, `Missing section ${groupId} in module ${moduleId}`).toBeDefined()

      expect(section!.content.trim().length, `Empty content for section ${groupId}`).toBeGreaterThan(
        0
      )
      expect(
        section!.relatedQuestionIds?.length,
        `Missing relatedQuestionIds for section ${groupId}`
      ).toBeGreaterThan(0)

      expect(sortIds(section!.relatedQuestionIds!), `Mismatched relatedQuestionIds for ${groupId}`)
        .toEqual(sortIds(groupQuestionIds))
    }
  })
})
