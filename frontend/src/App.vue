<template>
  <div>
    <nav>
      <router-link to="/"> Додому </router-link>
      <router-link to="/about"> Про автора </router-link>
      <sign-in-status-panel></sign-in-status-panel>
    </nav>
    <message> </message>
    <router-view></router-view>
  </div>
</template>

<script>
import auth from "@/auth";
import Message from "@/components/Message";
import SignInStatusPanel from "@/components/SignInStatusPanel";

export default {
  name: "App",
  data() {
    return {};
  }, 
  components: {
    Message,
    SignInStatusPanel
  },
  mounted() {
    auth.restoreSignInStatus();
  },
};
</script>