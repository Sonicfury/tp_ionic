import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA-2xPIJAKW2D__m9bCg7IS-0UJgaOKvq8",
  authDomain: "cesi-weather-app.firebaseapp.com",
  databaseURL: "https://cesi-weather-app.firebaseio.com",
  projectId: "cesi-weather-app",
  storageBucket: "cesi-weather-app.appspot.com",
  messagingSenderId: "414691936072",
  appId: "1:414691936072:web:3fe12d3cc9fe13f748557d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {

  /**
   * get cities firebase collection
   */
  async getCities() {
    const data = await db.collection('cities').get();
    const cities = [];
    data.forEach((doc) => {
      cities.push({name: doc.data().name, id: doc.id});
    })

    return cities;
  },

  /**
   * delete a city by id
   * @param cityId
   */
  async deleteCity(cityId: string) {
    await db.collection("cities").doc(cityId).delete();
  },

  /**
   * adds a city by location
   * @param location
   */
  async addCity(location: string) {
    const data = await db.collection("cities").where("name", "==", location).get();
    const cities = [];

    data.forEach((doc) => {
      cities.push(doc.id);
    })

    if (cities.length > 0) {
      throw new Error('The city is already added, please choose another one.');
    } else {
      await db.collection("cities").add({
        name: location,
      })
    }
  }
}