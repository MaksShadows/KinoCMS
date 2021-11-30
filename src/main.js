import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import i18n from "./i18n";
import firebase from "firebase";
//import firebase from 'firebase/app';

import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import "./registerServiceWorker";

Vue.config.productionTip = false;

const lang = localStorage.getItem("lang") || "ru";
axios.defaults.headers["Accept-Language"] = lang;

// export const db = app.database()

export async function fetch(path) {
  try {
    const snapshot = await firebase.ref(path).once("value");
    return snapshot.val();
  } catch (e) {
    console.log("Error.\nFetching from database.", e);
  }
}

Vue.use(Vuelidate);

firebase.initializeApp({
  apiKey: "AIzaSyBIhqKgsI4d75iNUw5Uscpre2YJY6rkHpI",
  authDomain: "vue-adminlte.firebaseapp.com",
  databaseURL: "https://vue-adminlte-default-rtdb.firebaseio.com",
  projectId: "vue-adminlte",
  storageBucket: "vue-adminlte.appspot.com",
  messagingSenderId: "906463419950",
  appId: "1:906463419950:web:fe03524d022611427889bf",
  measurementId: "G-PQY2T4QPD1"
});

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount("#app");
  }
});

// new Vue({
//   router,
//   store,
//   i18n,
//   render: h => h(App)
// }).$mount("#app");
