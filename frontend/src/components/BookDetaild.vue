<template>
  <div v-if="correctId">
    <button type="button" @click="edit">Редагувати</button>
    <h2>{{ book.Title }}</h2>
    <p>{{ book.Author }}</p>
    <img :src="book.Cover" />
  </div>
  <p v-else>Невірний id</p>
</template>

<script>
import networking from "@/networking";
import { showErrorMessage } from "@/messaging";

export default {
  props: {
    id: String,
  },
  data() {
    return {
      book: {
        Title: "Test",
        Author: "",
        Cover: "",
      },
      correctId: false,
    };
  },
  async mounted() {
    try {
      this.book = await networking.getBookById(this.id);
      console.log(this.book);
      if (this.book) this.correctId = true;
      else this.correctId = false;
    } catch (err) {
      showErrorMessage(err);
    }
  },
  methods: {
    async edit() {
      this.$router.push(`/book/${this.id}/edit`);
    },
  },
};
</script>