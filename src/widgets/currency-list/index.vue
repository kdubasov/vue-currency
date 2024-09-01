<template>
  <div class="data-container">
    <h3 class="data-header">Курсы основных валют:</h3>
    <div v-if="isLoading" class="loading-message">Загрузка...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <ul v-else class="currency-list">
      <li v-for="(rate, currency) in filteredData" :key="currency" class="currency-item">
        1{{ selectedCurrency.toUpperCase() }} = {{ rate.toFixed(2)
        }}{{ convertCurrencyKey(currency.toString()).toUpperCase() }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { Currency, useCurrencyStore } from '../../app/store/currency';
import { SHOWED_CURRENCIES } from './data';
import { convertCurrencyKey } from '../../shared/utils/convertCurrencyKey.ts';

export default defineComponent({
  computed: {
    Currency() {
      return Currency;
    },
  },
  setup() {
    const store = useCurrencyStore();
    const isLoading = computed(() => store.isLoading);
    const error = computed(() => store.getError);
    const currency = computed(() => store.getCurrency);

    const filteredData = computed(() => {
      if (!store.getData) return null;
      return Object.fromEntries(
        Object.entries(store.getData).filter(([key]) => SHOWED_CURRENCIES[store.getCurrency].includes(key)),
      );
    });

    onMounted(async () => {
      await store.fetchData();
    });

    return {
      isLoading,
      error,
      filteredData,
      selectedCurrency: currency,
      convertCurrencyKey,
    };
  },
});
</script>

<style scoped>
.data-container {
  background-color: var(--dark);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: var(--light);
  max-width: 600px;
  margin: 20px auto;
}

.data-header {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--white);
  padding-bottom: 10px;
}

.loading-message,
.error-message {
  font-size: 1rem;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--gray-dark);
  color: var(--light);
}

.error-message {
  background-color: var(--danger);
}

.currency-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.currency-item {
  padding: 12px 15px;
  border-bottom: 1px solid var(--gray-dark);
  font-size: 1rem;
  color: var(--light);
}

.currency-item:last-child {
  border-bottom: none;
}
</style>
