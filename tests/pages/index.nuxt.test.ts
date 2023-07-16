import { beforeEach, describe, test, expect, vitest, vi } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'
import { createTestingPinia } from '@pinia/testing'

import Index from '@/pages/index.vue'
// import { createPinia, mapStores, setActivePinia } from 'pinia'
import { useMapStore } from '@/stores/map'

describe('Mount index page', () => {
  test('Index page is mounted', async () => {
    const component = await mountSuspended(Index)
    expect(component).toBeTruthy()
  })
})

describe('Show elements', async () => {
  let page = await mountSuspended(Index)

  beforeEach(async () => {
    page = await mountSuspended(Index, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vitest.fn
          })
        ]
      }
    })
  })

  test('No location section is showed', async () => {
    expect(page.html()).contains('class="no-location"')
  })

  // test('Weather forecast section is showed', async () => {
  //   page = await mountSuspended(Index, {
  //     loadWeather: () => {
  //       weatherForecast.value = 'data'
  //     }
  //   })

  //   // page = await mountSuspended(Index, {
  //   //   loadWeather: () => {
  //   //     weatherForecast = 'data'
  //   //   }
  //   // })

  //   expect(page.html()).contains('class="no-location"')
  // })

  test('Weather no-data section is showed', async () => {
    const mapStore = useMapStore()
    mapStore.coords = [20, 20]
    await nextTick()
    expect(page.html()).contains('class="no-data"')
  })
})
