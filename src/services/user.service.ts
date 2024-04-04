import { Login } from "../types";
import api from "../utils/axios";
import { AxiosResponse } from "axios";

export class AppUserService<AppUser> {
  async CreateAppUser(appUser: AppUser): Promise<any> {
    const response: AxiosResponse<any> = await api.post("/api/user", appUser);
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return response;
    }
  }
  async GetAppUserByLogin(login: Login): Promise<AppUser> {
    const response: AxiosResponse<AppUser> = await api.post(
      "/api/user/ByLogin",
      login
    );
    return response.data;
  }
  async GetAppUserById(id: string): Promise<AppUser> {
    const response: AxiosResponse<AppUser> = await api.get("/api/user/" + id);
    return response.data;
  }
  async UpdateAppUser(appUser: AppUser): Promise<any> {
    const response: AxiosResponse<any> = await api.put("/api/user", appUser);
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return response;
    }
  }
}
