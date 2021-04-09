<template>
  <div>
    <nav>
      <router-link to="/"> Додому </router-link>
      <router-link to="/about"> Про автора </router-link>
      <p3 v-if="signIn">
        Ви увійшли як <b>{{ login }}</b>
        <input type="button" value="вийти" @click="sign_out"/>
      </p3>
      <router-link to="/signin" v-else> Увійти </router-link>
    </nav>
    <message> </message>
    <router-view></router-view>
  </div>
</template>

<script>
import auth from "./auth";
import Message from "./components/Message";
import {mapState, mapActions} from "vuex";

export default {
  name: "App",
  data() {
    return {
    };
  },
  methods:{
    ...mapActions(["loadTokenFromLocalStorage"]),
    sign_out(){
      auth.signOut();
    }
  },
  components:{
    Message
  },
  computed:{
    ...mapState(["login", "signIn"])
  },
  mounted(){
    this.loadTokenFromLocalStorage();
  }
};
</script>