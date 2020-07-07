export default {

  /**
   * Farenheit to Celsius degrees
   * @param temp
   */
  farenheitToCelsius(temp: number){

    return Math.floor((temp - 32) * (5 / 9)) + '°C';
  },

  /**
   * Kelvin to Celsius degrees
   * @param temp
   */
  kelvinToCelsius(temp: number) {

    return Math.floor(temp - 273.15) + '°C';
  }
}