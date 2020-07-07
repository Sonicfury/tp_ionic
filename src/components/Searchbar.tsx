import React, {Fragment, useState} from 'react';
import './Searchbar.css';
import {IonButton, IonSearchbar} from "@ionic/react";


type SearchbarProps = {
  defaultName : string
  getWeather: (location) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({defaultName, getWeather}) => {
  const [city, setCity] = useState({});

  /**
   * sets the city to search
   * @param e
   */
  const updateCity = (e: {detail : {value: string}}) => {
    setCity(e.detail.value)
  }

  return <Fragment>
    <IonSearchbar onIonChange={e => updateCity(e)} placeholder="Search for a city..." />
    <IonButton onClick={() => {
      getWeather(city);
    }} expand="block">Search</IonButton>
  </Fragment>;
};

export default Searchbar;