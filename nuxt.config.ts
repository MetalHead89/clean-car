// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    public: {
      yandexApiKey: process.env.YANDEX_API_KEY
    }
  },

  css: ['@/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/styles/variables.scss" as *;'
            + '@use "@/assets/styles/functions.scss" as *;'
        }
      }
    }
  }
})
