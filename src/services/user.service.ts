import { Login } from "../types";
import api from "../utils/axios";
import { AxiosResponse } from "axios";

export class AppUserService<AppUser> {
  async GetAppUserByLogin(login: Login): Promise<AppUser> {
    const response: AxiosResponse<AppUser> = await api.post(
      "/api/user/ByLogin",
      login
    );
    return response.data;
  }
}
