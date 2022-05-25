<template>
  <div class="placeholder-video">
    <video id="videoDiv" autoplay :muted="muted" loop :src="video"></video>
  </div>
</template>

<script>
export default {
  props: [ 'video' ],
  data() {
    return {
      muted: null,
      isLoaded: false
    };
  },
  watch: {
    '$store.state.cardSound'() {
      this.muted = this.$store.state.cardSound;
    },
    '$store.state.cardCounter'() {
      if (this.$store.state.cardCounter > document.querySelector('#videoDiv').duration) {
        this.$store.state.cardCounter = 0;
        clearInterval(this.$store.state.cardInterval);
        let counter = 0;
        let newCardInterval = setInterval(() => {
          counter++;
          this.$store.state.cardCounter = counter;
        }, 1000);
        newCardInterval = this.$store.state.cardInterval;
      }
    }
  },
  created() {
    this.muted = this.$store.state.cardSound;
  }
};
</script>

<style scoped>
.placeholder-video {
  position: absolute;
  z-index: 2;
  margin-top: -9vw;
  overflow: hidden;
  border-top-left-radius: 0.2vw;
  border-top-right-radius: 0.2vw;
  transition: 0.3s;
}

.placeholder-video video {
  transform: scale(1.44);

}

.placeholder video {
  width: 100%;

}
</style>
