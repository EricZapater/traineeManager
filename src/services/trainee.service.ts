import { Trainee } from "../types";
import api from "../utils/axios";
import { AxiosResponse } from "axios";

export class TraineeService<Trainee> {
  async GetTrainees(): Promise<Array<Trainee>> {
    const response: AxiosResponse<Array<Trainee>> = await api.get(
      "/api/trainee"
    );
    return response.data;
  }
  async GetActiveTrainees(): Promise<Array<Trainee>> {
    const response: AxiosResponse<Array<Trainee>> = await api.get(
      "/api/trainee/active"
    );
    return response.data;
  }
}
