<script setup lang="ts">
import CurrencyDropdown from '../../features/currency-dropdown/index.vue';
</script>

<template>
  <nav>
    <nav class="nav-container">
      <div class="nav-links">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/convert" class="nav-link">Конвертация</router-link>
      </div>

      <CurrencyDropdown />
    </nav>
  </nav>
</template>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dark);
  padding: 15px 30px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: var(--light);
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
}
</style>
