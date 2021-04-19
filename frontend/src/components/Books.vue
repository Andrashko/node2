<template>
  <div>
    <section class="control">
      <router-link to="/book/new"> Додати книгу </router-link>
      <input type="button" value="Вилучити" v-on:click="deleteBook" />
      <input type="button" value="Сортувати" @click="sortBooksByPrice" />
      <input
        type="text"
        placeholder="Шукати по назві"
        v-model="searchTitleString"
      />
    </section>
    <div class="wrap" data-test="booklist">
      <ul v-if="filtredBooks.length > 0">
        <book-template
          v-for="b in filtredBooks"
          :key="b.Id"
          class="bookvie"
          v-on:click="selectBook(b._id)"
          v-bind:book="b"
        >
        </book-template>
      </ul>
      <p v-if="filtredBooks.length == 0">Нема книг для показу</p>
    </div>
  </div>
</template>

<script>
import BookTemplate from "./BookTemplate.vue";
import { mapActions, mapGetters } from "vuex";
import { showMessage } from "@/messaging";

export default {
  name: "App",
  components: {
    BookTemplate,
  },
  data() {
    return {
      searchTitleString: "",
      selected: null,
    };
  },
  async mounted() {
    await this.loadBooks();
  },
  methods: {
    ...mapActions(["loadBooks", "deleteBookById"]),

    selectBook(id) {
      this.selected = id;
    },

    async deleteBook() {
      const deletedBook = await this.deleteBookById(this.selected);
      if (deletedBook)
        showMessage("Успішне вилученн", `Книга ${deletedBook.Title} вилучена`);
    },
  },
  computed: {
    ...mapGetters(["books"]),
    areSomeBooks() {
      return this.books.length > 0;
    },
    sortedBooks() {
      function CompareBooks(book1, book2) {
        if (book1.Price > book2.Price) return 1;
        if (book1.Price < book2.Price) return -1;
        if (book1.Title > book2.Title) return 1;
        if (book1.Title < book2.Title) return -1;
        return 0;
      }
      return [...this.books].sort(CompareBooks);
    },
    filtredBooks() {
      if (this.searchTitleString == "") return this.sortedBooks;
      return this.sortedBooks.filter((b) =>
        b.Title.includes(this.searchTitleString)
      );
    },
    selectedEditURL() {
      return `/book/${this.selected}/edit`;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  position: relative;
}

.wrap {
  position: relative;
}
</style>