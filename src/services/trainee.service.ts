import api from "../utils/axios";
import { AxiosResponse } from "axios";

export class TraineeService<Trainee> {
  async GetTrainees(): Promise<any> {
    const response: AxiosResponse<Array<Trainee>> = await api.get(
      "/api/trainee"
    );
    return response.data;
  }
  async GetActiveTrainees(): Promise<any> {
    const response: AxiosResponse<Array<Trainee>> = await api.get(
      "/api/trainee/active"
    );
    return response.data;
  }
  async CreateTrainee(trainee: Trainee): Promise<any> {
    const response: AxiosResponse<any> = await api.post(
      "/api/trainee",
      trainee
    );
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return false;
    }
  }
}
