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
      :rowClass="rowClass"
      showGridlines
      :table-style="{ minWidth: '50rem' }"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
    >
      <Column field="Name" header="name"></Column>
      <Column field="Surname" header="surname"></Column>
      <Column field="Country" header="country"></Column>
      <Column field="Phone Number" header="phone"></Column>
      <Column field="EMail" header="mail"></Column>
      <Column field="Active" header="active"></Column>
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
          <ConfirmPopup></ConfirmPopup>
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
import { getNewUuid } from "../utils/common";
import { useAppUserStore } from "../stores/user.store";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const traineeStore = useTraineeStore();
const appUserStore = useAppUserStore();
const toast = useToast();
const confirm = useConfirm();

const visible = ref(false);
const createMode = ref(true);

const { trainee } = storeToRefs(traineeStore);
const { appUser } = storeToRefs(appUserStore);

onMounted(async () => {
  await traineeStore.fetchTrainees();
});

const createButton = () => {
  createMode.value = true;
  clearTrainee();
  clearAppUser();
  appUser.value = {
    ID: "",
    CreatedOn: new Date(),
    Username: "",
    Password: "",
    ProfileID: "c027666e-1c40-4a5f-9ed4-13a9bff0c826",
    Active: true,
  };
  visible.value = true;
};

const rowClass = (data: Trainee) => {
  return [{ "inactive-row": data.Active === false }];
};

const submitForm = async () => {
  visible.value = false;
  if (createMode.value === true) {
    appUser.value!.ID = getNewUuid();
    trainee.value.ID = getNewUuid();
    trainee.value.UserID = appUser.value!.ID;
    var res = await appUserStore.createAppUser(appUser.value!);
    if (!res) {
      toast.add({
        severity: "error",
        summary: "Ha ocorregut un error al registrar l'usuari " + res,
        life: 3000,
      });
      return;
    }
    res = await traineeStore.createTrainee(trainee.value);
    await traineeStore.fetchTrainees();
    if (res === true) {
      toast.add({
        severity: "success",
        summary: "Trainee registrat correctament",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Ha ocorregut un error al registrar el trainee " + res,
        life: 3000,
      });
    }
  } else {
    //let resUser: any = Boolean(true);
    let res = await traineeStore.updateTrainee(trainee.value);
    if (appUser.value) {
      if (appUser.value.Password != "") {
        res = await appUserStore.updateAppUser(appUser.value);
      }
    }
    await traineeStore.fetchTrainees();
    if (res === true) {
      toast.add({
        severity: "success",
        summary: "Trainee actualitzat correctament",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Error a l'actualitzar el trainee",
        life: 3000,
      });
    }
  }
};

const cancelForm = () => {
  clearTrainee();
  visible.value = false;
};

const editButton = async (event: any, trainee: Trainee) => {
  console.log(event);
  createMode.value = false;
  traineeStore.setTrainee(trainee);
  await appUserStore.fetchAppUserById(trainee.UserID);
  console.log(appUser.value);
  if (appUser.value) {
    appUser.value = { ...appUser.value, Password: "" };
  }
  visible.value = true;
};

const deleteButton = async (event: any, trainee: Trainee) => {
  confirm.require({
    target: event.currentTarget,
    message:
      "Estas segur que vols eliminar al trainee: " +
      trainee.Name +
      ", " +
      trainee.Surname,
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined p-button-sm",
    acceptClass: "p-button-sm",
    rejectLabel: "Cancel",
    acceptLabel: "Save",
    accept: async () => {
      var response = await traineeStore.deleteTrainee(trainee);
      if (response.status === 200 || response.status === 201) {
        toast.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Registre esborrat correectament",
          life: 3000,
        });
      }
      await traineeStore.fetchTrainees();
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};

const clearTrainee = () => {
  trainee.value = {
    ID: "",
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

const clearAppUser = () => {
  appUser.value = {
    ID: "",
    CreatedOn: new Date(),
    Username: "",
    Password: "",
    ProfileID: "",
    Active: true,
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
