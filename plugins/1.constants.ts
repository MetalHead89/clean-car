import constants from '@/config/constants'

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      constants
    }
  }
})
