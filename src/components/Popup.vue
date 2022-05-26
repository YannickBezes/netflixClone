<template>
  <transition v-if="onOff" name="fade" appear>
    <div class="main">
      <div class="overlay">
        <div class="popupFrame">
          <div class="popup" v-click-outside="onClickOutside">
            <div class="popupContent">
              <div class="popupContent-top">
                <div class="video-top-info">
                  <div class="video-top-info-top">
                    <router-link to="" class="video-top-info-top-close" tag="div" @click.native="closePopup"><p>x</p>
                    </router-link>
                  </div>
                  <div class="video-top-info-bottom">
                    <div class="video-top-info-bottom-left">
                      <div class="logo" style="margin-top:-2vw"><img :src="activeData.logo" alt=""></div>
                      <div class="button">
                        <router-link :to="{ path: '/watch' , query : {id: activeData.id} }" tag="div">
                          <div
                            class="iconDiv-play"
                            @click="playButton">
                            <i class="fas fa-play"></i><label>Play</label>
                          </div>
                        </router-link>
                        <div class="iconDiv" @click="addToList"><i
                          :class="isAddedToList ? 'fas fa-check' : 'fas fa-plus'"></i></div>
                        <div class="iconDiv" @click="likeButton"><i
                          :class="isLiked  ? 'fas fa-thumbs-up' : 'far fa-thumbs-up' "></i></div>
                        <div class="iconDiv" @click="dislikeButton"><i
                          :class="isDisliked  ? 'fas fa-thumbs-down' : 'far fa-thumbs-down'"></i></div>
                      </div>
                    </div>
                    <div class="video-top-info-bottom-right">
                      <div class="iconDiv" @click="soundControl"><i
                        :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i></div>
                    </div>
                  </div>
                </div>

                <div class="video-frame">
                  <div class="video">
                    <div class="videoShadow">
                      <img src="https://i.ibb.co/LvLSd6G/shadow.png" alt="">
                    </div>
                    <video
                      id="videoPopup"
                      ref="videoPopup"
                      playsinline
                      autoplay
                      :current-time.prop="currentTime"
                      :src="activeData.videoSrc"
                      :key="activeData.videoSrc"
                      loop
                      :muted="isMuted"
                    ></video>
                  </div>
                </div>
              </div>
              <div class="popupContent-info">
                <div class="top-info">
                  <div class="top-info-left">
                    <div class="infos">
                      <p class="green"> {{ activeData.newAndDate }} </p>
                      <p> {{ activeData.year }} </p>
                      <p class="age"> {{ activeData.age }} +</p>
                      <p>{{ activeData.time }}</p>
                      <p class="hd">{{ activeData.videoQuality }}</p>
                    </div>
                    <div class="description"><p>{{ activeData.videoDescription }}</p></div>
                  </div>

                  <div id="top-info-squad" class="top-info-right">
                    <div class="cast">
                      <p><label class="title">Cast:</label> <label class="title-alt" :key="index" v-for="(item,index) in activeData.cast">
                        <router-link
                          @click.native="$store.state.popup = false"
                          tag="a"
                         :to="{path : '/genre' , query : { p : item}}"
                        >
                          {{ item }}
                        </router-link>
                        <label v-if="index < castLength">, </label> </label></p>
                    </div>
                    <div class="genres">
                      <p><label class="title">Genres:</label> <label class="title-alt" :key="index"
                                                                     v-for="(item,index) in activeData.subcategories">
                        <router-link @click.native="$store.state.popup = false" tag="a"
                                     :to="{path : '/genre' , query : { p : item}}">{{ item }}
                        </router-link>
                        <label v-if="index < subcategoriesLength">, </label> </label></p>
                    </div>
                    <div class="this-content">
                      <p><label class="title">This content:</label> <label class="title-alt" :key="index"
                                                                        v-for="(item,index) in activeData.category">
                        <router-link @click.native="$store.state.popup = false" tag="a"
                                     :to="{path : '/genre' , query : { p : item}}">{{ item }}
                        </router-link>
                        <label v-if="index < categoryLength">, </label> </label></p>
                    </div>
                  </div>
                </div>

                <div class="similar">
                  <div class="similar-title"><h1>Similar</h1></div>

                  <div class="box-frame">
                    <div class="box-analogs" :key="item.id" v-for="item in filter()">


                      <div class="box-analogs-top-sure"><label>{{ item.time }}</label></div>
                      <div class="box-analogs-top-shadow"><img src="https://i.ibb.co/vmWXfB7/benzerleri-shadow.png"
                                                                 alt=""></div>
                      <div class="box-analogs-top-image-hover" @click="boxAnalogsPlay(item.id)">
                        <div class="box-analogs-top-image-hover-button"><i class="bi bi-play-fill"></i></div>
                      </div>

                      <div class="box-analogs-top-image"><img :src="item.img" alt=""></div>


                      <div class="box-analogs-info-top">

                        <div class="box-analogs-info-top-left">
                          <div><p class="age-similar"> {{ item.age }}+ </p></div>
                          <div><p class="year-similar"> {{ item.year }} </p></div>
                        </div>

                        <div class="box-analogs-info-top-right">
                          <div style="color:white ;width:35px ; height:35px" class="iconDiv"
                               @click="addToListById(item.id)"><i
                            :class="$store.state.addedToList.includes(item.id) ? 'fas fa-check' : 'fas fa-plus'"></i>
                          </div>
                        </div>
                      </div>

                      <div class="box-analogs-info-description">
                        <p>{{ item.videoDescription }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="about-content">
                  <p class="about-text"><strong> {{ activeData.title }} </strong> About</p>
                  <p class="other-info">Director: <label :key="index" v-for="(item,index) in activeData.director">
                    <router-link @click.native="$store.state.popup = false" tag="a"
                                 :to="{path : '/genre' , query : { p : item}}">{{ item }}
                    </router-link>
                    <label v-if="index < directorLength">, </label> </label></p>
                  <p class="other-info">Cast: <label :key="index" v-for="(item,index) in activeData.cast">
                    <router-link @click.native="$store.state.popup = false" tag="a"
                                 :to="{path : '/genre' , query : { p : item}}">{{ item }}
                    </router-link>
                    <label v-if="index < castLength">, </label> </label></p>
                  <p class="other-info">Scriptwriter: <label :key="index"
                                                                v-for="(item,index) in activeData.scriptwriter">
                    <router-link @click.native="$store.state.popup = false" tag="a"
                                 :to="{path : '/genre' , query : { p : item}}">{{ item }}
                    </router-link>
                    <label v-if="index < scriptwriterLength">, </label> </label></p>
                  <p class="other-info">Genres: <label :key="index"
                                                          v-for="(item,index) in activeData.subcategories">
                    <router-link @click.native="$store.state.popup = false" tag="a"
                                 :to="{path : '/genre' , query : { p : item}}">{{ item }}
                    </router-link>
                    <label v-if="index < subcategoriesLength">, </label> </label></p>
                  <p class="other-info">This movie: <label :key="index" v-for="(item,index) in activeData.category">
                    <router-link @click.native="$store.state.popup = false" tag="a"
                                 :to="{path : '/genre' , query : { p : item}}">{{ item }}
                    </router-link>
                    <label v-if="index < categoryLength">, </label> </label></p>
                  <p class="other-info">Pegi: <label> {{ activeData.age }} suitable for ages and up</label></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import clickOutside from '../directives/v-click-outside';

export default {
  data() {
    return {
      isMuted: false,
      activeData: {
        id: null,
        title: null,
        img: null,
        logo: null,
        videoSrc: null,
        newAndDate: null,
        age: null,
        year: null,
        category: null,
        time: null,
        videoQuality: null,
        subcategories: null,
        videoDescription: null,
        director: null,
        cast: null,
        scriptwriter: null,
        likeButton: null,
        dislikeButton: null,
        addedToList: null,
        popular: null,
        numberOfViews: null,
        type: null
      },
      myVid: null,
      currentTime: null,
      castLength: null,
      directorLength: null,
      scriptwriterLength: null,
      subcategoriesLength: null,
      categoryLength: null,
      onOff: false,
      isAddedToList: false,
      isLiked: false,
      isDisliked: false,
      outsideCounter: 0,
      boxCounter: 0
    };
  },
  directives: { clickOutside },
  methods: {
    soundControl() {
      this.$store.state.cardSound = !this.$store.state.cardSound;
    },
    closePopup() {
      this.outsideCounter = 0;
      this.$store.state.popup = false;
      document.querySelector('#videoPopup').pause();
      this.$store.state.bigVideoPlayerControl = true;
      this.currentTime = 0;
    },
    addToList() {
      this.isAddedToList = !this.isAddedToList;
      const addedToList = this.$store.state.addedToList;

      if (this.isAddedToList === false) {
        for (let i = 0; i < addedToList.length; i++) {
          if (addedToList[i] === this.item.id) {
            addedToList.splice(i, 1);
          }
        }
      } else {
        this.$store.state.addedToList.push(this.item.id);
      }
    },
    likeButton() {
      if (this.isDisliked === true) {
        const unlikedContents = this.$store.state.unlikedContents;
        for (let i = 0; i < unlikedContents.length; i++) {
          if (unlikedContents[i] === this.item.id) {
            unlikedContents.splice(i, 1);
          }
        }
      }

      const likedContents = this.$store.state.likedContents;
      this.isLiked = !this.isLiked;
      if (this.isLiked === false) {
        for (let i = 0; i < likedContents.length; i++) {
          if (likedContents[i] === this.item.id) {
            likedContents.splice(i, 1);
          }
        }
      } else {
        this.$store.state.likedContents.push(this.item.id);
      }
    },
    dislikeButton() {
      if (this.isLiked === true) {
        const likedContents = this.$store.state.likedContents;
        for (let i = 0; i < likedContents.length; i++) {
          if (likedContents[i] === this.item.id) {
            likedContents.splice(i, 1);
          }
        }
      }

      const unlikedContents = this.$store.state.unlikedContents;
      this.isDisliked = !this.isDisliked;
      if (this.isDisliked === false) {
        for (let i = 0; i < unlikedContents.length; i++) {
          if (unlikedContents[i] === this.item.id) {
            unlikedContents.splice(i, 1);
          }
        }
      } else {
        this.$store.state.unlikedContents.push(this.item.id);
      }
    },
    playButton() {
      this.$store.state.popup = false;
      document.querySelector('#videoPopup').pause();
    },
    filter() {
      const contentTitle = this.activeData.title;
      const category = this.activeData.category;
      const database = this.$store.state.data;

      const filteredData = database.filter(value => {
        for (let i = 0; i < 3; i++) {
          if (value.category[i] === category[i]) {
            return value.category[i];
          }
        }
      });

      this.length = filteredData.length;
      this.$emit('rowCount', this.length);

      const data = [];
      for (let i = 0; i < filteredData.length; i++) {
        if (filteredData[i].title !== contentTitle) {
          data.push(filteredData[i]);
        }
      }
      return data;
    },
    addToListById(itemId) {
      const addedToList = this.$store.state.addedToList;
      if (addedToList.includes(itemId) === true) {
        for (let i = 0; i < addedToList.length; i++) {
          if (addedToList[i] === itemId) {
            addedToList.splice(i, 1);
          }
        }
      } else {
        addedToList.push(itemId);
      }
    },
    onClickOutside() {
      this.outsideCounter++;
      if (this.outsideCounter === 2) {
        this.$store.state.popup = false;
        document.querySelector('#videoPopup').pause();
        this.$store.state.bigVideoPlayerControl = true;
        this.currentTime = 0;
        this.outsideCounter = 0;
        if (this.boxCounter !== 1) {
          this.$router.go(-1);
        } else if (this.boxCounter === 1) {
          this.boxCounter = 0;
        }
      }
    },
    boxAnalogsPlay(id) {
      this.boxCounter += 1;
      this.$router.push({ path: '/watch', query: { id: id } });
      this.$store.state.popup = false;
    }
  },
  watch: {
    '$route'(route) {
      const data = this.$store.state.data.filter(item => item.id === this.$route.query.id);

      this.activeData = data[0];

      this.castLength = Object.keys(this.activeData.cast).length - 1;
      this.directorLength = Object.keys(this.activeData.director).length - 1;
      this.scriptwriterLength = Object.keys(this.activeData.scriptwriter).length - 1;
      this.subcategoriesLength = Object.keys(this.activeData.subcategories).length - 1;
      this.categoryLength = Object.keys(this.activeData.category).length - 1;

      this.isAddedToList = this.$store.state.addedToList.filter(item => item === this.item.id).length > 0;
      this.isLiked = this.$store.state.likedContents.filter(item => item === this.item.id).length > 0;
      this.isDisliked = this.$store.state.unlikedContents.filter(item => item === this.item.id).length > 0;
    },
    '$store.state.cardSound'() {
      this.isMuted = this.$store.state.cardSound;
    },
    '$store.state.popup'() {
      this.onOff = this.$store.state.popup;
    },
    '$store.state.popupNextVideoSecond'() {
      this.currentTime = this.$store.state.popupNextVideoSecond;
    },
    '$store.state.addedToList'() {
      this.isAddedToList = this.$store.state.addedToList.filter(item => item === this.item.id).length > 0;
    },
    '$store.state.likedContents'() {
      this.isLiked = this.$store.state.likedContents.filter(item => item === this.item.id).length > 0;
    },
    '$store.state.unlikedContents'() {
      this.isDisliked = this.$store.state.unlikedContents.filter(item => item === this.item.id).length > 0;
    }
  },
  created() {
    this.isMuted = this.$store.state.cardSound;
  }
};
</script>

<style scoped>
.box-analogs:hover .box-analogs-top-image-hover-button {
  opacity: 1;
  transition: 0.5s;
}

.box-analogs-top-image-hover-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  font-size: 30px;
  border: 1px solid white;
  opacity: 0;
  transition: 0.3s;
}

