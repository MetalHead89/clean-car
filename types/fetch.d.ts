interface IFetchService {
  get: (path: string, query?: object) => Promise<unknown>
}

interface IApi {
  weather: {
    getYesterdayWeather: (coords: coordsType) => Promise<unknown>
  }
}
