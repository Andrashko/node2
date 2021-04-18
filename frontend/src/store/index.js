import { createStore, createLogger } from 'vuex';
import networking from "../networking";
const store = createStore({
    plugins: [createLogger()],

    state: () => ({
        messages: [
        ],
        token: "",
        login: "",
        signIn: false,
        books: [],
    }),
    getters: {
        messageCount({ messages }) {
            return messages.length;
        },
        messages(state){
            return state.messages;
        },
        token(state){
            return state.token;
        },
        login(state){
            return state.login;
        },
        signIn(state){
            return state.signIn;
        },
        books(state){
            return state.books;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLogin(state, login) {
            state.login = login;
        },
        setSignIn(state, signIn) {
            state.signIn = signIn;
        },

        addMessage({ messages }, message) {
            messages.push(message);
        },
        removeMessage({ messages }, message) {
            const indexOfMessage = messages.findIndex(
                m => message.text === m.text
            );
            if (indexOfMessage > -1)
                messages.splice(indexOfMessage, 1);
        },

        setBooks(state, books) {
            state.books = books;
        },
        addBook(state, book) {
            state.books.push(book);
        },
        setBook(state, book) {
            state.Book = book;
        },
        updateBook({ books: Books }, book) {
            const index = Books.findIndex(b => b._id === book._id);
            if (index >= 0)
                Books.splice(index, 1, book);
        },
        removeBook({ books: Books }, book) {
            const index = Books.findIndex(b => b._id === book._id);
            if (index >= 0)
                Books.splice(index, 1);
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit("setToken", token);
            localStorage.setItem("token", token);
        },
        loadToken({ dispatch }) {
            const token = localStorage.getItem("token");
            dispatch("setToken", token);
        },
        removeToken({ commit }) {
            commit("setToken", "");
            localStorage.removeItem("token");
        },
        logIn({ commit }, login) {
            commit("setLogin", login);
            commit("setSignIn", true);
        },
        logOut({ commit }) {
            commit("setLogin", "");
            commit("setSignIn", false);
        },

        showMessageForTime({ commit }, { message, timeout }) {
            commit("addMessage", message);
            setTimeout(() => {
                commit("removeMessage", message);
            }, timeout);
        },


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
});

export default store;