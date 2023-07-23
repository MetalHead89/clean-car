import { useMapStore } from '@/stores/map'

export function useWeather() {
  const { $api } = useNuxtApp()
  const mapStore = useMapStore()
  const coords = computed(() => {
    return mapStore.coords
  })

  const getWeather = () => {
    if (!coords.value) {
      return Promise.reject(null)
    }

    return Promise.all([
      $api.weather.getYesterdayWeather(coords.value),
      $api.weather.getForecastWeather(coords.value)
    ])
  }

  return { getWeather }
}
