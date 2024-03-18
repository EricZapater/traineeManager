import { createApp } from "vue";
import "primevue/resources/themes/aura-light-green/theme.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import router from "./router";
import axios from "./utils/axios";
import Password from "primevue/password";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue);

app.config.globalProperties.$axios = axios;

app.component("Password", Password);

app.mount("#app");
