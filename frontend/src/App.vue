<template>
  <div>
    <nav>
      <router-link to="/"> Додому </router-link>
      <router-link to="/about"> Про автора </router-link>
      <p3 v-if="storage2.login">
        Ви увійшли як <b>{{ storage2.login }}</b>
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
import storage2 from "./storage";

export default {
  name: "App",
  data() {
    return {
      storage2
    };
  },
  methods:{
    sign_out(){
      auth.signOut();
    }
  },
  components:{
    Message
  }
};
</script>