<template>
  <div id="map" />
</template>

<script setup>
import { useMapStore } from '@/stores/map'

let pin = null
let map = null

const mapStore = useMapStore()

onMounted(() => {
  ymaps.ready(init)
})

const init = () => {
  map = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
  })

  map.events.add('click', handleMapClick)

  if (mapStore.coords) {
    setPinCoords(mapStore.coords)
    changeCoords(mapStore.coords)
  }
}

const handleMapClick = (event) => {
  const coords = event.get('coords')
  setPinCoords(coords)
  changeCoords(coords)
}

const setPinCoords = (coords) => {
  if (pin) {
      pin.geometry.setCoordinates(coords)
  } else {
    pin = createPin(coords)
    map.geoObjects.add(pin)
    pin.events.add('dragend', handlePinDragend)
  }
}

const createPin = (coords) => {
  return new ymaps.Placemark(
    coords,
    { iconCaption: 'поиск...' },
    {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
    }
  )
}

const handlePinDragend = () => {
  changeCoords(pin.geometry.getCoordinates())
}

const changeCoords = (coords) => {
  pin.properties.set('iconCaption', 'поиск...')
  ymaps.geocode(coords)
    .then(handleAddressGeocode)
}

const handleAddressGeocode = (res) => {
  const firstGeoObject = res.geoObjects.get(0)
  const coords = firstGeoObject.geometry._coordinates
  const address = firstGeoObject.getAddressLine()

  mapStore.setLocation({ coords, address })

  pin.properties
    .set({
      iconCaption: [
        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
      ].filter(Boolean).join(', '),

      balloonContent: address
    })
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
