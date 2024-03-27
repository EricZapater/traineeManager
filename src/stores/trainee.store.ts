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
      const result = await traineeService.CreateTrainee(trainee);
      return result;
    },
    setTrainee(trainee: Trainee) {
      this.trainee = trainee;
    },
  },
});
