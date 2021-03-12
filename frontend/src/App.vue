<template>
  <div>
    <nav>
      <router-link to="/"> Додому </router-link>
      <router-link to="/about"> Про автора </router-link>
      <h3 v-if="storage.login"> {{storage.login}} </h3>
      <router-link to="/signin" v-else> Увійти </router-link>

    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import storage from "./storage";

export default {
  name: "App",
  data() {
    return {
      storage: storage
    };
  }
};
</script>