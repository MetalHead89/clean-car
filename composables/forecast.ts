import { useMapStore } from '@/stores/map'

export function useForecast() {
  const { $api } = useNuxtApp()
  const mapStore = useMapStore()
  const coords = computed(() => {
    return mapStore.coords
  })

  const NO_DATA = 'Нет данных'
  const weatherForecast = ref(NO_DATA)

  onMounted(() => {
    getForecast()
  })

  watch(coords, () => {
    getForecast()
  })

  const getForecast = () => {
    if (!coords.value) {
      weatherForecast.value = NO_DATA
      return
    }

    Promise.all([
      $api.weather.getYesterdayWeather(coords.value),
      $api.weather.getForecastWeather(coords.value)
    ])
    .then(async ([yesterday, forecast]) => {
      weatherForecast.value = getCarWashForecast({ yesterday, forecast }) || NO_DATA
    })
    .catch(() => { weatherForecast.value = NO_DATA } )
  }

  return { weatherForecast }
}
