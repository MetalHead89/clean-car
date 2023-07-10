export default defineNuxtPlugin(_ => {
  const get = (path: string, query?: object) => {
    return $fetch(path, { query });
  }

  const fetchService: IFetchService = {
    get
  }

  return {
    provide: {
      fetchService
    }
  }
})