.box-analogs-top-image-hover {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 132px;
  width: 232px;;
}

.box-analogs-top-image-hover:hover {
  cursor: pointer;
}

.video-frame {
  height: 440px;
  overflow: hidden;
}

.top-info-right a {
  text-decoration: none;
  color: white;
}

.top-info-right a:hover {
  text-decoration: underline;
}

.about-content a {
  text-decoration: none;
  color: white;
}

.about-content a:hover {
  text-decoration: underline;
}

.box-analogs a {
  text-decoration: none;
}

.video-top-info-bottom-right .iconDiv {
  display: flex;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgba(23, 23, 23, 0.7);
  opacity: 0.4;
  border: 2px solid #8e8e8e;
  margin-right: 10px;
  transition: 0.5s;
  color: white;
  font-size: 15px
}

.video-top-info-bottom-right .iconDiv:hover {
  opacity: 1.0;
}

.overlay::-webkit-scrollbar {
  display: none;
}

.overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  overflow: auto;
}

.popupFrame {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.popup {
  position: relative;
  width: 810px;
  height: auto;
  background-color: #181818;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}

.popupContent {
  display: flex;
  flex-direction: column;
}

.popupContent-top {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

}

.videoShadow {
  position: absolute;
  width: 810px;
  height: 490px;
  z-index: 1;
  margin-top: -30px;
}

.button {
  justify-content: center;
  align-items: center;
  margin-top: 2vw;
  display: flex;
  color: white;
}

.video {
  display: flex;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.video video {
  transform: scale(1.4);
  width: 100%;
  z-index: 0;
}

.popupContent-info {
  margin-top: 70px;
  width: 100%;
  height: 400px;
}

.video-top-info {
  position: absolute;
  width: 810px;
  height: 490px;
  z-index: 2;
}

.video-top-info-top {
  display: flex;
  width: 100%;
  height: 45%;
  justify-content: flex-end;
}

.video-top-info-top-close {
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: #181818;
  border-radius: 50%;
  text-decoration: none;
}

.video-top-info-top-close a {
  text-decoration: none;
}

.video-top-info-top-close:hover {
  cursor: pointer;
}

.video-top-info-top-close i {
  color: white;
  font-size: 18px;
}

.video-top-info-top-close p {
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 100;
  font-size: 25px;
  margin-top: 16px;
}

.video-top-info-bottom {
  display: flex;
  width: 100%;
  height: 55%;
}

.video-top-info-bottom-left {
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 3vw;
}

.video-top-info-bottom-left img {
  width: 65%;
}

.video-top-info-bottom-right {
  display: flex;
  width: 40%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
}

.video-top-info-bottom-right .iconDiv {
  margin-bottom: 100px;
  margin-right: 38px;
}

.iconDiv {
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #232323;
  border: 2px solid #8e8e8e;
  margin-right: 10px;
  transition: 0.5s;
}

.iconDiv:hover {
  cursor: pointer;
  border: 2px solid #ffff;
  transition: 0.5s;
}

.iconDiv-play {
  margin-top: 1px;
  display: flex;
  width: 160px;
  height: 38px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-right: 10px;
  transition: 0.5s;
  background-color: white;
  color: black;
}

.iconDiv-play label {
  margin-left: 10px;
  font-size: 17px;
  font-family: sans-serif;
  font-weight: 600;
}

.iconDiv-play label:hover {
  cursor: pointer;
}

.iconDiv-play i {
  font-size: 25px;
}

.iconDiv-play:hover {
  cursor: pointer;
  background-color: #e6e6e6;
  transition: 0.5s;
}

.top-info {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 230px;
  display: flex;
  color: white;
  margin-top: -67px;
}

.top-info-left {
  display: flex;
  flex-direction: column;
  width: 63%;
  padding-left: 42px;
  padding-right: 40px;
}

.top-info-left .green {
  color: #3eb25a;
  font-weight: bold
}

.top-info-right {
  display: flex;
  width: 37%;
}

.top-info-right p {
  width: 230px;
}

.infos {
  display: flex;
  flex-direction: row;
}

.infos p {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-left: 8px;
  font-size: 15px;
  font-weight: 500;
}

.infos p:nth-child(1) {
  margin-left: 0;
}

.age {
  width: 40px;
  text-align: center;
  background: #181818;
  border: 1px solid #747474;
  color: white;
}

.age-similar {
  width: 40px;
  text-align: center;
  font-family: FreeSans,sans-serif;
  font-weight: 500;
  font-size: 15px;
  background: #2f2f2f;
  border: 1px solid #747474;
  color: white;
}

.infos .hd {
  display: flex;
  width: 40px;
  height: auto;
  align-items: center;
  justify-content: center;
  background: #181818;
  border: 1px solid #747474;
  border-radius: 5px;
  transform: scale(0.8);
  color: #cccccc;
}

.description {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
  font-size: 18px;
}

.top-info-right {
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.top-info-right .title {
  color: #8a8a8a;
}

.top-info-right .title-alt {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.similar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: #181818;
  margin-top: 140px;
}

.similar h1 {
  padding-left: 40px;
  color: white;
  font-size: 23px;
}

.similar .box-analogs {
  display: flex;
  flex-direction: column;
  width: 232px;
  height: 340px;
  background-color: #2f2f2f;
  justify-content: flex-start;
  border-radius: 5px;
  margin-right: 15px;
  margin-bottom: 15px;
}

.box-frame {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 40px;
}

.box-analogs-top-image {
  width: 100%;
}

.box-analogs-top-image img {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 100%;
}

.box-analogs-top-sure {
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 2;
  width: 232px;
}

.box-analogs-top-sure label {
  display: flex;
  width: 100%;
  margin-top: 6px;
  margin-right: 5px;
  justify-content: flex-end;
  color: white;
}

.box-analogs-top-shadow {
  width: 232px;
  position: absolute;
}

.box-analogs-top-shadow img {
  width: 100%;
  border-top-right-radius: 5px;
}

.box-analogs-info-top {
  display: flex;
  width: 100%;
  margin-top: 14px;
}

.box-analogs-info-top p {
  margin-right: 10px;
  color: white;
}

.year-similar {
  font-size: 15px;
  font-family: FreeSans,sans-serif;
  font-weight: 400;
}

.box-analogs-info-top-left {
  width: 60%;
  display: flex;
  align-items: flex-end;
  margin-left: 15px;
}

.box-analogs-info-top-right {
  width: 40%;
  margin-right: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.box-analogs-info-top-right .iconDiv {
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #2f2f2f;
  border: 2px solid #8e8e8e;
  margin-right: 10px;
  transition: 0.5s;
}

.box-analogs-info-top-right .iconDiv:hover {
  border: 2px solid white;
}

.box-analogs-info-description {
  margin-top: -10px;
}

.box-analogs-info-description p {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0 20px 0 20px;
  color: #dadada;
  font-size: 13px;
  font-weight: 400;
}

.about-content {
  width: 100%;
  background-color: #181818;
  margin-top: -30px;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
}

.about-content .about-text {
  padding-top: 30px;
  margin-left: 40px;
  font-family: FreeSans,sans-serif;
  font-size: 23px;
  color: white;
}

.about-content .other-info {
  margin-left: 40px;
  color: #807e7e;
  font-size: 13px;
  margin-bottom: -7px;
}

.about-content .other-info label {
  color: white;
  line-height: 20px;
  font-family: FreeSans,sans-serif;
  font-weight: 500;
}

@media (max-width: 835px) {
  .box-analogs-top-image-hover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 23.2vw;
    width: 41vw;
  }

  .video-frame {
    height: 55vw;
    overflow: hidden;
  }

  .popupFrame {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .popup {
    position: relative;
    width: 95vw;
    height: auto;
    background-color: #181818;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  }

  .videoShadow {
    position: absolute;
    height: 60vh;
    z-index: 1;
  }

  .popupContent-info {
    margin-top: 10vw;
    width: 100%;
  }

  .video-top-info {
    position: absolute;
    width: 100%;
    height: 60vw;
    z-index: 2;
  }

  .video-top-info-top {
    display: flex;
    width: 100%;
    height: 45%;
    justify-content: flex-end;
  }

  .video-top-info-top-close {
    margin-right: -8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
  }

  .video-top-info-top-close p {
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 2.4vw;
  }

  .video-top-info-bottom-left {
    width: 100vw;
  }

  .video-top-info-bottom-left img {
    width: 65%;
    padding-left: 6vw;
  }

  .video-top-info-bottom-right {
    display: flex;
    width: 400px;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .iconDiv {
    display: flex;
    width: 4vw;
    height: 4vw;
    justify-content: center;
    align-items: center;
    background-color: #232323;
    border: 0.3vw solid #8e8e8e;
    margin-right: 1vw;
    transition: 0.5s;
  }

  .iconDiv:hover {
    cursor: pointer;
    border: 0.3vw solid #ffff;
    transition: 0.5s;
  }

  .iconDiv-play {
    margin-top: 1px;
    display: flex;
    width: 18vw;
    height: 5vw;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vw;
    margin-right: 1vw;
    transition: 0.5s;
    background-color: white;
    color: black;
  }

  .iconDiv-play label {
    margin-left: 1vw;
    font-size: 2.2vw;
    font-family: sans-serif;
    font-weight: 600;
  }

  .iconDiv-play label:hover {
    cursor: pointer;
  }

  .iconDiv-play i {
    font-size: 3.4vw;
  }

  .iconDiv-play:hover {
    cursor: pointer;
    background-color: #e6e6e6;
    transition: 0.5s;
  }

  .top-info {
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 23vw;
    display: flex;
    color: white;
    margin-top: -8vw;
  }

  .top-info-left {
    display: flex;
    flex-direction: column;
    width: 63%;
    padding-left: 5vw;
    padding-right: 5vw;
  }

  .top-info-left .green {
    color: #3eb25a;
    font-weight: bold
  }

  .top-info-right {
    display: flex;
    width: 37%;
  }

  .top-info-right p {
    width: 200px;
  }

  .infos {
    display: flex;
    flex-direction: row;
  }

  .infos p {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-left: 8px;
    font-size: 15px;
    font-weight: 500;
  }

  .infos p:nth-child(1) {
    margin-left: 0;
  }

  .age {
    width: 40px;
    text-align: center;
    background: #181818;
    border: 1px solid #747474;
    color: white;
  }

  .age-similar {
    width: 40px;
    text-align: center;
    font-family: FreeSans,sans-serif;
    font-weight: 500;
    font-size: 15px;
    background: #2f2f2f;
    border: 1px solid #747474;
    color: white;
  }

  .infos .hd {
    display: flex;
    width: 4.5vw;
    height: auto;
    align-items: center;
    justify-content: center;
    background: #181818;
    border: 1px solid #747474;
    border-radius: 5px;
    transform: scale(0.8);
    color: #cccccc;
  }

  .description {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 18px;
  }

  .similar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: auto;
    background-color: #181818;
    margin-top: 18vw;
  }

  .similar h1 {
    padding-left: 5vw;
    color: white;
    font-size: 23px;
  }

  .similar .box-analogs {
    display: flex;
    flex-direction: column;
    width: 27vw;
    height: 300px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right: 1.5vw;
    margin-bottom: 2vw;
  }

  .box-frame {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 5vw;
  }

  .box-analogs-top-image {
    width: 100%;
  }

  .box-analogs-top-image img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
  }

  .box-analogs-top-sure {
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 25.8vw;
  }

  .box-analogs-top-sure label {
    display: flex;
    width: 100%;
    margin-top: 6px;
    margin-right: 5px;
    justify-content: flex-end;
    color: white;
  }

  .box-analogs-top-shadow {
    width: 27vw;
    position: absolute;
  }

  .box-analogs-top-shadow img {
    width: 100%;
    border-top-right-radius: 5px;
  }

  .box-analogs-info-top {
    display: flex;
    width: 100%;
    margin-top: 4px;
  }

  .box-analogs-info-top p {
    margin-right: 10px;
    color: white;
  }

  .year-similar {
    font-size: 15px;
    font-family: FreeSans,sans-serif;
    font-weight: 400;
  }

  .box-analogs-info-top-left {
    width: 60%;
    display: flex;
    align-items: flex-end;
    margin-left: 15px;
  }

  .box-analogs-info-top-right {
    width: 40%;
    margin-right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

  .box-analogs-info-top-right .iconDiv {
    display: flex;
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #2f2f2f;
    border: 2px solid #8e8e8e;
    margin-right: 10px;
    transition: 0.5s;
  }

  .box-analogs-info-top-right .iconDiv:hover {
    border: 2px solid white;
  }

  .box-analogs-info-description {
    margin-top: -10px;
  }

  .box-analogs-info-description p {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0 20px 0 20px;
    color: #dadada;
    font-size: 12px;
    font-weight: 400;
  }

  .about-content {
    width: 100%;
    background-color: #181818;
    margin-top: -30px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
  }

  .about-content .about-text {
    padding-top: 30px;
    margin-left: 40px;
    font-family: FreeSans,sans-serif;
    font-size: 23px;
    color: white;
  }

  .about-content .other-info {
    margin-left: 40px;
    color: #807e7e;
    font-size: 13px;
    margin-bottom: -7px;
  }

  .about-content .other-info label {
    color: white;
    line-height: 20px;
    font-family: FreeSans,sans-serif;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .video video {
    transform: scale(1.4);
    width: 100%;
    height: 52vw;
    z-index: 0;
  }

  .videoShadow {
    position: absolute;
    z-index: 1;
    width: 300px;
    height: 60vw;
    margin-top: -4vw;
    opacity: 1;
  }

  .videoShadow img {
    width: 95vw
  }

  .similar .iconDiv {
    margin-left: 1.3vw;
    margin-top: 0.5vw;
  }

  .video-top-info-top-close {
    margin-right: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
  }

  .video-top-info-top-close p {
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 2.35vw;
  }

}

@media (max-width: 730px) {

  #top-info-squad {
    display: none;
  }

  .popupFrame {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .popup {
    position: relative;
    width: 95vw;
    height: auto;
    background-color: #181818;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  }

  .videoShadow {
    margin-top: 0;
    position: absolute;
    opacity: 0.4;
    width: 100%;
    height: 53.5vw;
    z-index: 1;
  }

  .popupContent-info {
    margin-top: 10vw;
    width: 100%;
  }

  .video-top-info {
    position: absolute;
    width: 90%;
    height: 60vw;
    z-index: 2;
  }

  .video-top-info-top {
    display: flex;
    width: 100%;
    height: 45%;
    justify-content: flex-end;
  }

  .video-top-info-top-close {
    margin-right: -8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
  }

  .video-top-info-top-close p {
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 2.4vw;
  }

  .video-top-info-bottom-left {
    width: 100vw;
  }

  .video-top-info-bottom-left img {
    width: 65%;
    padding-left: 6vw;
  }


  .video-top-info-bottom-right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .video-top-info-bottom-right .iconDiv {
    margin-bottom: 13.5vw;
    margin-right: -3vw;
  }

  .iconDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #232323;
    border: 0.3vw solid #8e8e8e;
    margin-right: 1vw;
    transition: 0.5s;
  }

  .iconDiv:hover {
    cursor: pointer;
    border: 0.3vw solid #ffff;
    transition: 0.5s;
  }

  .iconDiv-play {
    margin-top: 1px;
    display: flex;
    width: 18vw;
    height: 5vw;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vw;
    margin-right: 1vw;
    transition: 0.5s;
    background-color: white;
    color: black;
  }

  .iconDiv-play label {
    margin-left: 1vw;
    font-size: 2.2vw;
    font-family: sans-serif;
    font-weight: 600;
  }

  .iconDiv-play label:hover {
    cursor: pointer;
  }

  .iconDiv-play i {
    font-size: 3.4vw;
  }

  .iconDiv-play:hover {
    cursor: pointer;
    background-color: #e6e6e6;
    transition: 0.5s;
  }

  .top-info {
    z-index: 4;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: white;
  }

  .top-info-left {
    display: flex;
    text-align: center;
    flex-direction: column;
    width: 90%;
  }

  .top-info-left .green {
    color: #3eb25a;
    font-weight: bold
  }

  .infos {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .infos p {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    font-size: 15px;
    font-weight: 500;
  }

  .infos p:nth-child(1) {
    margin-left: 0;
  }

  .age {
    width: 40px;
    text-align: center;
    background: #181818;
    border: 1px solid #747474;
    color: white;
  }

  .age-similar {
    width: 40px;
    text-align: center;
    font-family: FreeSans,sans-serif;
    font-weight: 500;
    font-size: 15px;
    background: #2f2f2f;
    border: 1px solid #747474;
    color: white;
  }

  .infos .hd {
    display: flex;
    width: 4.5vw;
    height: auto;
    align-items: center;
    justify-content: center;
    background: #181818;
    border: 1px solid #747474;
    border-radius: 5px;
    transform: scale(0.8);
    color: #cccccc;
  }

  .description {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 18px;
  }

  .top-info-right {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1vw;
    margin-right: 6vw;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .top-info-right .title {
    color: #8a8a8a;
  }

  .top-info-right .title-alt {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .similar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
    background-color: #181818;
    margin-top: 16vw;
  }

  .similar h1 {
    padding-left: 5vw;
    color: white;
    font-size: 23px;
  }

  .similar .box-analogs {
    display: flex;
    flex-direction: column;
    width: 41vw;
    height: 320px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right: 1.5vw;
    margin-bottom: 2vw;
  }

  .box-frame {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 5vw;
  }

  .box-analogs-top-image {
    width: 100%;
  }

  .box-analogs-top-image img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
  }

  .box-analogs-top-sure {
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 41vw;
  }

  .box-analogs-top-sure label {
    display: flex;
    width: 100%;
    margin-top: 6px;
    margin-right: 5px;
    justify-content: flex-end;
    color: white;
  }

  .box-analogs-top-shadow {
    width: 41vw;
    position: absolute;
  }

  .box-analogs-top-shadow img {
    width: 100%;
    border-top-right-radius: 5px;
  }

  .box-analogs-info-top {
    display: flex;
    width: 100%;
    margin-top: 4px;
  }

  .box-analogs-info-top p {
    margin-right: 10px;
    color: white;
  }

  .year-similar {
    font-size: 15px;
    font-family: FreeSans,sans-serif;
    font-weight: 400;
  }

  .box-analogs-info-top-left {
    width: 60%;
    display: flex;
    align-items: flex-end;
    margin-left: 15px;
  }

  .box-analogs-info-top-right {
    width: 40%;
    margin-right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

  .box-analogs-info-top-right .iconDiv {
    display: flex;
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #2f2f2f;
    border: 2px solid #8e8e8e;
    margin-right: 10px;
    transition: 0.5s;
  }

  .box-analogs-info-top-right .iconDiv:hover {
    border: 2px solid white;
  }

  .box-analogs-info-description {
    margin-top: -10px;
  }

  .box-analogs-info-description p {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0 20px 0 20px;
    color: #dadada;
    font-size: 12px;
    font-weight: 400;
  }

  .about-content {
    width: 100%;
    background-color: #181818;
    margin-top: -30px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
  }

  .about-content .about-text {
    padding-top: 30px;
    margin-left: 40px;
    font-family: FreeSans,sans-serif;
    font-size: 23px;
    color: white;
  }

  .about-content .other-info {
    margin-left: 40px;
    color: #807e7e;
    font-size: 13px;
    margin-bottom: -7px;
  }

  .about-content .other-info label {
    color: white;
    line-height: 20px;
    font-family: FreeSans,sans-serif;
    font-weight: 500;
  }
}

@media (max-width: 425px) {
  .box-analogs-top-image-hover-button {
    opacity: 1;
  }

  .similar {
    margin-top: 40vw;
  }

  .similar .button {
    display: none;
  }

  .infos .hd {
    width: 40px;
  }

  .button .iconDiv {
    width: 32px;
    height: 32px;
  }

  .video-top-info {
    display: flex;
    flex-direction: column;
  }

  .video-top-info-bottom {
    display: flex;
    flex-direction: column;
  }

  .video-top-info-bottom-left {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -18vw;
  }

  .video-top-info-bottom-left img {
    margin-left: 9vw;
    margin-top: -10vw;
  }

  .iconDiv {
    width: 7vw;
    height: 7vw;
  }

  .iconDiv-play {
    width: 33vw;
    height: 8vw;
  }

  .iconDiv-play label {
    font-size: 14px;
  }

  .iconDiv-play i {
    font-size: 18px;
  }

  .video-top-info-bottom-right {
    position: absolute;
    margin-left: -85vw;
    margin-top: -61vw;
  }

  .video-top-info-top-close {
    margin-right: -6vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
  }

  .video-top-info-top-close p {
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 4vw;
  }

  .videoShadow {
    position: absolute;
    z-index: 1;
    width: 300px;
    height: 60vw;
    margin-top: -4vw;
    opacity: 1;
  }

  .videoShadow img {
    width: 95vw
  }

  .similar .iconDiv {
    margin-left: 1.3vw;
    margin-top: 1.4vw;
  }

  .description p {
    font-family: FreeSans,sans-serif;
    font-size: 17px;
  }
}

@media (max-width: 414px) {
  .box-analogs-top-image-hover-button {
    opacity: 1;
  }

  .similar {
    margin-top: 31vw;
  }

  .box-analogs-top-shadow {
    width: 83vw;
    position: absolute;
  }

  .similar .box-analogs {
    display: flex;
    flex-direction: column;
    width: 83vw;
    height: 350px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right: 1.5vw;
    margin-bottom: 3vw;
  }

  .box-analogs-top-sure {
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 83vw;
  }

  .box-analogs p {
    font-size: 14px;
  }

  .video-top-info-bottom-right {
    position: absolute;
    margin-left: -87vw;
    margin-top: -61vw;
  }

  .videoShadow {
    position: absolute;
    z-index: 1;
    width: 300px;
    height: 60vw;
    margin-top: -4vw;
    opacity: 1;
  }

  .videoShadow img {
    width: 95vw
  }

  .similar .iconDiv {
    margin-top: 1vw;
    margin-left: -0.3vw;
  }

  .age-similar {
    transform: scale(0.9);
  }

  .year-similar {
    margin-left: -1vw;
  }

  .description p {
    font-family: FreeSans,sans-serif;
    font-size: 16px;
  }
}

@media (max-width: 320px) {
  .box-analogs-top-image-hover-button {
    opacity: 1;
  }

  .similar {
    margin-top: 80vw;
  }

  .similar .box-analogs {
    display: flex;
    flex-direction: column;
    width: 41vw;
    height: 350px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right: 1.5vw;
    margin-bottom: 2vw;
  }

  .age-similar {
    display: none;
  }

  .video-top-info-bottom-right {
    position: absolute;
    margin-left: -20vw;
    margin-top: -59vw;
  }

  .video-top-info-top-close p {
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 5vw;
  }

  .videoShadow {
    position: absolute;
    z-index: 1;
    width: 300px;
    height: 60vw;
    margin-top: -4vw;
    opacity: 1;
  }

  .videoShadow img {
    width: 95vw
  }

  .age {
    display: none;
  }
}

@media (max-width: 375px) {
  .similar {
    margin-top: 40vw;
  }

  .box-analogs-top-image-hover-button {
    opacity: 1;
    width: 70px;
    height: 70px;
    font-size: 50px;
  }

  .box-analogs-top-image-hover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 47vw;
    width: 83vw;
  }

  .video-top-info-bottom-right {
    position: absolute;
    margin-left: -93vw;
    margin-top: -59vw;
  }
}

@media (max-width: 390px) {
  .box-analogs-top-image-hover-button {
    opacity: 1;
  }

  .video-top-info-bottom-right {
    position: absolute;
    margin-left: -95vw;
    margin-top: -59vw;
  }

  .box-analogs-top-image-hover-button {
    opacity: 1;
  }
}
</style>
