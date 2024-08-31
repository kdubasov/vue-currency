<script setup lang="ts">
  import CurrencyDropdown from '../../features/currency-dropdown/index.vue'
</script>

<template>
  <nav>
    <div>
      <router-link to="/">Go to Home</router-link>
      <router-link to="/convert">Go to About</router-link>
    </div>

    <CurrencyDropdown />
  </nav>
</template>

<style scoped>

</style>