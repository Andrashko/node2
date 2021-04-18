<template>
  <navbar>
    <span v-if="signIn">
      Ви увійшли як <b>{{ login }}</b>
      <input type="button" value="вийти" @click="signOut" />
    </span>
    <router-link to="/signin" v-else> Увійти </router-link>
  </navbar>
</template>
<script>
import { mapState } from "vuex";
import auth from "@/auth";

export default {
  name: "SignInStatusPanel",
  data() {
    return {};
  },
  computed: {
    ...mapState(["login", "signIn"]),
  },
  methods: {
    signOut() {
      auth.signOut();
    },
  },
};
</script>
<style scoped>
navbar {
  position: absolute;
  right: 10px;
}
</style>
