<template>

  <div id="ana">

    <Preloader v-if="!isLoading"/>

    <div id="slider" v-if="isLoading">
      <app-slider :database="database" :searchValue="mainSliderText" class="app-slider"
                  @indexSensor="index_sensor($event)"></app-slider>
      <slider-top :database="database" :searchValue="topText" class="app-slider"
                  @indexSensor="index_sensor($event)"></slider-top>
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
  mounted() {
    this.database = this.$store.state.data;
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
      this.$router.push('/browse/new-popular');
    }
  }

};
</script>

<style scoped>

#slider {
  width: 100%;
  height: 40vw;
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
  margin-top: 1vw;
  z-index: 1;
}


.app-slider:nth-child(2) {
  margin-top: 14.7vw;
  /* +14.7  */
}

.app-slider:nth-child(3) {
  margin-top: 31.7vw;
}

.app-slider:nth-child(4) {
  margin-top: 46.4vw;
}

.app-slider:nth-child(5) {
  margin-top: 61.1vw;
}


@media (max-width: 786px) {
  #slider {
    height: 80vw;
  }

  .app-slider {
    width: 100%;
    position: absolute;
    margin-top: 15vw;
    z-index: 1;
  }

  .app-slider:nth-child(2) {
    margin-top: 40vw;
    /* +14.7  */
  }

  .app-slider:nth-child(3) {
    margin-top: 65vw;
  }

  .app-slider:nth-child(4) {
    margin-top: 90vw;
  }

  .app-slider:nth-child(5) {
    margin-top: 115vw;
  }


}


body {
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: sans-serif;
}


</style>
