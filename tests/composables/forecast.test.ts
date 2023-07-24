import { afterEach, beforeEach, describe, test, expect, vi } from 'vitest'
import { setActivePinia, createPinia, mapStores } from 'pinia'

import { useForecast } from '@/composables/forecast'
import { useMapStore } from '@/stores/map'

const getWeather = vi.fn(() => Promise.resolve())

vi.mock('@/composables/weather', () => {
  return {
    useWeather: vi.fn(() => ({
      getWeather
    }))
  }
})

vi.mock('@/utils/getCarWashForecast', () => {
  return {
    default: () => 'Ideal'
  }
})

describe('Forecast composable', async () => {
  let mapStore = useMapStore()

  beforeEach(async () => {
    setActivePinia(createPinia())
    mapStore = useMapStore()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('getWeather function should not be called', async () => {
    useForecast()
    expect(getWeather).toBeCalledTimes(0)
  })

  test('After changing the coordinates, the getWeather function should be called', async () => {
    useForecast()
    mapStore.coords = [20, 20]
    await nextTick()

    expect(getWeather).toBeCalledTimes(1)
  })

  test('After changing the coordinates, the getWeather function should not be called', async () => {
    useForecast()
    mapStore.coords = null
    await nextTick()

    expect(getWeather).toBeCalledTimes(0)
  })
})
