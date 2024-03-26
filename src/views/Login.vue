<template>
  <div class="login-container">
    <h1>Login</h1>
    <form class="login-form">
      <div class="form-control">
        <label for="username">Username:</label>
        <InputText id="username" v-model="username" placeholder="Usuari" />
      </div>
      <div class="form-control">
        <label for="password">Password:</label>
        <Password v-model="password" :feedback="false" toggleMask></Password>
        <!--<InputText id="password" v-model="password" placeholder="Enter your password" :type="showPassword ? 'text' : 'password'" />
        <i class="pi" :class="showPassword ? 'pi-eye-slash' : 'pi-eye'" @click="toggleShowPassword"></i>-->
      </div>
      <Button label="Log In" @click.prevent="login">Log In</Button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import router from "../router";
import { useToast } from "primevue/usetoast";

const username = ref("");
const password = ref("");
const authStore = useAuthStore();
const toast = useToast();

const login = async () => {
  try {
    var response = await authStore.login({
      username: username.value,
      password: password.value,
    });
    if (response.status === 200) {
      console.log("si");
      router.push("/home");
    } else {
      console.log("no");
      toast.add({
        severity: "error",
        summary: "Usuari o password incorrecte",
        life: 5000,
      });
    }
    console.log(response);
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Login error",
      detail: "wrong username or password",
      life: 3000,
    });
  }
};
</script>
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-form {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-control {
  margin-bottom: 15px;
}

.form-control label {
  display: block;
  margin-bottom: 5px;
}

.form-control input,
.form-control Password {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  /*background-color: #007bff;
  color: white;*/
  cursor: pointer;
}

button:hover {
  /*background-color: #0056b3;*/
}
</style>
