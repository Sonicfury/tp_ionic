import moment from 'moment';

export default {
  /**
   * returns the formatted date
   * @param dt
   * @param format
   */
  getFormatted(dt: number, format: string){
    return moment.unix(dt).format(format);
  }
}