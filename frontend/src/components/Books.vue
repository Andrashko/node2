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
    <div class="wrap">
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
      <p v-if="books.length == 0">Йде завантаження</p>
    </div>

  </div>
</template>

<script>
import BookTemplate from "./BookTemplate.vue";
import networking from "./../networking";
import {mapActions, mapState} from "vuex";

export default {
  name: "App",
  components: {
    BookTemplate,
  },
  data() {
    return {
      searchTitleString: "",
      selected: null,

      books: [],
      newBook: {
        Disount: 0,
        Title: "",
        Author: "",
        Price: 0,
        Cover: "",
      },
      editBook: {},
    };
  },
  async mounted() {  
      this.books = await networking.getBooksList();
      await this.loadBooks();
  },
  methods: {
    ...mapActions(["showMessageForTime", "loadBooks", "deleteBookById"]),
    sortBooksByPrice() {
      this.books.sort((book1, book2) => (book1.Price > book2.Price ? 1 : -1));
    },
    addComment() {
      this.book.Comments.push(this.newComment);
    },
    showHideComments() {
      this.showComments = !this.showComments;
    },
    addNewBook() {
      console.log(this.newBook);
      let newBookCopy = Object.assign({}, this.newBook);
      newBookCopy.Id = parseInt(Date.now());
      this.books.push(newBookCopy);
      this.showNewBookForm = false;
    },
    showForm() {
      this.$refs.newBookForm.show();
    },
    selectBook(id) {
      this.selected = id;
    },
    showEditForm() {
      if (this.selected) {
        let index = this.books.findIndex((book) => book._id == this.selected);
        this.editBook = this.books[index];
        console.log(this.editBook);
        this.$refs.editBookForm.show();
      } else alert("Виберіть книгу");
    },
    async deleteBook() {
      try {
          await this.deleteBookById(this.selected);
          if (this.Book){
            this.showMessageForTime({
              message:{
                title:"Delete",
                text:`Book ${this.Book.Title} was deleted`
              },
              timeout: 5000
            });
          }
      } catch (err) {
        console.log(err);
      }
    },
    closeForm() {
      this.showNewBookForm = false;
    },
  },
  computed: {
    ...mapState(["Books", "Book"]),
    sortedBooks() {
      function CompareBooks(book1, book2) {
        if (book1.Price > book2.Price) return 1;
        if (book1.Price < book2.Price) return -1;
        if (book1.Title > book2.Title) return 1;
        if (book1.Title < book2.Title) return -1;
        return 0;
      }
      console.log(this.Books);
      return [...this.Books].sort(CompareBooks);
    },
    filtredBooks() {
      if (this.searchTitleString == "") return this.sortedBooks;
      return this.sortedBooks.filter((b) =>
        b.Title.includes(this.searchTitleString)
      );
    },
    selectedIndex() {
      if (this.selected)
        return this.books.findIndex((book) => book._id == this.selected);
      return -1;
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