import { coordsType, useMapStore } from '@/stores/map'
import { CookieRef } from 'nuxt/app'

export default defineNuxtPlugin(async _ => {
  const { $constants } = useNuxtApp()
  const mapStore = useMapStore()

  const coords = useCookie($constants.COORDS_COOKIE_KEY) as CookieRef<coordsType | undefined>
  const address = useCookie($constants.ADDRESS_COOKIE_KEY)
  const location = {
    coords: coords.value || null,
    address: address.value || ''
  }

  mapStore.setLocation(location)
})
