import { CookieRef, useCookie } from 'nuxt/app'
import { defineStore } from 'pinia'

export type coordsType = [number, number] | null
export type locationType = {
  coords: coordsType,
  address: string
}

export const useMapStore = defineStore('map', () => {
  const cookieExpires = new Date(new Date().setDate(new Date().getDate() + 30))
  const { $constants } = useNuxtApp()
  const coordsCookie =
    useCookie($constants.COORDS_COOKIE_KEY, { expires: cookieExpires }) as CookieRef<coordsType | undefined>
  const addressCookie =
    useCookie($constants.ADDRESS_COOKIE_KEY, { expires: cookieExpires })

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
