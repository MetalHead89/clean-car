import { describe, test, expect, vitest, vi } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'

import UiWeatherForecast from '@/components/UiWeatherForecast.vue'

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
