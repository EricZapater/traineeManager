import { defineStore } from "pinia";
import { useAppUserStore } from "./user.store";
import { Login } from "../types";
import api from "../utils/axios";

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
    }): Promise<any> {
      try {
        const response = await api.post("/auth/login", {
          username,
          password,
        });
        const appUserStore = useAppUserStore();
        appUserStore.setAppUser(response.data.data);
        return response;
      } catch (error) {
        console.log("Error a l'iniciar sessió: ", error);
        throw new Error("Wrong login: " + error);
      }
    },
  },
});
