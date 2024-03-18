import { defineStore } from "pinia";
import { AppUserService } from "../services/user.service";
import { AppUser, Login } from "../types";

const service = new AppUserService<AppUser>();

export const useAppUserStore = defineStore({
  id: "appusers",
  state: () => ({
    appUsers: undefined as Array<AppUser> | undefined,
    appUser: undefined as AppUser | undefined,
  }),
  getters: {},
  actions: {
    async fetchAppUserByLogin(login: Login) {
      this.appUser = await service.GetAppUserByLogin(login);
    },
  },
});
