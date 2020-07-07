const API_KEY = '38b5e5f6d5e757aacd960e025218603a'

export default {

  /**
   * get weather data from location
   * @param location
   */
  async getWeather(location: string) {
    const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);

    if (req.status === 404) {
      throw new Error("This city doesn't exist, please try another one.");
    }
    return req.json();
  },

  /**
   * get complete forecast from lat and lon
   * @param lon
   * @param lat
   */
  async getForecast(lat: number, lon: number) {
    const req = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

    if (req.status === 404) {
      throw new Error("This city doesn't exist, please enter another one.");
    }
    return req.json();
  },

  /**
   * get weather by coordinates
   * @param lat
   * @param lon
   */
  async getWeatherByCoordinates(lat: number, lon: number) {
    const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

    return req.json();
  },
}