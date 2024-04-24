import { createApp } from "vue";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import App from "./App.vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import router from "./router";
import axios from "./utils/axios";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import PanelMenu from "primevue/panelmenu";
import Button from "primevue/button";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { useAppUserStore } from "./stores/user.store";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import { createI18n } from "vue-i18n";
import ca from "./locales/ca.json";
import en from "./locales/en.json";

const pinia = createPinia();
const app = createApp(App);

const i18n = createI18n({
  legacy: false,
  locale: "ca",
  fallbackLocale: "en",
  messages: {
    ca,
    en,
  },
});

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(i18n);

app.config.globalProperties.$axios = axios;

app.component("Password", Password);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("PanelMenu", PanelMenu);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Row", Row);
app.component("ColumnGroup", ColumnGroup);
app.component("Dialog", Dialog);
app.component("Calendar", Calendar);
app.component("Textarea", Textarea);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("ConfirmPopup", ConfirmPopup);

const appUserStore = useAppUserStore();
appUserStore.initializeLoginState();

app.mount("#app");
