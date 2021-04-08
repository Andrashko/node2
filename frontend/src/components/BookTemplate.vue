<template>
  <li>
    <h2 @click="showDetailPage">{{ truncTitle(book.Title, 20) }}</h2>
    <p class="authors">{{ book.Author }}</p>
    <p>{{ fromatMoney(book.Price) }}</p>
    <img alt="Cover" :src="book.Cover" class="cover" />
    <div v-if="book.Disount > 0" class="discount">
      Знижка {{ book.Disount }}%
    </div>
    <br />
    Рейтинг <br />
    <p>{{ stars(book.Stars) }}</p>
  </li>
</template>

<script>
export default {
  name: "BookTempate",
  props: {
    book: Object,
  },
  data() {
    return {};
  },
  methods: {
    truncTitle(title, len) {
      if (!title) return "No title";
      if (title.length > len) return title.substring(0, len) + "...";
      else return title;
    },
    fromatMoney(value) {
      return `${value.toFixed(2)} грн.`;
    },
    stars(count) {
      return "⋆".repeat(count);
    },
    showDetailPage() {
      this.$router.push(`/book/${this.book._id}`);
    },
  },
  computed: {
    shortTitle() {
      const len = 20;
      if (this.book.Title.length > len)
        return this.book.Title.substring(0, len) + "...";
      else return this.book.Title;
    },
  },
};
</script>

<style scoped>
.authors {
  font: 12px grey;
}
.bookvie {
  background: burlywood;
  width: 200px;
  position: relative;
  float: left;
  margin: 10px;
  height: 400px;
}
.discount {
  position: absolute;
  right: 0px;
  top: 30px;
  background: chartreuse;
  transform: rotate(45deg);
}
.star {
  float: left;
}
.cover {
  position: relative;
  width: 100px;
  height: 150px;
}
</style>