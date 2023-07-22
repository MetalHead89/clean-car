import { describe, test, expect, vi } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'

import UiWeatherForecast from '@/components/UiWeatherForecast.vue'
import { useForecast } from '@/composables/forecast'

vi.mock('@/composables/forecast', () => {
  return {
    useForecast: vi.fn(() => ({
      weatherForecast: ref('Нет данных')
    }))
  }
})

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

  test('Forecast text should be "Ideal', async () => {
    vi.mocked(useForecast).mockReturnValue({ weatherForecast: ref('Ideal')})

    const component = await mountSuspended(UiWeatherForecast)
    const forecast = component.find('.weather-forecast')

    expect(forecast.text()).toBe('Ideal')
  })
})
