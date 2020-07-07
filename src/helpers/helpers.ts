import weather from "../repository/weather";


export default {
  getWeather: async function (location: string, lat?: number, lon?: number, byCoords: boolean = false) {

    let current: any;
    let forecast: any;

    if (!byCoords) {
      current = await weather.getWeather(location);
      forecast = await weather.getForecast(current.coord.lat, current.coord.lon);
    } else {
      current = await weather.getWeatherByCoordinates(lat, lon);
      forecast = await weather.getForecast(lat, lon);
    }

    return {current, forecast}
  }
}
