import React, {useEffect, useState} from 'react';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/react';
import {addCircle, arrowUpCircle} from "ionicons/icons";
import './MyCities.css';
import db from "../repository/db";
import helpers from "../helpers/helpers";
import temperature from "../repository/temperature";
import weather from "../repository/weather";
import Searchbar from "../components/Searchbar";
import WeatherDetail from "../components/WeatherDetail";

const OWM_ICON_URI = 'http://openweathermap.org/img/wn/';

const MyCities: React.FC = () => {

  const getIconUrl = (icon) => {
    return OWM_ICON_URI + icon + '.png';
  }

  const [weatherList, setWeatherList] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [doneGetCities, setDoneGetCities] = useState(false);
  const [showAddingModal, setShowAddingModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [city, setCity] = useState(null);
  const [cityDetail, setCityDetail] = useState(null);

  /**
   * gets saved cities
   */
  const getCities = async () => {
    try {
      const cities = await db.getCities();
      const weathers = await Promise.all(cities.map(async item => {
        return {
          ...item,
          weather: await helpers.getWeather(item.name)
        }
      }));

      setWeatherList(weathers);
      setNotification(null);
      setShowToast(false);

    } catch (e) {
      setNotification(e.message);
      setShowToast(true);
    }
  }

  /**
   * gets city
   * @param location
   */
  const getCity = async (location: string) => {
    try {
      const city = await weather.getWeather(location);

      setCity({name: city.name, country: city.sys.country});
      setNotification(null);
      setShowToast(false);

    } catch (e) {
      setNotification(e.message);
      setShowToast(true);
    }
  }

  /**
   * delete a saved city by id
   * @param id
   */
  const deleteCity = async (id: string) => {
    try {
      await db.deleteCity(id);

      setNotification('The city has been successfully deleted');
      setShowToast(true);

      setTimeout(async () => {
        await getCities();
        setDoneGetCities(true);
      }, 1500);

    } catch (e) {
      setNotification(e.message);
      setShowToast(true);
    }
  }

  /**
   * saves a city
   * @param location
   */
  const addCity = async (location: string) => {
    try {
      await db.addCity(location);

      setNotification(`${location} has been successfully added`);
      setShowToast(true);

      setTimeout(async () => {
        await getCities();
        setDoneGetCities(true);
      }, 1500)

      setShowAddingModal(false);

    } catch (e) {
      setNotification(e.message);
      setShowToast(true);

      setTimeout(async () => {
        await getCities();
        setDoneGetCities(true);
      }, 1500);
    }
  }

  useEffect(() => {
    if (!doneGetCities) {
      getCities().then(r => setDoneGetCities(true));

    } else {
      setTimeout(() => {
        setDoneGetCities(false)
      }, 420000)
    }
  }, [doneGetCities, setDoneGetCities])


  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(null)}
        message={notification}
        duration={5000}
        position="top"
        buttons={[{
          text: 'Ok',
          role: 'cancel',
        }]
        }
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Cities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonModal isOpen={showAddingModal}>
          <IonItem>
            <Searchbar defaultName={'Paris'} getWeather={(location: string) => getCity(location)}/>
          </IonItem>

          {city &&
          <IonItem key={city.name}>
              <IonLabel>
                  <h2>{city.name}, {city.country}</h2>
              </IonLabel>
              <IonButton onClick={() => addCity(city.name)}>
                  <IonIcon icon={addCircle}/>
              </IonButton>
          </IonItem>
          }
          <IonButton onClick={() => setShowAddingModal(false)}><IonIcon icon={arrowUpCircle}/></IonButton>
        </IonModal>

        <IonButton expand="block" onClick={async () => {
          setShowAddingModal(true);
          await getCities();
        }}>
          <IonIcon icon={addCircle}/>
        </IonButton>

        <IonModal isOpen={showDetailModal}>
          {cityDetail && <WeatherDetail weather={cityDetail.current} forecast={cityDetail.forecast}/>}
          <IonButton onClick={() => setShowDetailModal(false)}><IonIcon icon={arrowUpCircle}/></IonButton>
        </IonModal>

        {!weatherList &&
        <IonSpinner id="home-spinner" name="bubbles" color="primary"/>}
        <IonList>
          {weatherList && !notification && weatherList.map(item =>
            <IonItemSliding key={item.id}>
              <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={() => {
                  setShowDetailModal(true);
                  setCityDetail(item.weather);
                }}>Detail</IonItemOption>
                <IonItemOption color="danger" onClick={() => deleteCity(item.id)}>Delete</IonItemOption>
              </IonItemOptions>
              <IonItem>
                <IonAvatar>
                  <img alt={item.weather.current.weather[0].icon}
                       src={getIconUrl(item.weather.current.weather[0].icon)}/>
                </IonAvatar>
                <IonLabel>
                  <h2>{item.name}</h2>
                  <h1>{temperature.kelvinToCelsius(item.weather.current.main.temp)}</h1>
                  <h3>{item.weather.current.weather[0].main}</h3>
                </IonLabel>
              </IonItem>
            </IonItemSliding>
          )}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default MyCities;
