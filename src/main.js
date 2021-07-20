import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from 'firebase'


Vue.config.productionTip = false;
// Vue.config.productionTip = true;

firebase.initializeApp({
  apiKey: "AIzaSyDPW3q0dh8B2ynr4IrViOqzUeyyTH3PKEA",
    authDomain: "vue-kinocms-10712.firebaseapp.com",
    projectId: "vue-kinocms-10712",
    storageBucket: "vue-kinocms-10712.appspot.com",
    messagingSenderId: "843263933443",
    appId: "1:843263933443:web:f58ef770f8c2967eb06236",
    measurementId: "G-Q0M07FEVTC"
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


