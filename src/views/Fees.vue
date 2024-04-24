<template>
  <section class="table-header">
    <h2>Fees</h2>
    <div class="table-buttons">
      <Button rounded raised icon="pi pi-plus" @click="createButton" />
    </div>
  </section>
  <section class="table">
    <DataTable
      :value="feeStore.fees"
      showGridlines
      :table-style="{ minWidth: '50rem' }"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
    >
      <Column field="Name" header="name"></Column>
      <Column
        field="PaymentIntervalMonths"
        header="Payment Interval (in Months)"
      ></Column>
      <Column field="Active" header="active"></Column>
    </DataTable>
    <Dialog v-model:visible="visible">
      <FormFee @submit="submitForm" @cancel="cancelForm" />
    </Dialog>
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFeeStore } from "../stores/income.store";
import { onMounted, ref } from "vue";
import FormFee from "../components/FormFee.vue";
import { getNewUuid } from "../utils/common";
import { useToast } from "primevue/usetoast";

const visible = ref(false);
const feeStore = useFeeStore();
const { fee } = storeToRefs(feeStore);
const toast = useToast();

onMounted(async () => {
  await feeStore.fetchFees();
});

const createButton = () => {
  clearFee();
  visible.value = true;
  console.log("create");
};

const submitForm = async () => {
  visible.value = false;
  fee.value.ID = getNewUuid();
  let response = feeStore.createFee(fee.value);
  await feeStore.fetchFees();
  if (!response) {
    toast.add({
      severity: "error",
      summary: "Ha ocorregut un error al registrar la quota " + response,
      life: 3000,
    });
    return;
  } else {
    toast.add({
      severity: "success",
      summary: "Quota registrada correctament",
      life: 3000,
    });

    return;
  }
};

const cancelForm = () => {
  visible.value = false;
  clearFee();
  console.log("submit");
};

const clearFee = () => {
  fee.value = {
    ID: "",
    CreatedOn: new Date(),
    Name: "",
    PaymentIntervalMonths: 0,
    Active: true,
  };
};
</script>
