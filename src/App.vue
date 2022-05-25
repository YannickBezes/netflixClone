<template>
  <div id="app">
    <app-popup id="popup"></app-popup>
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
import headerLogged from './components/header-logged-in.vue';
import appPopup from './components/Popup.vue';
import appFooter from './components/Footer.vue';
import axios from 'axios';
import { DEFAULT_LAYOUT } from './layouts';

export default {
  components: {
    headerLogged, appPopup, appFooter
  },
  data() {
    return {
      mainControl: true
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout || DEFAULT_LAYOUT;
    }
  },
  created() {
    axios.get('/data.json').then(response => {
      const data = response.data;
      for (let key in data) {
        this.$store.commit('setFirebaseData', data[key]);
      }
    });

    const token = localStorage.getItem('token');

    if (token) {
      this.$store.state.token = token;
      this.$store.state.userEmail = localStorage.getItem('userEmail');
      this.$store.state.userLocalID = localStorage.getItem('localId');

      axios.get('/userData/' + this.$store.state.userLocalID + '/list.json').then(response => {
        this.$store.state.addedToList = response.data;
      });
      axios.get('/userData/' + this.$store.state.userLocalID + '/like.json').then(response => {
        this.$store.state.likedContents = response.data;
      });
      axios.get('/userData/' + this.$store.state.userLocalID + '/dislike.json').then(response => {
        this.$store.state.unlikedContents = response.data;
      });

      if (this.$route.path === '/login' || this.$route.path === '/') {
        this.$router.push('/browse');
      }
    }
  },
  watch: {
    '$route'(data) {
      if (data.path === '/browse/series') {
        document.title = 'TV Shows - Netflix';
      } else if (data.path === '/browse/movies') {
        document.title = 'Movies - Netflix';
      } else if (data.path === '/browse/list') {
        document.title = 'My List - Netflix';
      } else if (data.path === '/browse') {
        document.title = 'Home - Netflix';
      } else if (data.path === '/browse/new-popular') {
        document.title = 'Netflix';
      }
    },
    '$store.state.popup'() {
      this.mainControl = this.$store.state.popup;
    },
    '$store.state.addedToList'(data) {
      axios.put('/userData/' + this.$store.state.userLocalID + '/list.json', data).then(response => {
        console.log(response);
      });
    },
    '$store.state.likedContents'(data) {
      axios.put('/userData/' + this.$store.state.userLocalID + '/like.json', data).then(response => {
        console.log(response);
      });
    },
    '$store.state.unlikedContents'(data) {
      axios.put('/userData/' + this.$store.state.userLocalID + '/dislike.json', data).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style>
#app {
  user-select: none;
  -webkit-user-select: none;
}

body {
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: sans-serif;
}

#popup {
  position: fixed;
  width: 100%;
  z-index: 5;
}

.activeHeader {
  display: none;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {

  transition: opacity 0.5s;;
}

.fade-leave {

}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}
</style>
