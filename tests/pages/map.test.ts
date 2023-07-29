import { beforeEach, describe, test, expect, vitest, vi, afterAll } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'

import map from '@/pages/map.vue'

describe('Back button', async () => {
  let page = await mountSuspended(map)
  let button = page.find('.close')
  let mockRoute = {
    name: 'map'
  }
  let mockRouter = {
    push: vitest.fn()
  }

  beforeEach(async () => {
    page = await mountSuspended(map, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    })
    button = page.find('.close')
  })

  afterAll(() => {
    vitest.clearAllMocks()
  })

  test('Back button is exists', async () => {
    expect(button).toBeTruthy()
  })

  test('Click by back button returns to index page', async () => {
    await button.trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'index' })
  })
})
