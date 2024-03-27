<template>
  <section class="table-header">
    <h2>Trainees</h2>
    <div class="table-buttons">
      <Button rounded raised icon="pi pi-plus" @click="createButton" />
    </div>
  </section>
  <section class="table">
    <DataTable
      :value="traineeStore.trainees"
      showGridlines
      :table-style="{ minWidth: '50rem' }"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
    >
      <Column field="ID" header="id"></Column>
      <Column field="Name" header="name"></Column>
      <Column field="Surname" header="surname"></Column>
      <Column>
        <template #body="slotProps">
          <i class="pi pi-pencil" @click="editButton($event, slotProps.data)" />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <i
            class="pi pi-trash"
            @click="deleteButton($event, slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </section>
  <Dialog v-model:visible="visible">
    <FormTrainee @submit="submitForm" @cancel="cancelForm" />
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTraineeStore } from "../stores/trainee.store";
import FormTrainee from "../components/FormTrainee.vue";
import { storeToRefs } from "pinia";
import { Trainee } from "../types";

const traineeStore = useTraineeStore();

const visible = ref(false);
const createMode = ref(true);

const { trainee } = storeToRefs(traineeStore);

onMounted(async () => {
  await traineeStore.fetchTrainees();
  console.log(traineeStore.trainee);
});

const createButton = () => {
  createMode.value = true;
  clearTrainee();
  visible.value = true;
};

const submitForm = async () => {
  visible.value = false;
  if (createMode.value === true) {
    traineeStore.createTrainee(trainee.value);
  }
  console.log(trainee.value);
};

const cancelForm = () => {
  clearTrainee();
  visible.value = false;
};

const editButton = (event: any, trainee: Trainee) => {
  console.log(event);
  createMode.value = false;
  traineeStore.setTrainee(trainee);
  visible.value = true;
};

const deleteButton = (event: any, trainee: Trainee) => {
  console.log(event);
  console.log(trainee);
};

const clearTrainee = () => {
  trainee.value = {
    ID: "sdf",
    CreatedOn: new Date(),
    Name: "",
    Surname: "",
    VatNumber: "",
    Birthdate: new Date(),
    EMail: "",
    Phone: "",
    Address: "",
    AddressExtra: "",
    City: "",
    PostCode: "",
    Country: "",
    PhotoPath: "",
    UserID: "",
    Active: true,
    ActiveSince: new Date(),
  };
};
</script>
<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
