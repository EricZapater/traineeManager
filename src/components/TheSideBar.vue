<template>
  <div class="sidebar">
    <PanelMenu :model="currentMenu"></PanelMenu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppUserStore } from "../stores/user.store"; // Asegura la ruta correcta
import { Menus } from "../types";
import { useRouter } from "vue-router";

const router = useRouter();
// Definición de los menús
const menus: Menus = {
  "1b700cc1-9094-4c89-9877-35f3af29097b": [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      to: "/",
      command: () => {
        router.push("/home");
      },
    },
    {
      label: "Trainees",
      icon: "pi pi-fw pi-calendar",
      to: "/",
      command: () => {
        router.push("/trainees");
      },
    },
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      to: "/dashboard",
      command: () => {
        router.push("/dashboard");
      },
    },
    { label: "Settings", icon: "pi pi-fw pi-cog", to: "/settings" },
  ],
  "1b700cc1-9094-4c89-9877-35f3af29097c": [
    { label: "Projects", icon: "pi pi-fw pi-list", to: "/projects" },
    { label: "Team", icon: "pi pi-fw pi-users", to: "/team" },
  ],
  "1b700cc1-9094-4c89-9877-35f3af29097d": [
    { label: "Profile", icon: "pi pi-fw pi-user", to: "/profile" },
    { label: "Messages", icon: "pi pi-fw pi-envelope", to: "/messages" },
  ],
};
const appUserStore = useAppUserStore();

// Menú actual basado en el profileId del appUser
const currentMenu = computed(() => {
  const profileId = appUserStore.loginUser?.ProfileID;
  return profileId ? menus[profileId] || [] : [];
});
</script>
<style scoped>
.sidebar {
  width: 250px; /* Ajusta este valor según necesites */
  max-width: 100%;
  height: 100vh; /* Ocupa la altura completa de la ventana */
  overflow-y: auto; /* Permite desplazamiento vertical si el contenido es muy largo */
  /* Alineación y otros estilos según sea necesario */
  position: flex;

  background-color: #f4f4f4; /* Color de fondo ejemplo */
}
</style>
