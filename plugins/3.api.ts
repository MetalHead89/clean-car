import weather from '@/api/weather'

export default defineNuxtPlugin(nuxtApp => {
  const { $fetchService } = useNuxtApp()
  const config = useRuntimeConfig()

  const api: IApi = {
    weather: weather($fetchService, config.public.weatherApiKey)
  }

  return {
    provide: {
      api
    }
  }
})
