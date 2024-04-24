<template>
  <section class="two-columns">
    <div class="input-container">
      <label for="name">Name:</label>
      <InputText id="name" v-model="fee.Name"></InputText>
    </div>
    <div class="input-container">
      <label for="name">Payment interval (in months):</label>
      <InputNumber
        id="PaymentIntervalMonths"
        v-model="fee.PaymentIntervalMonths"
      ></InputNumber>
    </div>
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
import { Fee } from "../types";
import { useFeeStore } from "../stores/income.store";
import { storeToRefs } from "pinia";

const emit = defineEmits<{
  (e: "submit", fee: Fee): void;
  (e: "cancel"): void;
}>();

const feeStore = useFeeStore();

const { fee } = storeToRefs(feeStore);

const cancelForm = () => {
  emit("cancel");
};

const submitForm = async () => {
  emit("submit", fee.value as Fee);
};
</script>
