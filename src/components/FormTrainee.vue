<template>
  <TabView>
    <TabPanel header="Trainee Data" v-if="trainee">
      <section class="four-columns">
        <div class="input-container">
          <label for="name">Name:</label>
          <InputText id="name" v-model="trainee.Name"></InputText>
        </div>
        <div class="input-container">
          <label>Surname:</label>
          <InputText id="surname" v-model="trainee.Surname"></InputText>
        </div>
        <div class="input-container">
          <label>VatNumber:</label>
          <InputText id="vatnumber" v-model="trainee.VatNumber"></InputText>
        </div>
        <div class="input-container">
          <label>Birthdate:</label>
          <Calendar id="birthdate" v-model="trainee.Birthdate"></Calendar>
        </div>
      </section>
      <section class="three-columns">
        <div class="input-container">
          <label>Mail:</label>
          <InputText id="name" v-model="trainee.EMail"></InputText>
        </div>
        <div class="input-container">
          <label>Phone Number:</label>
          <InputText id="surname" v-model="trainee.Phone"></InputText>
        </div>
        <div class="input-container">
          <label>Name:</label>
          <InputText id="name" v-model="trainee.Name"></InputText>
        </div>
      </section>
      <section>
        <div class="input-container">
          <label>Address</label>
          <InputText id="address" v-model="trainee.Address" />
        </div>
      </section>
      <section>
        <div class="input-container">
          <label>Address extra</label>
          <Textarea id="addressextra" v-model="trainee.AddressExtra" />
        </div>
      </section>
    </TabPanel>
    <TabPanel header="User Data"> </TabPanel>
  </TabView>
  <div class="flex justify-content-end gap-2">
    <Button
      type="button"
      label="Cancel"
      severity="secondary"
      @click="cancelForm"
    ></Button>
    <Button label="Guardar" class="mr-2" @click="submitForm" />
  </div>
</template>
<script setup lang="ts">
import { Trainee } from "../types";
import { useTraineeStore } from "../stores/trainee.store";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
  (e: "submit", trainee: Trainee): void;
  (e: "cancel"): void;
}>();

const traineeStore = useTraineeStore();

const { trainee } = storeToRefs(traineeStore);

const cancelForm = () => {
  emit("cancel");
};

const submitForm = async () => {
  emit("submit", trainee.value as Trainee);
  /*validate();
  if (validation.value.result) {
    emit("submit", customer.value as Customer);
  } else {
    let errors = "";
    Object.entries(validation.value.errors).forEach((e) => {
      errors += `${e[1].map((e) => e)}.   `;
    });
    toast.add({
      severity: "warn",
      summary: "Formulari inválid",
      detail: errors,
      life: 5000,
    });
  }*/
};
</script>
