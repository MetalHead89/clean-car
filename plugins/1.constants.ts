import constants from '@/config/constants'

export default defineNuxtPlugin(_ => {
  return {
    provide: {
      constants
    }
  }
})
