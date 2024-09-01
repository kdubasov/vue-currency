<template>
  <select class="currency-select" id="currency-select" v-model="selectedCurrency" @change="updateCurrency">
    <option :value="Currency.USD">USD</option>
    <option :value="Currency.EUR">EUR</option>
    <option :value="Currency.RUB">RUB</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Currency, useCurrencyStore } from '../../app/store/currency';

export default defineComponent({
  computed: {
    Currency() {
      return Currency;
    },
  },
  setup() {
    const currencyStore = useCurrencyStore();

    const selectedCurrency = computed({
      get: () => currencyStore.getCurrency,
      set: (value: Currency) => currencyStore.setCurrency(value),
    });

    const updateCurrency = () => {
      currencyStore.setCurrency(selectedCurrency.value);
    };

    return {
      selectedCurrency,
      currency: currencyStore.getCurrency,
      updateCurrency,
    };
  },
});
</script>

<style scoped>
.currency-select {
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid var(--gray);
  border-radius: 8px;
  background-color: var(--gray-dark);
  color: var(--white);
  appearance: none;
  outline: none;
  cursor: pointer;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.currency-select:focus {
  border-color: var(--primary);
  background-color: var(--gray);
}

.currency-select option {
  background-color: var(--dark);
  color: var(--white);
}
</style>
