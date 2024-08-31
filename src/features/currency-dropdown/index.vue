<template>
  <select id="currency-select" v-model="selectedCurrency" @change="updateCurrency">
    <option :value="Currency.USD">USD</option>
    <option :value="Currency.EUR">EUR</option>
    <option :value="Currency.RUB">RUB</option>
  </select>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {Currency, useCurrencyStore} from '../../app/store/currency';

export default defineComponent({
  computed: {
    Currency() {
      return Currency
    }
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
</style>