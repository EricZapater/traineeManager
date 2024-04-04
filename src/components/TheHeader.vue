<template>
  <header class="app-header">
    <h1 class="app-name">trainee Manager</h1>
    <span class="loginInfo"
      >{{ appUserStore.loginUser ? appUserStore.loginUser.Username : "" }}
      <i
        class="pi pi-power-off"
        v-if="appUserStore.loginUser?.Username"
        @click="logout"
      ></i>
    </span>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "../stores/auth";
import { useAppUserStore } from "../stores/user.store";
import router from "../router";

export default defineComponent({
  name: "TheHeader",
  setup() {
    const authStore = useAuthStore();
    const appUserStore = useAppUserStore();
    const logout = async () => {
      //appUserStore.loginUser = undefined;
      appUserStore.clearLoginState();
      router.push("/login");
    };

    return {
      appUserStore,
      authStore,
      logout,
    };
  },
});
</script>

<style scoped>
.app-header {
  background-color: black;
  padding: 5px 10px; /* Ajusta el padding para dar un poco de espacio en los lados */
  display: flex; /* Activa Flexbox */
  justify-content: space-between; /* Alinea los elementos a los extremos */
  align-items: center; /* Centra los elementos verticalmente */
}

.app-name {
  color: white;
  font-family: "Indie Flower", cursive;
  margin: 0; /* Mantén el margen en 0 para el título */
}

.loginInfo {
  color: white;
  margin: 0;
  padding: 0;
}
.pi-power-off {
  cursor: pointer;
}
</style>
