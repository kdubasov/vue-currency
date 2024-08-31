<script setup lang="ts">
import Navbar from "../../widgets/navbar/index.vue"
</script>

<template>
  <Navbar />
  <router-view></router-view>
</template>

<style scoped>
.title {
  color: red;
}
</style>
