const BASE_URL = 'http://api.weatherapi.com/v1'

const getUrl = (path: string) => {
  return `${BASE_URL}${path}`
}

export default (fetchService: IFetchService, apiKey: string) => {
  return {
    getYesterdayWeather: (coords: coordsType) => {
      const params = {
        key: apiKey,
        q: coords.join(','),
        dt: '2023-07-09'
      }

      return fetchService.get(getUrl('/history.json'), params )
    }
  }
}
