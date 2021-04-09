import axios from "axios";
import store from "./store";

export default {
    async signIn(login, password){
        //перенести в networking
        const token =  (await axios.post("https://localhost:7443/auth/login", {
                    login,
                    password
                })).data.token;
        store.dispatch("logIn", login);
        store.dispatch("setToken", token);
    },
    signOut(){
      store.dispatch("logOut");
      store.dispatch("removeToken");
    }
}