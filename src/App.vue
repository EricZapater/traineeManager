<template>
  <div class="app-container">
    <TheHeader></TheHeader>
    <div class="main-container">
      <TheSideBar></TheSideBar>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
  <Toast position="top-center" />
</template>

<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import TheSideBar from "./components/TheSideBar.vue";
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ocupa toda la altura de la ventana */
}

.main-container {
  display: flex;
  flex-grow: 1; /* Ocupa el espacio restante */
  overflow: hidden; /* Evita desbordamiento */
}

.content {
  flex-grow: 1; /* Permite que el contenido crezca y llene el espacio */
  overflow-y: auto; /* Permite desplazamiento vertical si es necesario */
  /*margin-left: 250px; /* Ajuste basado en el ancho de TheSideBar */
  padding: 20px; /* Espaciado interior */
}
.app-header {
  z-index: 1000; /* Asegura un z-index alto para que se muestre encima */
  position: relative; /* z-index solo funciona en elementos posicionados */
}
</style>
