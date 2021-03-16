import axios from "axios";
import storage from "./storage";

export default {
    async signIn(login, password){
        const token =  (await axios.post("https://localhost:7443/auth/login", {
                    login,
                    password
                })).data.token;
        storage.token = token;
        storage.signIn = true;
        storage.login = login;
        localStorage.setItem("token", token);
    },
    signOut(){
      storage.login = "";
      storage.token = "";
      localStorage.removeItem("token");
    }
}