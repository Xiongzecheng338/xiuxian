<script setup>
import AppLayout from './components/AppLayout.vue'
</script>

<template>
  <AppLayout />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(10, 14, 20, 0.5);
}

::-webkit-scrollbar-thumb {
  background: rgba(212, 168, 83, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 168, 83, 0.5);
}
</style>
