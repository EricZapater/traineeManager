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
      <section class="three-columns">
        <div class="input-container">
          <label for="feeId">Fee</label>
          <Dropdown
            v-model="trainee.FeeID"
            id="feeId"
            :options="fees"
            optionLabel="Name"
            optionValue="ID"
          ></Dropdown>
        </div>
        <div class="input-container">
          <label for="lastPayment">Last Payment</label>
          <Calendar id="lastPayment" v-model="trainee.LastPayment" disabled />
        </div>
        <div class="input-container">
          <label for="nextPayment">Next Payment</label>
          <Calendar id="nextPayment" v-model="trainee.NextPayment" disabled />
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
    <TabPanel header="Payments">
      <DataTable
        :value="paymentStore.payments"
        showGridlines
        :table-style="{ minWidth: '50rem' }"
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
      >
        <Column field="CreatedOn" header="createdon"></Column>
        <Column field="BaseAmount" header="baseamount"></Column>
        <Column field="VatPercentage" header="vatpercentage"></Column>
        <Column field="Vat" header="vat"></Column>
        <Column
          field="IncomeTaxPercentage"
          header="incometaxpercentage"
        ></Column>
        <Column field="IncomeTax" header="incometax"></Column>
        <Column field="TotalAmount" header="totalamount"></Column>
      </DataTable>
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
import { useFeeStore, usePaymentStore } from "../stores/income.store";

const emit = defineEmits<{
  (e: "submit", trainee: Trainee): void;
  (e: "cancel"): void;
}>();

const traineeStore = useTraineeStore();
const appUserStore = useAppUserStore();
const feeStore = useFeeStore();
const paymentStore = usePaymentStore();

const { trainee } = storeToRefs(traineeStore);
const { appUser } = storeToRefs(appUserStore);
const { fees } = storeToRefs(feeStore);
const { payments } = storeToRefs(paymentStore);

const cancelForm = () => {
  emit("cancel");
};

const submitForm = async () => {
  emit("submit", trainee.value as Trainee);
};
</script>
