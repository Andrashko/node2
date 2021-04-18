import { createStore, createLogger } from 'vuex';
import message from "./message";
import auth from "./auth";
import books from "./books";

const store = createStore({
    plugins: [createLogger()],
    modules: {
        message,
        auth,
        books
    },
});

export default store;