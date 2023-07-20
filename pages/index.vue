<template>
  <div class="main-page">
    <Nuxt-Link
      :to="{ name: 'map' }"
      class="location-link"
    >
      {{ mapStore.address || 'Мое местоположение' }}
    </Nuxt-Link>

    <UiNoLocation v-if="!mapStore.coords" />
    <UiWeatherForecast v-else />
  </div>
</template>

<script setup lang="ts">

import { useMapStore } from '@/stores/map'

const mapStore = useMapStore()
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
