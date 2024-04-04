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
      if (storedUser) {
        this.loginUser = JSON.parse(storedUser);
      }
    },
    saveLoginState(user: AppUser) {
      this.loginUser = user;
      localStorage.setItem("loginUser", JSON.stringify(user));
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
      this.appUser = await service.GetAppUserById(id);
    },
    async createAppUser(appUser: AppUser) {
      var result = await service.CreateAppUser(appUser);
      return result;
    },
    async updateAppUser(appUser: AppUser) {
      var result = await service.UpdateAppUser(appUser);
      return result;
    },
  },
});
