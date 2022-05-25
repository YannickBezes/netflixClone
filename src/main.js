import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import axios from "axios"
import router from './router';
import LAYOUTS from './layouts';
import LoggedIn from './layouts/logged-in';
import LoggedOut from './layouts/logged-out';

axios.defaults.baseURL = "https://netflix-clone-d49e9-default-rtdb.firebaseio.com"

Vue.component(LAYOUTS.LOGGED_IN, LoggedIn);
Vue.component(LAYOUTS.LOGGED_OUT, LoggedOut);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

