import networking from "../networking";

export default {
    state: {
        books: [],
    },
    getters: {
        books(state) {
            return state.books;
        }
    },
    mutations: {
        setBooks(state, books) {
            state.books = books;
        },
        addBook(state, book) {
            state.books.push(book);
        },
        updateBook({ books }, book) {
            const index = books.findIndex(b => b._id === book._id);
            if (index >= 0)
                books.splice(index, 1, book);
        },
        removeBook({ books }, book) {
            const index = books.findIndex(b => b._id === book._id);
            if (index >= 0)
                books.splice(index, 1);
        }
    },
    actions: {
        async loadBooks({ commit }) {
            const books = await networking.getBooksList();
            commit("setBooks", books);
        },
        async addBook({ commit }, book) {
            let newBook = await networking.postBook(book);
            if (!newBook)
                return null;
            commit("addBook", newBook);
            return newBook;
        },
        async updateBook({ commit }, book) {
            let updatedBook = await networking.patchBook(book, book._id);
            if (!updatedBook)
                return null;
            commit("updateBook", updatedBook);
            return updatedBook;
        },
        async deleteBookById({ commit }, id) {
            let deletedBook = await networking.deleteBook(id);
            if (!deletedBook)
                return null;
            commit("removeBook", deletedBook);
            return deletedBook;
        },
    }
}