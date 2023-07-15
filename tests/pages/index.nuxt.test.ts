import { describe, test, expect } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'

import Index from '@/pages/index.vue'

describe('UiNoLocation component', () => {
  test('UiNoLocation is mounted', async () => {
    const component = await mountSuspended(Index)
    expect(component).toBeTruthy()
  })
})
