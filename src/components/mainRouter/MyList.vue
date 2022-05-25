<template>
  <div>
    <div class="maincont">
      <div style="margin-top:5.5vw">
        <h1>My List</h1>
        <div class="incomingValues">
          <content-card
            v-for="item in result"
            :item="item"
            :key="item.id"
            class="card"
          >
          </content-card>
        </div>
      </div>
    </div>


    <app-footer></app-footer>
  </div>
</template>

<script>
import ContentCard from '../Card/ContentCard.vue';
import appFooter from '../Footer.vue';

export default {
  components: {
    ContentCard, appFooter
  },
  data() {
    return {
      database: null,
      result: null
    };
  },
  watch: {
    '$store.state.addedToList'(list) {
      const results = [];
      const data = this.$store.state.firebaseData;
      const length = this.$store.state.firebaseData.length;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (data[i].id === list[j]) {
            results.push(data[i]);
          }
        }
      }

      this.result = results.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([ current ]);
        } else {
          return acc;
        }
      }, []);
    }
  },
  mounted() {
    document.querySelector('.header').style.position = 'fixed';
    document.querySelector('.header').style.top = '0';
    document.querySelector('.header').style.left = '0';
  },

  created() {
    this.database = this.$store.state.firebaseData;
    if (this.$route.fullPath.match('id')) {
      this.$router.push('/browse/list');
    }


    const results = [];
    const data = this.$store.state.firebaseData;
    const length = this.$store.state.firebaseData.length;
    const activeList = this.$store.state.addedToList;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < activeList.length; j++) {
        if (data[i].id === activeList[j]) {
          results.push(data[i]);
        }
      }
    }

    this.result = results.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([ current ]);
      } else {
        return acc;
      }
    }, []);
  }
};
</script>

<style scoped>

h1 {
  font-family: FreeSans;
  font-weight: 100;
  font-size: 20px;
  margin-left: 4.5vw;
}

.maincont {
  display: flex;
  justify-content: flex-start;
  color: white;
  flex-direction: column;
  min-height: 30vw;
}

.card {
  height: 12.2vw;
  margin-right: 15.6vw;
}

.incomingValues {
  justify-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  transform: scale(0.95);
  margin-left: 2vw;
}

@media (max-width: 768px) {
  .maincont {
    margin-top: 5vw;
  }

  .card {
    height: 15vw;
    margin-right: 24.8vw;
  }
}

@media (max-width: 425px) {
  .maincont {
    margin-top: 5vw;
  }

  .card {
    height: 19vw;
    margin-right: 32vw;
  }
}

@media (max-width: 425px) {
  .maincont {
    margin-top: 15vw;
  }

}
</style>
