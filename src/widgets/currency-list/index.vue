<template>
  <div>
    <h3>Данные с сервера</h3>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="(rate, currency) in data" :key="currency">
        {{ currency }}: {{ rate }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue';
import {Currency, useCurrencyStore} from '../../app/store/currency';

export default defineComponent({
  computed: {
    Currency() {
      return Currency
    }
  },
  setup() {
    const store = useCurrencyStore();

    // Загружаем данные при маунте компонента
    onMounted(async () => {
      await store.fetchData();
      console.log(store.getData)
    });

    const data = computed(() => store.getData);
    const isLoading = computed(() => store.isLoading);
    const error = computed(() => store.getError);

    return {
      data,
      isLoading,
      error,
    };
  },
});
</script>

<style scoped>
</style>