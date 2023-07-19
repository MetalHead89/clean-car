<template>
  <div class="weather-forecast">
    {{ weatherForecast }}
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from '@/stores/map'

const NO_DATA = 'Нет данных'

const mapStore = useMapStore()
const { $api } = useNuxtApp()
const weatherForecast = ref(NO_DATA)

const coords = computed(() => {
  return mapStore.coords
})

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
</script>

<style lang="scss" scoped>
$location-button-left: 20px;
$location-button-top: 20px;

.main-page {
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .location-link {
    position: absolute;
    left: $location-button-left;
    top: $location-button-top;
    text-decoration: none;
    font-size: 14px;
    color: $primary-text-color;
    cursor: pointer;
    transition: color $base-transition;
    max-width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      color: $hovered-text-color;
    }
  }

  @media screen and (min-width: $size-sm) {
    .location-link {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: $size-xl) {
    .location-link {
      top: get-vw($location-button-top);
      left: get-vw($location-button-left);
      font-size: get-vw(16px);
    }
  }
}
</style>
