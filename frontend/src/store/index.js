import { createStore } from 'vuex';
import networking from "../networking";

const store = createStore({
    state:{
        messages: [
        ],

        token:"",

        login:"",
        signIn:false,

        Books:[]
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

        loadTokenFromLocalStorage({commit}){
            const token =  localStorage.getItem("token");
            commit("setToken", token);
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
        }
    }
});

export default store;