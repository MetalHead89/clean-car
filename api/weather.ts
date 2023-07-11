const BASE_URL = 'http://api.weatherapi.com/v1'

const getUrl = (path: string) => {
  return `${BASE_URL}${path}`
}

export default (fetchService: IFetchService, apiKey: string) => {
  return {
    getYesterdayWeather: (coords: coordsType) => {
      const date = new Date()
      date.setDate(date.getDate() - 1)

      const params = {
        key: apiKey,
        q: coords.join(','),
        dt: date.toISOString().split('T')[0]
      }

      return fetchService.get(getUrl('/history.json'), params )
    },

    getForecastWeather: (coords: coordsType) => {
      const FORECAST_DAYS_COUNT = 6

      const params = {
        key: apiKey,
        q: coords.join(','),
        days: FORECAST_DAYS_COUNT
      }

      return fetchService.get(getUrl('/forecast.json'), params )
    }
  }
}
