<template>
  <div class="app">

    <div class="playerClose-top">
      <i @click="backTo" class="bi bi-arrow-left"></i>
    </div>

    <div id="player">
      <video controls :src="activeDataPlayer.videoSrc"></video>
    </div>

  </div>
</template>

<script>
import PlayerJS from '../../assets/js/playerjs';

export default {
  data() {
    return {
      database: this.$store.getters['getFirebaseData'],
      queryId: this.$route.query.id,
      activeDataPlayer: {}
    };
  },
  created() {
    const dataLength = Object.keys(this.database).length;
    for (let i = 0; i < dataLength; i++) {
      if (this.database[i].id === this.$route.query.id) {
        this.activeDataPlayer = {
          id: this.database[i].id,
          title: this.database[i].title,
          img: this.database[i].img,
          logo: this.database[i].logo,
          videoSrc: this.database[i].videoSrc,
          newAndDate: this.database[i].newAndDate,
          age: this.database[i].age,
          year: this.database[i].year,
          category: this.database[i].category,
          time: this.database[i].time,
          videoQuality: this.database[i].videoQuality,
          subcategories: this.database[i].subcategories,
          videoDescription: this.database[i].videoDescription,
          director: this.database[i].director,
          cast: this.database[i].cast,
          scriptwriter: this.database[i].scriptwriter,
          likeButton: this.database[i].likeButton,
          dislikeButton: this.database[i].dislikeButton,
          addedToList: this.database[i].addedToList,
          popular: this.database[i].popular,
          numberOfViews: this.database[i].numberOfViews
        };

      }
    }

    document.querySelector('.header').style.transition = '0.3s';
    document.querySelector('.header').style.opacity = '0';
  },
  mounted() {
    new PlayerJS({
      id: 'player',
      file: this.activeDataPlayer.videoSrc,
      autoplay: 1,
      fluid: true,
      title: this.activeDataPlayer.title
    });
    document.querySelector('#footer').style.display = 'none';
  },
  methods: {
    backTo() {
      this.$router.go(-1);
      document.querySelector('.header').style.transition = '0.3s';
      document.querySelector('.header').style.opacity = '1';
    }
  }
};

</script>

<style scoped>

#player {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 100vh;
}


.playerClose-top {
  position: absolute;
  z-index: 7;
  margin-top: 20px;
}


.playerClose-top i {
  color: white;
  font-size: 50px;
  padding: 30px;
  z-index: 7;
}

.playerClose-top i:hover {
  cursor: pointer;


}


</style>
