import React, {Fragment} from 'react';
import temperature from "../repository/temperature";
import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
} from '@ionic/react';

type WeatherSmallCardProps = {

  weather: any;
  forecast: any;
}

const WeatherCardHeader: React.FC<WeatherSmallCardProps> = ({weather, forecast}) => {

  const OWM_ICON_URI = 'https://openweathermap.org/img/wn/';

  /**
   * returns icon url
   * @param icon
   */
  const getIconUrl = (icon) => {
    return OWM_ICON_URI + icon + '.png';
  }

  return (
    <Fragment>
      {weather && forecast && <Fragment>

          <IonCardHeader>
              <IonCardTitle>{weather.name}, {weather.sys.country}</IonCardTitle>
              <IonCardTitle>{temperature.kelvinToCelsius(weather.main.temp)}</IonCardTitle>
              <IonAvatar>
                  <img alt={weather.weather[0].icon} src={getIconUrl(weather.weather[0].icon)}/>
              </IonAvatar>
              <IonCardSubtitle>{weather.weather[0].main}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
              Today : {weather.weather[0].description}. Current outside temp
              is {temperature.kelvinToCelsius(weather.main.temp)} and it feels like
              it's {temperature.kelvinToCelsius(weather.main.feels_like)}. Max
              temp should be {temperature.kelvinToCelsius(weather.main.temp_max)} and min temp should
              be {temperature.kelvinToCelsius(weather.main.temp_min)}.
          </IonCardContent>
      </Fragment>
      }
    </Fragment>
  );

};

export default WeatherCardHeader;