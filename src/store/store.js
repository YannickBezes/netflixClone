import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import axios from 'axios';


Vue.use(Vuex, VueResource);

export const store = new Vuex.Store({
  state: {
    cardSound: true,
    firebaseData: [],
    bigVideoPlayerControl: true,
    currentTime: 0,
    activePopupContent: {},
    popupNextVideoSecond: null,
    cardCounter: null,
    cardInterval: null,
    popup: false,
    searchValue: '',
    addedToList: [],
    likedContents: [],
    unlikedContents: [],
    rightClickCounterStore: 0,
    token: '',
    fbAPIKey: 'AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA',
    startEmail: null,
    userEmail: null,
    userLocalID: null

  },
  getters: {
    getFirebaseData(state) {
      return state.firebaseData;
    },
    getFirebaseDataLength(state) {
      return state.firebaseData.length;
    },
    getBigVideoPlayerControl(state) {
      return state.bigVideoPlayerControl;
    },
    getTokenIdLength(state) {
      return state.token.length;
    }
  },
  mutations: {
    setFirebaseData(state, value) {
      state.firebaseData.push(value);
    },
    setBigVideoPlayerControl(state, value) {
      state.bigVideoPlayerControl = value;
    },
    setCurrentTime(state, value) {
      state.currentTime = value;
    },
    setActivePopup(state, value) {
      state.activePopupContent = value;
    },
    setPopupInterval(state, value) {
      state.popupInterval = value;
    },
    setPopupCounter(state, value) {
      state.popupCounter = value;
    },
    clearToken(state) {
      state.token = '';
    }
  }
});
