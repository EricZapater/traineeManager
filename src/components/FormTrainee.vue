<template>
  <TabView class="v-scrollable-tabview">
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
      <section class="two-columns">
        <div class="input-container">
          <label>Mail:</label>
          <InputText id="name" v-model="trainee.EMail"></InputText>
        </div>
        <div class="input-container">
          <label>Phone Number:</label>
          <InputText id="surname" v-model="trainee.Phone"></InputText>
        </div>
      </section>
      <section>
        <div class="input-container">
          <label>Address</label>
          <InputText id="address" v-model="trainee.Address" />
        </div>
      </section>
      <section class="three-columns">
        <div class="input-container">
          <label for="city">City</label>
          <InputText id="city" v-model="trainee.City" />
        </div>
        <div class="input-container">
          <label for="postcode">PostCode</label>
          <InputText id="postcode" v-model="trainee.PostCode" />
        </div>
        <div class="input-container">
          <label for="country">Country</label>
          <InputText id="country" v-model="trainee.Country" />
        </div>
      </section>
      <section>
        <div class="input-container">
          <label>Address extra</label>
          <Textarea id="addressextra" v-model="trainee.AddressExtra" />
        </div>
      </section>
    </TabPanel>
    <TabPanel header="User Data" v-if="appUser">
      <section class="three-columns">
        <div class="input-container">
          <label>User Name</label>
          <InputText id="username" v-model="appUser.Username" />
        </div>
        <div class="input-container">
          <label> New Password</label>
          <InputText id="password" v-model="appUser.Password" />
        </div>
      </section>
    </TabPanel>
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
import { useAppUserStore } from "../stores/user.store";

const emit = defineEmits<{
  (e: "submit", trainee: Trainee): void;
  (e: "cancel"): void;
}>();

const traineeStore = useTraineeStore();
const appUserStore = useAppUserStore();

const { trainee } = storeToRefs(traineeStore);
const { appUser } = storeToRefs(appUserStore);

const cancelForm = () => {
  emit("cancel");
};

const submitForm = async () => {
  emit("submit", trainee.value as Trainee);
};
</script>
