<template>
  <form @submit.prevent="save" v-if="correctId">
    Назва <input v-model="book.Title" /><br />
    Автори <input v-model="book.Author" /> <br />
    Ціна <input type="number" v-model.number="book.Price" step="0.01" />
    <br />
    Знижка <input type="number" v-model.number="book.Disount" /> <br />
    Обгортка <input type="file" v-on:change="selectCover" /> <br />
    <img :src="book.Cover" alt="Cover" width="100" height="200" /><br />

    <button type="submit">Зберегти</button>
  </form>
  <p v-else>Невірний id</p>
</template>
<script>
import { mapActions } from "vuex";
import networking from "@/networking";
import { showMessage } from "@/messaging";

export default {
  props: {
    id: String,
  },
  data() {
    return {
      book: {},
      correctId: false,
    };
  },
  async mounted() {
    this.book = await networking.getBookById(this.id);
    if (this.book) this.correctId = true;
    else this.correctId = false;
  },

  methods: {
    ...mapActions(["updateBook"]),
    async save() {
      this.book._id = this.id;
      if (this.book.file) {
        const file = await networking.uploadImage(this.book.file);
        const baseUrl = "https://localhost:7443";
        this.book.Cover =`${baseUrl}/files/${file.filename}`;
      }
      const updatedbook = await this.updateBook(this.book);
      if (updatedbook) {
        showMessage("Успіх", `Успішно оновлено ${updatedbook.Title}`);
        this.$router.push(`/book/${updatedbook._id}`);
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