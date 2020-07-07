import React, {useEffect, useState} from 'react';
import './Home.css';
import WeatherDetail from "../components/WeatherDetail";
import Searchbar from "../components/Searchbar";
import {IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar} from '@ionic/react';
import helpers from "../helpers/helpers";


const Home: React.FC = () => {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);
  const [doneGeolocation, setDoneGeolocation] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [showToast, setShowToast] = useState(false);


  const getWeather = async (location: string, lat?: number, lon?: number, byCoords: boolean = false) => {
    try {
      const data = await helpers.getWeather(location, lat, lon, byCoords);

      setCurrentWeather(data.current);
      setCurrentForecast(data.forecast);
      setWeatherError(null);
      setShowToast(false);

    } catch (e) {
      setWeatherError(e.message);
      setShowToast(true);
    }
  }


  useEffect(() => {

    const geoSuccess = async (pos) => {
      await getWeather('', pos.coords.latitude, pos.coords.longitude, true);
    }

    const geoError = async (e) => {
      setWeatherError(e.message);
      setShowToast(true);
    }

    if ('geolocation' in navigator && !doneGeolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
      setDoneGeolocation(true);

    } else {
      // 7 minutes timeOut
      setTimeout(() => {
        setDoneGeolocation(false)
      }, 420000)
    }
  }, [setDoneGeolocation, doneGeolocation])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Searchbar defaultName={'Paris'} getWeather={(location: string) => getWeather(location)}/>
        {!weatherError && <WeatherDetail weather={currentWeather} forecast={currentForecast}/>}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(null)}
          message={weatherError}
          duration={5000}
          position="top"
          buttons={[{
            text: 'Ok',
            role: 'cancel',
          }]
          }
        />
      </IonContent>
    </IonPage>
  );
};


export default Home;