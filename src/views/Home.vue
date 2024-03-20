<template>
  <div>
    <h2>Logged in</h2>
    <p></p>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useAppUserStore } from "../stores/user.store";
import { useAuthStore } from "../stores/auth";

const appUserStore = useAppUserStore();
const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.loginData && !appUserStore.appUser) {
    await appUserStore.fetchAppUserByLogin(authStore.loginData);
  }
});
</script>
