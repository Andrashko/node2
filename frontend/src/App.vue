<template>
  <div>
    <nav>
      <router-link to="/"> Додому </router-link>
      <router-link to="/about"> Про автора </router-link>
      <p3 v-if="storage.login">
        Ви увійшли як <b>{{ storage.login }}</b>
        <input type="button" value="вийти" @click="sign_out"/>
      </p3>
      <router-link to="/signin" v-else> Увійти </router-link>
    </nav>
    <message> </message>
    <router-view></router-view>
  </div>
</template>

<script>
import storage from "./storage";

import auth from "./auth";
import Message from "./components/Message";

export default {
  name: "App",
  data() {
    const _storage = reactive(storage);
    return {
      storage: storage,
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