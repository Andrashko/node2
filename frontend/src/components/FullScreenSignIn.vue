<template>
    <form @submit.prevent>
        <input placeholder="логін" v-model="login">
        <input placeholder="пароль" v-model="password">
        <button @click="signIn"> Увійти </button>
    </form>
</template>

<script>
import axios from "axios";
import storage from "../storage";

export default {
    name:"FullScreenSignIn",
    data(){
        return {
            login:"",
            password:""
        }
    }, 
    methods:{
        async signIn(){
            try{
                const token =  (await axios.post("https://localhost:7443/auth/login", {
                    login:  this.login,
                    password: this.password
                })).data.token;
                storage.token = token;
                storage.signIn = true;
                storage.login = this.login;
                localStorage.setItem("token", token);
                this.$router.push("/");
            } catch (error){
                if (error.response.status == 404){
                    alert ("Невірний логін або пароль!")
                }
                console.log(error.response);
            }
        }
    }
}
</script>
