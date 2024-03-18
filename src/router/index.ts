import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

const routes = [
  { path: "/home", component: Home },
  { path: "/auth/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  console.log(authStore);
  if (to.path !== "/auth/login" && !authStore.loginData) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
