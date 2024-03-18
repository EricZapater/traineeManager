<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <label>
        Username:
        <input v-model="username" type="text" />
      </label>
      <br />
      <label> Password: </label>
      <Password v-model="password" :feedback="false" toggleMask> </Password>
      <br />
      <button type="submit">Log In</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const username = ref("");
const password = ref("");
const authStore = useAuthStore();

const handleSubmit = async () => {
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    });
  } catch (error) {
    console.log("Error en el login");
  }
};
</script>
