export default defineNuxtPlugin(_ => {
  const config = useRuntimeConfig()

  useHead({
    script: [
        {
          src: `https://api-maps.yandex.ru/2.1/?apikey=${config.public.yandexApiKey}&lang=ru_RU`,
          type: 'text/javascript'
        }
      ]
  })
})
