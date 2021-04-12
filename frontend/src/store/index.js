import { createStore } from 'vuex';
import networking from "../networking";

const store = createStore({
    state:{
        messages: [
        ],

        token:"",

        login:"",
        signIn:false,

        Books:[],
        Book: null
    },
    getters:{
        messageCount({messages}){
            return messages.length;
        },
    },
    mutations:{
        addMessage({messages}, message){
            messages.push(message);
        },
        removeMessage({messages}, message){
            const indexOfMessage = messages.findIndex(
                m => message.text === m.text 
            );
            if (indexOfMessage>-1)
                messages.splice(indexOfMessage, 1);
        },
        setToken (state, token){
            state.token = token;
        },
        setLogin (state, login){
            state.login = login;
        },
        setSignIn(state, signIn){
            state.signIn = signIn;
        },
        setBooks(state, books){
            state.Books = books;
        },
        addBook(state, book){
            state.Books.push(book);
        },
        setBook(state, book){
            state.Book = book;
        },
        removeBook({Books}, book){
            const index = Books.findIndex(b=>b._id == book._id);
            if (index>=0)
                Books.splice(index, 1);
        }
    },
    actions:{
        showMessageForTime({commit}, {message, timeout}){
            commit("addMessage", message);
            setTimeout(()=>{
                commit("removeMessage", message);
            }, timeout);
        },

        setToken({commit}, token){
            commit("setToken", token);
            localStorage.setItem("token", token);
        },

        async loadTokenFromLocalStorage({commit, dispatch}){
            const token =  localStorage.getItem("token");
            const login = await networking.getLoginByToken(token);
            if (login){
                commit("setToken", token);
                dispatch("logIn", login);
                dispatch("showMessageForTime", {
                    message:{
                        tittle:"Login",
                        text:`Welcome ${login}`
                    },
                    timeout: 3000
                });
            }
            else 
                dispatch("showMessageForTime", {
                    message:{
                        tittle:"Error",
                        text:"Wrong token"
                    },
                    timeout: 1000
                });
        },
        removeToken({commit}){
            commit("setToken", "");
            localStorage.removeItem("token");
        },
        logIn({commit}, login){
            commit("setLogin", login);
            commit("setSignIn", true);
        },
        logOut({commit}){
            commit("setLogin", "");
            commit("setSignIn", false);
        },

        async loadBooks({commit}){
            const books = await networking.getBooksList();
            commit ("setBooks", books);
        }, 

        async addBook({commit}, book){
            let newBook = await networking.postBook(book);
            if (newBook){
                commit("addBook", newBook);
                commit("setBook", newBook);
            } 
            else
                commit("setBook", null);
        }, 
        async deleteBookById({commit}, id){
            let deletedBook = await networking.deleteBook(id);
            if (deletedBook){
                commit("setBook", deletedBook);
                commit("removeBook", deletedBook);
            }
            else
                commit("setBook", null);
        }
    }
});

export default store;