<template>
  <form @submit.prevent="save">
    Назва <input v-model="book.Title" /><br />
    Автори <input v-model="book.Author" /> <br />
    Ціна <input type="number" v-model.number="book.Price" step="0.01" />
    <br />
    Знижка <input type="number" v-model.number="book.Disount" /> <br />
    Обгортка <input type="file" v-on:change="selectCover" /> <br />
    <img :src="book.Cover" alt="Cover" width="100" height="200" /><br />

    <button type="submit">Зберегти</button>
  </form>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      book: {
        Stars: 5,
        Disount: 0,
        Title: "",
        Author: "",
        Price: 0.0,
        Cover: "",
        Comments: [""],
      },
    };
  },
  computed:{
    ...mapState(["Book"])
  },
  methods: {
    ...mapActions(["showMessageForTime", "addBook"]),
    async save() {
      try {
        await this.addBook(this.book);
        console.log(this.Book);
        if (this.Book) {
          const message = {
            text: `Книга ${this.Book.Title} додана`,
            title: "успіх",
          };
          this.showMessageForTime({
            message: message,
            timeout: 3000,
          });

          this.$router.push(`/book/${this.Book._id}`);
        }
      } catch (err) {
        console.error(err);
      }
    },
    selectCover(event) {
      const cover = event.target.files[0];
      this.book.Cover = URL.createObjectURL(cover);
    },
  },
};
</script>