<template>
  <div class="row">
    <content-card
      v-for="(item, index) in dataset"
      :item="item"
      :key="index"
      :incomingDataLength="length"
      :lengthNumber="index"
      class="card"
    >
    </content-card>
  </div>
</template>

<script>
import ContentCard from './ContentCard.vue';

export default {
  props: [ 'searchValue', 'filterData', 'database', 'title', 'type', 'rightClickCounter' ],
  data() {
    return {
      length: '',
      dataset: ''
    };
  },
  components: {
    ContentCard
  },
  methods: {
    filter(data, value, type) {
      if (data === 'popular') {
        this.data = this.database.filter(item => item.popular === true);
        this.length = this.data.length;

        this.$emit('rowCount', this.length);
        return this.data;
      } else if (data === 'category') {
        if (type === 'Film' || type === 'Series') {
          const filteredData = this.database.filter(item => item.type === type).filter(value => {
            for (let i = 0; i < 3; i++) {
              if (value.category[i] === value) {
                return value.category[i];
              }
            }
          });
          this.length = filteredData.length;
          this.$emit('rowCount', this.length);

          let dataConcat = filteredData.concat(filteredData);

          for (let i = 0; i < this.rightClickCounter; i++) {
            dataConcat = filteredData.concat(filteredData);
          }
          this.data = dataConcat;
          return this.data;
        } else {
          const filteredData = this.database.filter(value => {
            for (let i = 0; i < 3; i++) {
              if (value.category[i] === value) {
                return value.category[i];
              }
            }
          });
          this.length = filteredData.length;
          this.$emit('rowCount', this.length);
          this.data = filteredData;
          return filteredData;
        }
      } else if (data === 'all') {
        this.length = this.database.length;

        this.$emit('rowCount', this.length);
        this.data = this.database;
        return this.database;
      } else if (data === 'sub_category') {
        if (type === 'Film' || type === 'Series') {
          let filteredData = this.database.filter((item) => item.type === type);
          filteredData = filteredData.filter(function (value) {
            for (let i = 0; i < 3; i++) {
              if (value.subcategories[i] === value) {

                return value.subcategories[i];
              }
            }
          });

          this.length = filteredData.length;
          this.$emit('rowCount', this.length);

          return filteredData;
        }
      }
    }
  },
  watch: {
    'rightClickCounter'(value) {
      this.dataset = this.dataset.concat(this.dataset.slice(0, this.length));
    }
  },
  created() {
    if (this.searchValue === 'Popular on Netflix') {
      const filteredData = this.database.filter((item) => item.popular === true);
      this.dataset = filteredData;
      this.length = filteredData.length;
      this.$emit('rowCount', this.length);
    } else if (this.searchValue === 'New Content on Netflix') {
      const length = this.database.length;
      const newArray = [];
      const filtered = this.database.map((value, index) => {
        if (index > length - 14) {
          return value;
        }
      });

      for (let i = 0; i < 13; i++) {
        newArray.push(filtered[i + (length - 13)]);
      }

      this.dataset = newArray;
      this.length = newArray.length;
      this.$emit('rowCount', this.length);
    } else {
      if (this.type === 'all') {
        const filteredData = this.database.filter(item => item.category.includes(this.searchValue));
        this.dataset = filteredData;
        this.length = filteredData.length;
        this.$emit('rowCount', this.length);
      } else {
        const filteredData = this.database.filter(item => item.type.includes(this.type)).filter(item => item.category.includes(this.searchValue));
        this.dataset = filteredData;
        this.length = filteredData.length;
        this.$emit('rowCount', this.length);
      }
    }
  }
};
</script>

<style scoped>
.card {
  margin-right: 15.57vw;
}

@media (max-width: 786px) {
  .card {
    margin-right: 24.8vw;
  }
}

@media (max-width: 425px) {
  .card {
    margin-right: 31vw;
  }
}

@media (max-width: 375px) {
  .card {
    margin-right: 31vw;
  }
}

@media (max-width: 320px) {
  .card {
    margin-right: 31vw;
  }
}

.row {
  display: flex;
}
</style>
