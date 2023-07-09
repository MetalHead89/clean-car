import { CookieRef, useCookie } from 'nuxt/app'
import { defineStore } from 'pinia'

export type coordsType = [number, number] | null
export type locationType = {
  coords: coordsType,
  address: string
}

export const useMapStore = defineStore('map', () => {
  const { $constants } = useNuxtApp()
  const coordsCookie = useCookie($constants.COORDS_COOKIE_KEY) as CookieRef<coordsType | undefined>
  const addressCookie = useCookie($constants.ADDRESS_COOKIE_KEY)

  const coords: Ref<coordsType> = ref(null)
  const address = ref('')

  const setLocation = ({ coords: currentCoords, address: currentAddress }: locationType) => {
    coords.value = currentCoords
    coordsCookie.value = currentCoords
    address.value = currentAddress
    addressCookie.value = currentAddress
  }

  return { coords, address, setLocation }
})
