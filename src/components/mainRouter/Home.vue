<template>

  <div id="ana">

    <Preloader v-if="!isLoading"/>

    <app-big-video v-if="isLoading" :selectType="'all'" :database="database"></app-big-video>

    <div id="slider" v-if="isLoading">
      <app-slider :database="database" :searchValue="mainSliderText" class="app-slider"
                  @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'all'" :filterData="'category'" :searchValue="'Comedies'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'all'" :filterData="'category'" :searchValue="'Emotional'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'all'" :filterData="'category'"
                  :searchValue="'Science Fiction & Fantasy'" class="app-slider"
                  @indexSensor="index_sensor($event)"></app-slider>
      <slider-top :database="database" :searchValue="topText" class="app-slider"
                  @indexSensor="index_sensor($event)"></slider-top>
      <app-slider :database="database" :type="'all'" :filterData="'category'" :searchValue="'Domestic Movies'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'all'" :filterData="'category'" :searchValue="'Domestic Series'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'all'" :filterData="'category'" :searchValue="'Immersive'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'all'" :filterData="'category'" :searchValue="'Action'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
      <app-slider :database="database" :type="'all'" :filterData="'category'" :searchValue="'Action'"
                  class="app-slider" @indexSensor="index_sensor($event)"></app-slider>
    </div>

    <app-footer></app-footer>

  </div>

</template>

<script>
import appBigVideo from '../appBigVideo.vue';
import appSlider from '../Card/Slider.vue';
import Preloader from '../Preloader.vue';
import SliderTop from '../Card/popular/SliderTop.vue';
import appFooter from '../Footer.vue';

export default {
  components: {
    appBigVideo, appSlider, Preloader, SliderTop, appFooter
  },
  data() {
    return {
      database: null,
      mainSliderText: 'Popular on Netflix',
      topText: 'Today\'s Top 10 List',
      isLoading: false
    };
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
    fetch('/data/data.json').then(res => res.json()).then(data => {
      data.forEach(dataElement => {
        this.$store.commit('setData', dataElement);
      });
    });

    const path = this.$route.fullPath;
    if (path.match('id')) {
      this.$router.push('/browse');
    }
  },
  mounted() {
    this.database = this.$store.state.data;
    if (this.database.length >= 0) {
      setTimeout(() => {
        this.isLoading = true;
      }, 500);
    }
  }
};
</script>

<style scoped>

#slider {
  width: 100%;
  height: 140vw;
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
  overflow-y: hidden;
}

.app-slider:nth-child(6) {
  margin-top: 58vw;
}

.app-slider:nth-child(7) {
  margin-top: 73vw;
}

.app-slider:nth-child(8) {
  margin-top: 88vw;
}

.app-slider:nth-child(9) {
  margin-top: 103vw;
}

.app-slider:nth-child(10) {
  margin-top: 118vw;
}


@media (max-width: 786px) {
  #slider {
    height: 280vw;
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
    margin-top: 102.4vw;
  }

  .app-slider:nth-child(6) {
    margin-top: 130vw;
  }

  .app-slider:nth-child(7) {
    margin-top: 155vw;
  }

  .app-slider:nth-child(8) {
    margin-top: 180vw;
  }

  .app-slider:nth-child(9) {
    margin-top: 205vw;
  }

  .app-slider:nth-child(10) {
    margin-top: 230vw;
  }

}


body {
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: sans-serif;
}


</style>
