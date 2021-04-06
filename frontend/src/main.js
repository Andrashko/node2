import { createApp } from 'vue';
import App from './App.vue';
import Router from "./Router";
import Store from "./store";

createApp(App)
    .use(Router)
    .use(Store)
    .mount('#app');
