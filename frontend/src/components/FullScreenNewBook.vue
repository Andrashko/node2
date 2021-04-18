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
import { mapActions } from "vuex";
import { showMessage, showErrorMessage } from "@/messaging";
import networking from "@/networking";

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
  methods: {
    ...mapActions(["addBook"]),
    async save() {
      try {
        if (this.book.file) {
          const file = await networking.uploadImage(this.book.file);
          const baseUrl = "https://localhost:7443";
          this.book.Cover = `${baseUrl}/files/${file.filename}`;
        }
        const newBook = await this.addBook(this.book);
        if (newBook) {
          showMessage("успіх", `Книга ${newBook.Title} додана`);
          this.$router.push(`/book/${newBook._id}`);
        }
      } catch (err) {
        showErrorMessage(err);
      }
    },
    selectCover(event) {
      const cover = event.target.files[0];
      this.book.file = cover;
      this.book.Cover = URL.createObjectURL(cover);
    },
  },
};
</script>