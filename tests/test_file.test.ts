import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import defaultLayout from '../layouts/default.vue'

describe('HelloWorld', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(defaultLayout)
    expect(wrapper.vm).toBeTruthy()
  })
})