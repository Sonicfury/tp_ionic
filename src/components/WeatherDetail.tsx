import React, {Fragment} from 'react';
import temperature from "../repository/temperature";
import date from "../repository/date";
import './WeatherDetail.css';
import {
  IonContent,
  IonCard,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar, IonSpinner,
} from '@ionic/react';
import WeatherCardHeader from "./WeatherCardHeader";

type WeatherDetailProps = {
  // todo : weather & forecast model
  weather: any;
  forecast: any;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({weather, forecast}) => {

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
      {!weather && !forecast &&
      <IonSpinner id="home-spinner" name="bubbles" color="primary"/>}
      {weather && forecast && <IonContent>
          <IonCard>
              <IonCardSubtitle>{date.getFormatted(weather.dt, 'ddd, MMM Do')}</IonCardSubtitle>

              <WeatherCardHeader weather={weather} forecast={forecast}/>

              <IonCardContent>
                  <IonList id="hourly-list">

                    {forecast.hourly.map((hour: any) =>
                      <IonItem class="list__item" key={hour.dt}>
                        <IonLabel>
                          <p>{date.getFormatted(hour.dt, 'ddd')}</p>
                          <h2>{date.getFormatted(hour.dt, 'HH')} h</h2>
                          <p>{hour.weather[0].description}</p>
                        </IonLabel>
                        <IonAvatar>
                          <img alt={hour.weather[0].icon} src={getIconUrl(hour.weather[0].icon)}/>
                        </IonAvatar>
                      </IonItem>
                    )}

                  </IonList>

                  <IonGrid>
                      <IonRow>
                          <IonCol>Day</IonCol>
                          <IonCol>Temp</IonCol>
                          <IonCol>Description</IonCol>
                          <IonCol>Weather</IonCol>
                          <IonCol>Rain %</IonCol>
                      </IonRow>

                    {forecast.daily.map((day: any, index) =>
                      <IonRow key={index}>
                        <IonCol><h2>{date.getFormatted(day.dt, 'ddd')}</h2></IonCol>
                        <IonCol><h1>{temperature.kelvinToCelsius(day.feels_like.day)}</h1></IonCol>
                        <IonCol><p>{day.weather[0].description}</p></IonCol>
                        <IonCol>
                          <IonAvatar>
                            <img alt={day.weather[0].icon} src={getIconUrl(day.weather[0].icon)}/>
                          </IonAvatar>
                        </IonCol>
                        <IonCol><p>{!day.rain ? '0' : day.rain}%</p></IonCol>
                      </IonRow>
                    )}

                  </IonGrid>

              </IonCardContent>
          </IonCard>
      </IonContent>}
    </Fragment>
  )
};

export default WeatherDetail;