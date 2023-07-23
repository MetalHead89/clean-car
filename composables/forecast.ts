import { useMapStore } from '@/stores/map'
import { useWeather } from '@/composables/weather'

export function useForecast() {
  const { getWeather } = useWeather()

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

    getWeather()
      .then(async ([yesterday, forecast]) => {
        weatherForecast.value = getCarWashForecast({ yesterday, forecast }) || NO_DATA
      })
      .catch(() => { weatherForecast.value = NO_DATA } )
  }

  return { weatherForecast }
}
