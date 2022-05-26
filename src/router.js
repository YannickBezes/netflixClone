import Vue from 'vue';
import Router from 'vue-router';
import HomeAfter from './components/HomeAfter';
import Login from './components/Login';
import Home from './components/mainRouter/Home';
import { store } from './store/store';
import LAYOUTS from './layouts';
import Series from './components/mainRouter/Series';
import MyList from './components/mainRouter/MyList';
import Movies from './components/mainRouter/Movies';
import NewPopular from './components/mainRouter/NewPopular';
import Popup from './components/Popup';
import Player from './components/mainRouter/Player';
import Search from './components/mainRouter/Search';
import Genre from './components/mainRouter/Genre';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      meta: { layout: LAYOUTS.LOGGED_OUT },
      component: HomeAfter
    },
    {
      path: '/login',
      meta: { layout: LAYOUTS.LOGGED_OUT },
      component: Login
    },
    {
      path: '/browse',
      meta: { layout: LAYOUTS.LOGGED_IN },
      component: Home,
      beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/browse/series', component: Series, name: 'series', beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/browse/list', component: MyList, beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/browse/movies', component: Movies, beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/browse/new-popular', component: NewPopular, beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/popup', component: Popup, beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/watch', component: Player, beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/search', component: Search, name: 'search', beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/genre', component: Genre, beforeEnter(to, from, next) {
        if (store.getters['getTokenLength'] > 10) {
          next();
        } else {
          next('/login');
        }
      }
    },
    { path: '*', redirect: '/' }
  ]
});
