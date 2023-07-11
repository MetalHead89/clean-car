// Fetch service

interface IFetchService {
  get: (path: string, query?: object) => Promise<unknown>
}

// Weather

interface ICommonWeather {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string
  }
}

type WeatherConditionType = {
  text: string,
  icon: string,
  code: number
}

type ForecastDayType = {
  date: string,
  day: {
    condition: WeatherConditionType
  }
}

interface IYesterdayWeather extends ICommonWeather {
  forecast: {
    forecastday: ForecastDayType[]
  }
}

interface IForecastWeather extends ICommonWeather {
  current: {
    condition: WeatherConditionType
  },
  forecast: {
    forecastday: ForecastDayType[]
  }
}

// Api

interface IApi {
  weather: {
    getYesterdayWeather: (coords: coordsType) => Promise<IYesterdayWeather>,
    getForecastWeather: (coords: coordsType) => Promise<IForecastWeather>
  }
}
