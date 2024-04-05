import { defineStore } from "pinia";
import { AppUserService } from "../services/user.service";
import { AppUser, Login } from "../types";

const service = new AppUserService<AppUser>();

export const useAppUserStore = defineStore({
  id: "appusers",
  state: () => ({
    appUsers: undefined as Array<AppUser> | undefined,
    appUser: undefined as AppUser | undefined,
    loginUser: undefined as AppUser | undefined,
  }),
  getters: {},
  actions: {
    initializeLoginState() {
      const storedUser = localStorage.getItem("loginUser");
      if (!storedUser) {
        this.loginUser = undefined;
        return null;
      }
      const user = JSON.parse(storedUser);
      const now = new Date();
      if (now.getTime() > user.expiry) {
        localStorage.removeItem("loginUser");
        this.loginUser = undefined;
        return null;
      }
      this.loginUser = user.value;
    },
    saveLoginState(user: AppUser) {
      const now = new Date();
      const item = {
        value: user,
        expiry: now.getTime() + 1 * 60 * 60 * 1000,
      };
      this.loginUser = user;
      localStorage.setItem("loginUser", JSON.stringify(item));
    },
    clearLoginState() {
      this.loginUser = undefined;
      localStorage.removeItem("loginUser");
    },
    setAppUser(appUser: AppUser) {
      this.appUser = appUser;
    },
    setLoginUser(loginUser: AppUser) {
      this.loginUser = loginUser;
    },
    async fetchAppUserByLogin(login: Login) {
      this.appUser = await service.GetAppUserByLogin(login);
    },
    async fetchAppUserById(id: string) {
      let response = await service.GetAppUserById(id);
      this.appUser = response.data;
    },
    async createAppUser(appUser: AppUser) {
      let result = await service.CreateAppUser(appUser);
      return result;
    },
    async updateAppUser(appUser: AppUser) {
      var result = await service.UpdateAppUser(appUser);
      return result;
    },
  },
});
