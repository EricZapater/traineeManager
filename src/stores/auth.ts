import { defineStore } from "pinia";
import { Login } from "../types";
import api from "../utils/axios";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loginData: null as Login | null,
  }),
  actions: {
    async login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Promise<void> {
      try {
        const response = await api.post<{ loginData: Login }>("/auth/login", {
          username,
          password,
        });
        if (response.status === 200) {
          console.log(response.data);
          this.loginData = response.data.loginData;
          router.push("/home");
        }
      } catch (error) {
        console.log("Error a l'iniciar sessió: ", error);
      }
    },
  },
});
