<script setup>
import Cinema from "./components/Cinema.vue";
</script>

<template>
  <div class="app">
    <h2 class="app-title">Забронировать место</h2>

    <Cinema />

    <notifications />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.app-title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  padding: 24px;
  border-radius: 0 0 12px 12px;
  background: #fff;
  color: #000;
  margin: 0;
  z-index: 2;
}
</style>
