import store from "@/store";
import networking from "@/networking";
import { showMessage, showErrorMessage } from "@/messaging";

export default {
    async signIn(login, password) {
        const token = await networking.getToken(login, password);
        if (token) {
            store.dispatch("logIn", login);
            store.dispatch("setToken", token);
        }
    },
    signOut() {
        store.dispatch("logOut");
        store.dispatch("removeToken");
    },
    async ckeckSignInStatus() {
        const login = await networking.getLoginByToken(store.getters.token);    
        if (!login || login != store.getters.login) {
            showMessage("Error", "Wrong token");
            store.dispatch("logOut");
            return false;
        }
        return true;
    },
    async restoreSignInStatus() {
        try {
            store.dispatch("loadToken");
            const login = await networking.getLoginByToken(store.getters.token);
            if (login){
                store.dispatch("logIn", login);
                showMessage("Login", `Welcome ${login}`);
            } else
                showMessage("Error","Wrong token");
        } catch(err){
            showErrorMessage(err);
        }        
    }
}