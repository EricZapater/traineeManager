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

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.config.globalProperties.$axios = axios;

app.component("Password", Password);
app.component("InputText", InputText);
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

app.mount("#app");
