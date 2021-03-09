<template>
  <div>
    <nav>
      <router-link to="/"> Додому </router-link>
      <router-link to="/about"> про автора </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {};
  },
  async mounted() {
    //Надіслати запит на сервер
    //httprequest
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cat-fact.herokuapp.com/facts");
    xhr.send();
    xhr.onloadend = () => {
      console.log(xhr);
      if (xhr.status == 200) {
        console.log(xhr.response);
      } else {
        console.log(xhr.statusText);
      }
    };

    //fetch
    try {
      let res = await fetch("https://cat-fact.herokuapp.com/facts");
      if (res.ok) {
        let facts = await res.json();
        console.log(facts);
      }
    } catch (err) {
      console.log(err);
    }

    //сторонні бібліотеки axios
    try {
      let facts2 = (await axios.get("https://cat-fact.herokuapp.com/facts"))
        .data;
      console.log(facts2);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>