import { describe, test, expect, vitest, vi } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'
import { createTestingPinia } from '@pinia/testing'

import UiWeatherForecast from '@/components/UiWeatherForecast.vue'
import { useMapStore } from '@/stores/map'

describe('UiWeatherForecast component', () => {
  test('UiWeatherForecast is mounted', () => {
    const component = mountSuspended(UiWeatherForecast)
    expect(component).toBeTruthy()
  })

  test('Forecast text should be "Нет данных"', async () => {
    const component = await mountSuspended(UiWeatherForecast)
    const forecast = component.find('.weather-forecast')

    expect(forecast.text()).toBe('Нет данных')
  })
})
