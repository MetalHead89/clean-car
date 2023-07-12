type FunctionPropsType = {
  yesterday: IYesterdayWeather,
  forecast: IForecastWeather
}

const IDEAL_CONDITIONS_CODES = [1000]
const GOOD_CONDITIONS_CODES = [1003, 1006]
const SATISFACTORY_CONDITIONS_CODES = [1009, 1030, 1063, 1066, 1069,
  1072, 1087, 1114, 1117, 1135, 1147]
// const BAD_CONDITIONS_CODES = [1150, 1153, 1168, 1171, 1180, 1183,
//   1198, 1204, 1210, 1213]
// const DIRE_CONDITIONS_CODES = [1192, 1186, 1189, 1195, 1201, 1207,
//   1216, 1219, 1222, 1225, 1237, 1240, 1243, 1246, 1249, 1252, 1255,
//   1258, 1261, 1264, 1273, 1276, 1279, 1282]

const CODES = {
  ideal: 3,
  good: 2,
  satisfactory: 1,
  bad: 0
}

export default ({ yesterday, forecast}: FunctionPropsType) => {
  const weatherStatuses = getWeatherStatuses(yesterday, forecast)

  console.dir(weatherStatuses)

  if (isIdealWeather(weatherStatuses)) {
    return 'Ideal'
  } else if (isGoodWeather(weatherStatuses)) {
    return 'Good'
  } else if (isSatisfactoryWeather(weatherStatuses)) {
    return 'Satisfactory'
  } else {
    return 'Bad'
  }
}

const getWeatherStatuses = (yesterday: IYesterdayWeather, forecast: IForecastWeather) => {
  return [
    yesterday.forecast.forecastday[0],
    ...forecast.forecast.forecastday
  ].map(day => {
    const code = day.day.condition.code

    if (IDEAL_CONDITIONS_CODES.includes(code)) {
      return CODES.ideal
    } else if (GOOD_CONDITIONS_CODES.includes(code)) {
      return CODES.good
    } else if (SATISFACTORY_CONDITIONS_CODES.includes(code)) {
      return CODES.satisfactory
    } else {
      return CODES.bad
    }
  })
}

const isIdealWeather = (statuses: number[]) => {
  return statuses[0] >= CODES.good
    && statuses[1] === CODES.ideal
    && statuses[2] === CODES.ideal
    && statuses[3] === CODES.ideal
    && statuses[4] >= CODES.good
    && statuses[5] >= CODES.good
    && statuses[6] >= CODES.good
}

const isGoodWeather = (statuses: number[]) => {
  return statuses[0] >= CODES.good
      && statuses[1] >= CODES.good
      && statuses[2] >= CODES.good
      && statuses[3] >= CODES.good
      && statuses[4] >= CODES.satisfactory
      && statuses[5] >= CODES.satisfactory
      && statuses[6] >= CODES.satisfactory
}

const isSatisfactoryWeather = (statuses: number[]) => {
  return (
      statuses[0] >= CODES.satisfactory
      && statuses[1] >= CODES.satisfactory
      && statuses[2] >= CODES.satisfactory
      && statuses[3] >= CODES.satisfactory
      && statuses[4] >= CODES.satisfactory
      && statuses[5] >= CODES.bad
      && statuses[6] >= CODES.bad
    )
    && (
      (
        statuses[0] === CODES.satisfactory
        || statuses[1] === CODES.satisfactory
        || statuses[2] === CODES.satisfactory
        || statuses[3] === CODES.satisfactory
      )
      || (
        statuses[5] === CODES.bad
        || statuses[6] === CODES.bad
      )
    )
}
