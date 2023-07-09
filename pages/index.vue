<template>
  <div class="main-page">
    <Nuxt-Link
      :to="{ name: 'map' }"
      class="location-link"
    >
      {{ mapStore.address || 'Мое местоположение' }}
    </Nuxt-Link>
    <!-- <button class="location-button">
      Мое местоположение
    </button> -->

    <ui-no-location v-if="!mapStore.coords" />

    <div v-else-if="weather">
      <div>{{ `Температура: ${weather.temp_c}` }}</div>
      <div>{{ weather.condition.text }}</div>
    </div>

    <div v-else>
      Нет данных
    </div>
  </div>
</template>

<script setup lang="ts">
type currentWeatherType = {
  temp_c: number,
  condition: {
      text: string
  }
}

type weatherResponseType = {
  current: currentWeatherType
}

import { useMapStore } from '@/stores/map'
import { NuxtApp } from 'nuxt/app';

const mapStore = useMapStore()
// const config = useRuntimeConfig()
const { $api } = useNuxtApp()
const weather: Ref<currentWeatherType | null> = ref(null)

onMounted(() => {
  if (!mapStore.coords) {
    return
  }


  $api.weather.getYesterdayWeather(mapStore.coords)
  // const query = {
  //   key: config.public.weatherApiKey,
  //   q: mapStore.coords.join(',')
  // }
  // $fetch<weatherResponseType>('http://api.weatherapi.com/v1/current.json', { query })
  //   .then(({ current })  => {
  //     weather.value = current
  //   })
})
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


  // .location-button {
  //   position: absolute;
  //   left: $location-button-left;
  //   top: $location-button-top;
  //   background: none;
  //   border: none;
  //   font-size: 14px;
  //   color: $primary-text-color;
  //   padding: 0;
  //   margin: 0;
  //   cursor: pointer;
  //   transition: color $base-transition;

  //   &:hover {
  //     color: $hovered-text-color;
  //   }
  // }

  @media screen and (min-width: $size-sm) {
    .location-link {
      font-size: 1rem;
    }
    // .location-button {
    //   font-size: 1rem;
    // }
  }

  @media screen and (min-width: $size-xl) {
    .location-link {
      top: get-vw($location-button-top);
      left: get-vw($location-button-left);
      font-size: get-vw(16px);
    }
    // .location-button {
    //   top: get-vw($location-button-top);
    //   left: get-vw($location-button-left);
    //   font-size: get-vw(16px);
    // }
  }
}
</style>
