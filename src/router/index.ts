import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Trainees from "../views/Trainees.vue";
import { useAppUserStore } from "../stores/user.store";
import Fees from "../views/Fees.vue";
import Payments from "../views/Payments.vue";

const routes = [
  { path: "/home", component: Home },
  { path: "/auth/login", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/trainees", component: Trainees, name: "Trainees" },
  { path: "/fees", component: Fees, name: "Fees" },
  { path: "/payments", component: Payments, name: "Components" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const appUserStore = useAppUserStore();
  console.log(from);
  if (to.path !== "/auth/login" && !appUserStore.loginUser) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
