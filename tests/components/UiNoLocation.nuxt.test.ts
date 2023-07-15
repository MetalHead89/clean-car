import { describe, test, expect } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'

import UiNoLocation from '@/components/UiNoLocation.vue'

describe('UiNoLocation component', () => {
  test('UiNoLocation is mounted', () => {
    const component = mountSuspended(UiNoLocation)
    expect(component).toBeTruthy()
  })
})