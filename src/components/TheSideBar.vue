<template>
  <div class="sidebar">
    <PanelMenu :model="currentMenu"></PanelMenu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppUserStore } from "../stores/user.store"; // Asegura la ruta correcta
import { Menus } from "../types";

// Definición de los menús
const menus: Menus = {
  "1b700cc1-9094-4c89-9877-35f3af29097b": [
    { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/dashboard" },
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
  const profileId = appUserStore.appUser?.ProfileID;
  return profileId ? menus[profileId] || [] : [];
});
</script>
