import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(Vuelidate);

firebase.initializeApp({
  apiKey: "AIzaSyDPW3q0dh8B2ynr4IrViOqzUeyyTH3PKEA",
  authDomain: "vue-kinocms-10712.firebaseapp.com",
  databaseURL: "https://vue-kinocms-10712-default-rtdb.firebaseio.com",
  projectId: "vue-kinocms-10712",
  storageBucket: "vue-kinocms-10712.appspot.com",
  messagingSenderId: "843263933443",
  appId: "1:843263933443:web:f58ef770f8c2967eb06236",
  measurementId: "G-Q0M07FEVTC"
});

// let app;
// firebase.auth().onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       store,
//       render: h => h(App)
//     }).$mount("#app");
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
