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
      <Column field="TotalAmount" header="Total Amount" />
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
import { Fee } from "../types";

const visible = ref(false);
const createMode = ref(true);

const feeStore = useFeeStore();
const { fee } = storeToRefs(feeStore);
const toast = useToast();

onMounted(async () => {
  await feeStore.fetchFees();
});

const createButton = () => {
  createMode.value = true;
  clearFee();
  visible.value = true;
};

const editButton = async (event: any, fee: Fee) => {
  console.log(event);
  createMode.value = false;
  feeStore.setFee(fee);
  visible.value = true;
};

const deleteButton = async (event: any, fee: Fee) => {
  console.log(event, fee);
};

const submitForm = async () => {
  let response: any;
  if (createMode.value == true) {
    fee.value.ID = getNewUuid();
    response = await feeStore.createFee(fee.value);
    await feeStore.fetchFees();
  } else {
    response = await feeStore.updateFee(fee.value);
    await feeStore.fetchFees();
  }
  visible.value = false;
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
    BaseAmount: 0,
    Vat: 0,
    VatPercentage: 0,
    IncomeTax: 0,
    IncomeTaxPercentage: 0,
    TotalAmount: 0,
    Active: true,
  };
};
</script>
