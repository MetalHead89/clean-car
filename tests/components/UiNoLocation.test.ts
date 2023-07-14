import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import UiNoLocation from '../../components/UiNoLocation.vue'

describe('UiNoLocation component', () => {
  it('UiNoLocation is mounted', () => {
    const wrapper = mount(UiNoLocation)
    expect(wrapper.vm).toBeTruthy()
  })
})