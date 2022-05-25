<template>

  <div id="ana">

    <Preloader v-if="!isLoading"/>

    <app-big-video v-if="isLoading" :selectType="'Film'" :database="database"></app-big-video>

    <div id="slider" v-if="isLoading">
      <app-slider :database="database" :type="'Film'" :filterData="'category'" :searchValue="'Immersive'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'Film'" :filterData="'category'" :searchValue="'Emotional'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'Film'" :filterData="'category'"
                  :searchValue="'Science Fiction & Fantasy'" class="app-slider"
                  @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'Film'" :filterData="'category'" :searchValue="'Domestic Movies'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'Film'" :filterData="'category'" :searchValue="'Action'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'Film'" :filterData="'category'" :searchValue="'Comedies'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'Film'" :filterData="'category'" :searchValue="'Action'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
    </div>

    <app-footer></app-footer>

  </div>

</template>

<script>
import appBigVideo from '../appBigVideo.vue';
import appSlider from '../Card/Slider.vue';
import Preloader from '../Preloader.vue';
import appFooter from '../Footer.vue';

export default {
  components: {
    appBigVideo, appSlider, Preloader, appFooter
  },
  data() {
    return {
      database: null,
      mainSliderText: 'Popular on Netflix',
      topText: 'Today\'s Top 10 List',
      isLoading: false
    };
  },
  mounted() {
    this.database = this.$store.state.firebaseData;
    if (this.database.length >= 0) {
      setTimeout(() => {
        this.isLoading = true;
      }, 500);
    }
  },
  methods: {
    index_sensor(text) {
      const slider = document.querySelector('#slider');
      const sliderCount = slider.childElementCount;


      for (let i = 0; i < sliderCount; i++) {
        if (text === slider.children[i].children[0].children[0].textContent) {
          slider.children[i].style.zIndex = '3';
        } else if (text === slider.children[i].children[0].children[0].textContent + 'end') {
          slider.children[i].style.zIndex = '1';
        }
      }


    }
  },
  created() {
    if (this.$route.fullPath.match('id')) {
      this.$router.push('/browse/movies');
    }
  }

};
</script>

<style scoped>


#slider {
  width: 100%;
  height: 90vw;
}


.loader {
  position: absolute;
  top: 0;
  width: 100%;
  height: 400px;
  background: red;
}

.app-slider {
  width: 100%;
  position: absolute;
  margin-top: -18.5vw;
  z-index: 1;
}


.app-slider:nth-child(2) {
  margin-top: -3.8vw;
  /* +14.7  */
}

.app-slider:nth-child(3) {
  margin-top: 10.9vw;
}

.app-slider:nth-child(4) {
  margin-top: 25.6vw;
}

.app-slider:nth-child(5) {
  margin-top: 40.3vw;
}

.app-slider:nth-child(6) {
  margin-top: 55vw;
}

.app-slider:nth-child(7) {
  margin-top: 69.7vw;
}

@media (max-width: 786px) {
  #slider {
    height: 200vw;
  }

  .app-slider {
    width: 100%;
    position: absolute;
    margin-top: -3vw;
    z-index: 1;
  }

  .app-slider:nth-child(2) {
    margin-top: 25vw;
    /* +14.7  */
  }

  .app-slider:nth-child(3) {
    margin-top: 50vw;
  }

  .app-slider:nth-child(4) {
    margin-top: 75vw;
  }

  .app-slider:nth-child(5) {
    margin-top: 100vw;
  }

  .app-slider:nth-child(6) {
    margin-top: 125vw;
  }

  .app-slider:nth-child(7) {
    margin-top: 150vw;
  }
}


body {
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: sans-serif;
}


</style>
