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
//import Storage from "../storage";
import axios from "axios";
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
    async save() {
      // let newBook = Object.assign({}, this.book);
      // newBook.Id = Date.now();
      // Storage.books.push(newBook);
      try{
        let newBook = (await axios.post("https://localhost:7443/api/book", this.book)).data ;
        this.$router.push(`/book/${newBook._id}`);
      }
      catch (err){
        console.log(err);
      }
      
    },
    selectCover(event) {
      const cover = event.target.files[0];
      this.newBook.Cover = URL.createObjectURL(cover);
    },
  },
};
</script>