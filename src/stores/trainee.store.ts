// stores/trainee.ts
import { defineStore } from "pinia";
import { Trainee } from "../types";
import { TraineeService } from "../services/trainee.service";

export const useTraineeStore = defineStore("trainee", {
  state: () => ({
    trainees: [] as Trainee[],
    activeTrainees: [] as Trainee[],
  }),
  actions: {
    async fetchTrainees() {
      const traineeService = new TraineeService<Trainee>();
      this.trainees = await traineeService.GetTrainees();
    },
    async fetchActiveTrainees() {
      const traineeService = new TraineeService<Trainee>();
      this.activeTrainees = await traineeService.GetActiveTrainees();
    },
  },
});
