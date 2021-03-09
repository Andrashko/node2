<template>
  <div>
    <nav>
      <router-link to="/"> Додому </router-link>
      <router-link to="/about"> Про автора </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>