<template>
  <div class="converter-container">
    <div class="converter-block">
      <label for="from-currency" class="converter-label">Из:</label>
      <div class="converter-input-group">
        <input v-model="fromValue" @change="setFromValue" type="number" class="converter-input" />
        <select id="from-currency" v-model="from" @change="setFrom" class="converter-select">
          <option v-for="currency in uniqueCurrencies" :key="currency" :value="currency">
            {{ currency.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>

    <div class="converter-block">
      <label for="to-currency" class="converter-label">В:</label>
      <div class="converter-input-group">
        <input v-model="toValue" @change="setToValue" type="number" class="converter-input" />
        <select id="to-currency" v-model="to" @change="setTo" class="converter-select">
          <option v-for="currency in uniqueCurrencies" :key="currency" :value="currency">
            {{ currency.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Currency, useCurrencyStore } from '../../app/store/currency.ts';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const store = useCurrencyStore();
    const from = ref<string>(Currency.USD);
    const to = ref<string>(Currency.RUB);
    const fromValue = ref<number>(0);
    const toValue = ref<number>(0);

    const setFrom = (e: Event) => {
      from.value = (e.target as HTMLSelectElement).value;
    };
    const setTo = (e: Event) => {
      to.value = (e.target as HTMLSelectElement).value;
    };
    const setFromValue = (e: Event) => {
      fromValue.value = +(e.target as HTMLInputElement).value;
    };
    const setToValue = (e: Event) => {
      toValue.value = +(e.target as HTMLInputElement).value;
    };

    const uniqueCurrencies = computed(() => {
      if (!store.data) return null;
      const keys = Object.keys(store.data);
      const firstParts = keys.map((key) => key.split('-')[0]);
      return Array.from(new Set(firstParts));
    });

    const getRateKey = (currencyFrom: string, currencyTo: string) => `${currencyFrom}-${currencyTo}`;

    const currentRate = computed(() => {
      if (!store.data) return 1;
      return store.data[getRateKey(from.value, to.value)] || 1;
    });

    const computedAmount2 = computed(() => {
      return fromValue.value * currentRate.value;
    });

    watch([fromValue, from, to], () => {
      toValue.value = +computedAmount2.value.toFixed(2);
    });

    watch([toValue, from, to], () => {
      fromValue.value = +(toValue.value / currentRate.value).toFixed(2);
    });

    onMounted(() => {
      if (store.data) return;
      store.fetchData();
    });

    return {
      data: store.data,
      uniqueCurrencies,
      from,
      fromValue,
      to,
      toValue,
      setFrom,
      setFromValue,
      setTo,
      setToValue,
    };
  },
});
</script>

<style scoped>
.converter-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 400px;
  margin: 20px auto;
  padding: 30px 50px;
  background-color: var(--dark);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.converter-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.converter-label {
  font-size: 1rem;
  margin-bottom: 8px;
  color: var(--light);
}

.converter-input-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.converter-select,
.converter-input {
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid var(--gray);
  border-radius: 8px;
  background-color: var(--gray-dark);
  color: var(--white);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  outline: none;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}
.converter-select {
  flex: 0;
}

.converter-select:focus,
.converter-input:focus {
  border-color: var(--primary);
  background-color: var(--gray);
}
</style>
