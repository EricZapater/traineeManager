// stores/trainee.ts
import { defineStore } from "pinia";
import { Trainee } from "../types";
import { TraineeService } from "../services/trainee.service";

const traineeService = new TraineeService<Trainee>();

export const useTraineeStore = defineStore("trainee", {
  state: () => ({
    trainee: {} as Trainee,
    trainees: [] as Trainee[],
    activeTrainees: [] as Trainee[],
  }),
  actions: {
    async fetchTrainees() {
      var response = await traineeService.GetTrainees();
      this.trainees = response.data;
    },
    async fetchActiveTrainees() {
      var response = await traineeService.GetActiveTrainees();
      this.activeTrainees = response.data;
    },
    async createTrainee(trainee: Trainee) {
      var result = await traineeService.CreateTrainee(trainee);
      return result;
    },
    async getTrainee(id: string) {
      var response = await traineeService.GetTrainee(id);
      this.trainee = response.data;
    },
    async updateTrainee(trainee: Trainee) {
      var response = await traineeService.UpdateTrainee(trainee);
      return response;
    },
    async deleteTrainee(trainee: Trainee) {
      var response = await traineeService.DeleteTrainee(trainee);
      return response;
    },
    setTrainee(trainee: Trainee) {
      this.trainee = trainee;
    },
  },
});
