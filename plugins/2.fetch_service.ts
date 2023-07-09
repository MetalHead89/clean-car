// export interface IFetchService {
//   get: (path: string, query?: object) => Promise<unknown>
// }

export default defineNuxtPlugin(nuxtApp => {
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
