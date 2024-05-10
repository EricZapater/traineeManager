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
  <section class="six-columns">
    <div class="input-container">
      <label for="BaseAmount">Import Base:</label>
      <InputNumber
        id="BaseAmount"
        v-model="fee.BaseAmount"
        mode="currency"
        currency="EUR"
        locale="es-ES"
        disabled
      ></InputNumber>
    </div>
    <div class="input-container">
      <label for="VatPercentage">% IVA:</label>
      <InputNumber
        id="VatPercentage"
        v-model="fee.VatPercentage"
        mode="currency"
        currency="EUR"
        locale="es-ES"
        @update:model-value="calcAmounts"
      ></InputNumber>
    </div>
    <div class="input-container">
      <label for="Vat">Import IVA:</label>
      <InputNumber
        id="Vat"
        v-model="fee.Vat"
        mode="currency"
        currency="EUR"
        locale="es-ES"
        disabled
      ></InputNumber>
    </div>
    <div class="input-container">
      <label for="IncomeTaxPercentage">% IRPF:</label>
      <InputNumber
        id="IncomeTaxPercentage"
        v-model="fee.IncomeTaxPercentage"
        mode="currency"
        currency="EUR"
        locale="es-ES"
        @update:model-value="calcAmounts"
      ></InputNumber>
    </div>
    <div class="input-container">
      <label for="IncomeTax">Import IRPF:</label>
      <InputNumber
        id="IncomeTax"
        v-model="fee.IncomeTax"
        mode="currency"
        currency="EUR"
        locale="es-ES"
        disabled
      ></InputNumber>
    </div>
    <div class="input-container">
      <label for="TotalAmount">Quota:</label>
      <InputNumber
        id="TotalAmount"
        v-model="fee.TotalAmount"
        mode="currency"
        currency="EUR"
        locale="es-ES"
        @update:model-value="calcAmounts"
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

const calcAmounts = () => {
  fee.value.BaseAmount =
    fee.value.TotalAmount /
    (1 + fee.value.VatPercentage / 100 - fee.value.IncomeTaxPercentage / 100);

  fee.value.Vat = fee.value.BaseAmount * (fee.value.VatPercentage / 100);
  fee.value.IncomeTax =
    fee.value.BaseAmount * (fee.value.IncomeTaxPercentage / 100);
};

const cancelForm = () => {
  emit("cancel");
};

const submitForm = async () => {
  emit("submit", fee.value as Fee);
};
</script>
