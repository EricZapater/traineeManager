<template>
  <section class="table-header">
    <h2>Trainees</h2>
    <div class="table-buttons">
      <Button rounded raised icon="pi pi-plus" @click="openDialog" />
    </div>
  </section>
  <section class="table">
    <DataTable
      :value="traineeStore.trainees.data"
      showGridlines
      :table-style="{ minWidth: '50rem' }"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
    >
      <Column field="ID" header="id"></Column>
      <Column field="Name" header="name"></Column>
      <Column field="Surname" header="surname"></Column>
    </DataTable>
  </section>
  <Dialog v-model:visible="visible"> </Dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTraineeStore } from "../stores/trainee.store";

const traineeStore = useTraineeStore();

const visible = ref(false);

onMounted(async () => {
  await traineeStore.fetchTrainees();
  console.log(traineeStore.trainees);
});

const openDialog = () => {
  visible.value = true;
};
</script>
<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
