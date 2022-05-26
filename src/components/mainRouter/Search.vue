<template>
  <div>
    <div class="maincont">
      <div style="margin-top:5.5vw">
        <div class="incomingValues" v-if="searchedValue.length > 1">
          <content-card
            v-for="item in filter(searchedValue)"
            :item="item"
            :key="item.id"
            class="card"
          >
          </content-card>
        </div>

        <div class="notFounded" v-if="dataLength === 0">
          <p>Your search for "{{ searchedValue }}" did not have any matches.</p>
          <p>Suggestions:</p>
          <ul>
            <li>Try different keywords</li>
            <li>Looking for a movie or TV show?</li>
            <li>Try using a movie, TV show title, an actor or director</li>
            <li>Try a genre, like comedy, romance, sports, or drama</li>
          </ul>
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
      searchedValue: null,
      database: null,
      dataLength: null
    };
  },
  watch: {
    '$store.state.searchValue'(value) {
      this.searchedValue = value;
    }
  },
  methods: {
    filter(value) {
      const result = this.database.filter(item =>
        item.title.toLowerCase().match(value.toLowerCase()) ||
        item.cast[0].toLowerCase().match(value.toLowerCase()) ||
        item.category[0].toLowerCase().match(value.toLowerCase()) ||
        item.category.includes(value.toLowerCase()) ||
        item.subcategories.includes(value.toLowerCase()) ||
        item.cast.includes(value.toLowerCase()) ||
        item.scriptwriter.includes(value.toLowerCase()) ||
        item.director.includes(value.toLowerCase())
      );

      const filteredResult = result.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([ current ]);
        } else {
          return acc;
        }
      }, []);

      this.dataLength = filteredResult.length;
      return filteredResult;
    }
  },
  mounted() {
    document.querySelector('.header').style.position = 'fixed';
    document.querySelector('.header').style.top = '0';
    document.querySelector('.header').style.left = '0';
  },
  created() {
    this.searchedValue = this.$store.state.searchValue;
    this.database = this.$store.state.firebaseData;
  }
};
</script>

<style scoped>

.notFounded {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
}

h1 {
  font-family: FreeSans;
  font-weight: 100;
  font-size: 17px;
  margin-left: 4.5vw;
}

.maincont {
  display: flex;
  justify-content: flex-start;
  color: white;
  flex-direction: column;
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

@media (max-width: 786px) {
  .maincont {
    margin-top: 3vw;
  }

  .card {
    height: 15vw;
    margin-right: 25vw;
  }
}

@media (max-width: 425px) {
  .maincont {
    margin-top: 18vw;
  }

  .card {
    height: 19vw;
    margin-right: 32vw;
  }
}

@media (max-width: 320px) {
  .maincont {
    margin-top: 22vw;
  }
}
</style>
