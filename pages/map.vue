<template>
  <div class="map-page">
    <button
      class="close"
      type="button"
      @click="handleCloseClick"
    >
      <i class="icon-cross" />
    </button>
    <div id="map" />
  </div>
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
      zoom: 7,
      controls: [
      'zoomControl',
      'searchControl',
      'geolocationControl'
      ]
  })

  map.addControl(new ymaps.ScaleLine())
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

const router = useRouter()

const handleCloseClick = () => {
  router.push({ name: 'index' })
}
</script>

<style lang="scss" scoped>
.map-page {
  width: 100%;
  height: 100%;
  position: relative;

#map {
  width: 100%;
  height: 100%;
}
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1;
    margin: 0;
    padding: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $white;
    border: none;
    border-radius: 3px;
    box-shadow: 0 1px 2px 1px rgba(0,0,0,.15),0 2px 5px -3px rgba(0,0,0,.15);
    cursor: pointer;
  }
}
</style>
