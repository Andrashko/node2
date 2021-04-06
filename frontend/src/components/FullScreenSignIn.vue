<template>
  <form @submit.prevent>
    <input placeholder="логін" v-model="login" />
    <input placeholder="пароль" v-model="password" />
    <button @click="signIn">Увійти</button>
  </form>
</template>

<script>
import auth from "./../auth";
import {mapMutations} from "vuex";

export default {
  name: "FullScreenSignIn",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["addMessage"]),
    async signIn() {
      try {
        await auth.signIn(this.login, this.password);
        this.$router.push("/");
      } catch (error) {
        if (error.response.status == 404) {
        this.addMessage( {
            title: "Помилка входу",
            text: "Невірний логін або пароль",
          });
        }
        console.log(error.response);
      }
    },
  },
};
</script>
