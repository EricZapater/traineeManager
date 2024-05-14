<template>
  <section class="table-header">
    <h2>Payments</h2>
    <div class="date-filters">
      <Calendar placeholder="Start Date" v-model="startDate" />
      <Calendar placeholder="End Date" v-model="endDate" />
      <Button
        label="Filter"
        icon="pi pi-filter"
        @click="fetchFilteredPayments"
      />
    </div>
  </section>
  <section class="table">
    <DataTable
      :value="payments"
      showGridlines
      :table-style="{ minWidth: '50rem' }"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
    >
      <Column field="CreatedOn" header="createdon">
        <!--<template #body="slotProps">
          {{ formatDate(slotProps.data.CreatedOn) }}
        </template>-->
      </Column>
      <Column field="TraineeID" header="Trainee ID">
        <template #body="slotProps">
          {{ getTraineeData(slotProps.data.TraineeID) }}
        </template>
      </Column>
      <Column field="BaseAmount" header="Base Amount"></Column>
      <Column field="Vat" header="VAT"></Column>
      <Column field="VatPercentage" header="VAT Percentage"></Column>
      <Column field="IncomeTax" header="Income Tax"></Column>
      <Column
        field="IncomeTaxPercentage"
        header="Income Tax Percentage"
      ></Column>
      <Column field="TotalAmount" header="Total Amount"></Column>
    </DataTable>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePaymentStore } from "../stores/income.store";
import { formatISO8601Date } from "../utils/common";
import { useToast } from "primevue/usetoast";
import { Payment } from "../types";
import { useTraineeStore } from "../stores/trainee.store";

const paymentStore = usePaymentStore();
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const payments = ref<Payment[]>([]);
const toast = useToast();
const traineeStore = useTraineeStore();

onMounted(async () => {
  await traineeStore.fetchTrainees();
});

const getTraineeData = (traineeId: string) => {
  const trainee = traineeStore.trainees.find((t) => t.ID === traineeId);
  return trainee ? `${trainee.Surname} ${trainee.Name}` : "Not found";
};

const fetchFilteredPayments = async () => {
  if (!startDate.value || !endDate.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Both start date and end date must be selected",
      life: 3000,
    });
    return;
  }
  const start = formatISO8601Date(startDate.value); // Formato yyyy-mm-dd
  const end = formatISO8601Date(endDate.value); // Formato yyyy-mm-dd
  await paymentStore.getPaymentsBetweenDates(start, end);
  //startDate.value.toString(),
  //endDate.value.toString()
  //);
  payments.value = paymentStore.payments;
};
</script>
