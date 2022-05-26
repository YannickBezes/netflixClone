import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex, VueResource);

export const store = new Vuex.Store({
  state: {
    cardSound: true,
    data: [],
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
    getData(state) {
      return state.data;
    },
    getDataLength(state) {
      return state.data.length;
    },
    getBigVideoPlayerControl(state) {
      return state.bigVideoPlayerControl;
    },
    getTokenLength(state) {
      return state.token.length;
    }
  },
  mutations: {
    setData(state, value) {
      state.data.push(value);
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
