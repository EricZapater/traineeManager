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
  async GetTraineesWithOverdueFee(): Promise<any> {
    const response: AxiosResponse<Array<Trainee>> = await api.get(
      "/api/trainee/overduefee"
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
      return response;
    }
  }
  async GetTrainee(id: string): Promise<any> {
    const response: AxiosResponse<Trainee> = await api.get(
      "/api/trainee/" + id
    );
    return response.data;
  }
  async UpdateTrainee(trainee: Trainee): Promise<any> {
    const response: AxiosResponse<any> = await api.put("/api/trainee", trainee);
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return response;
    }
  }
  async DeleteTrainee(trainee: Trainee): Promise<any> {
    const response: AxiosResponse<any> = await api.delete("/api/trainee", {
      data: trainee,
    });
    return response;
  }
}
