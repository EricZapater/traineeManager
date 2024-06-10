<template>
  <section>
    <div class="input-container">
      <label for="CreatedOn">Payment Date:</label>
      <Calendar id="CreatedOn" v-model="paymentDate"></Calendar>
    </div>
  </section>
  <section>
    <DataTable
      v-model:selection="selectedTrainees"
      :value="trainees"
      dataKey="ID"
      showGridlines
      :table-style="{ minWidth: '50rem' }"
      paginator
      :rows="10"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="Name" header="name"> </Column>
      <Column field="Surname" header="surname"></Column>
      <Column field="NextPayment" header="nextpayment" sortable></Column>
    </DataTable>
  </section>
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
import { ref } from "vue";
import { Trainee, PaymentsRequest } from "../types";
import { useToast } from "primevue/usetoast";

const trainees = ref<Trainee[]>([]);

const selectedTrainees = ref<Trainee[]>([]);
const paymentDate = ref<Date | null>(null);

const emit = defineEmits<{
  (e: "submit", paymentsRequest: PaymentsRequest): void;
  (e: "cancel"): void;
}>();

const toast = useToast();

const cancelForm = () => {
  emit("cancel");
};

const submitForm = () => {
  if (paymentDate.value && selectedTrainees.value.length > 0) {
    const paymentRequest: PaymentsRequest = {
      Trainees: selectedTrainees.value,
      //Date: new Date(formatISO8601Date(paymentDate.value)),
      Date: new Date(
        paymentDate.value.getTime() +
          -1 * paymentDate.value.getTimezoneOffset() * 60 * 1000
      ),
    };
    emit("submit", paymentRequest);
  } else {
    toast.add({
      severity: "warn",
      summary: "Validation Error",
      detail: "Please select a date and at least one trainee.",
      life: 3000,
    });
  }
};
</script>
