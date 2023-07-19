import { beforeEach, describe, test, expect, vitest, vi } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'
import { createTestingPinia } from '@pinia/testing'

import Index from '@/pages/index.vue'
import { useMapStore } from '@/stores/map'

describe('Mount index page', () => {
  test('Index page is mounted', async () => {
    const component = await mountSuspended(Index)
    expect(component).toBeTruthy()
  })
})

describe('Show elements', async () => {
  let page = await mountSuspended(Index)
  let mapStore = useMapStore()

  beforeEach(async () => {
    mapStore = useMapStore()

    page = await mountSuspended(Index, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vitest.fn,
            initialState: {
              coords: null
            }
          })
        ]
      }
    })
  })

  test('No location section is showed', async () => {
    expect(page.html()).contains('class="no-location"')
  })

  test('Weather-forecast section is showed', async () => {
    mapStore.coords = [20, 20]
    await nextTick()
    expect(page.html()).contains('Нет данных')
  })

  test('No location section is not showed', async () => {
    mapStore.coords = [20, 20]
    await nextTick()
    expect(page.html()).not.contains('class="no-location"')
  })

  test('Weather-forecast section is not showed', async () => {
    mapStore.coords = null
    await nextTick()
    expect(page.html()).not.contains('class="no-data"')
  })
})

describe('Address link', () => {
  test('Address link text is "Мое местоположение"', async () => {
    const page = await mountSuspended(Index)
    expect(page.html()).contains('Мое местоположение')
  })

  test('Address link text is "Город Канск"', async () => {
    const page = await mountSuspended(Index)
    const mapStore = useMapStore()

    mapStore.address = 'Город Канск'
    await nextTick()

    expect(page.html()).contains('Город Канск')
  })
})
