<template>
  <Header></Header>
  <div id="app">
    <TheSideBar></TheSideBar>
    <router-view />
  </div>
  <Toast position="top-center" />
</template>
<script setup lang="ts">
import Header from "./components/TheHeader.vue";
import TheSideBar from "./components/TheSideBar.vue";
</script>
<style scoped></style>
