import { defineStore } from 'pinia';

export enum Currency {
   RUB = 'rub',
   USD = 'usd',
   EUR = 'eur',
}

// Определяем тип состояния
interface CurrencyState {
   currency: Currency;
   data: any;
   loading: boolean;
   error: string | null;
}

// Создаем стор с помощью defineStore
export const useCurrencyStore = defineStore('currency', {
   state: (): CurrencyState => ({
      currency: Currency.USD,
      data: null,
      loading: false,
      error: null,
   }),
   getters: {
      getCurrency: (state) => state.currency,
      getData: (state) => state.data,
      isLoading: (state) => state.loading,
      getError: (state) => state.error,
   },
   actions: {
      setCurrency(newCurrency: Currency) {
         this.currency = newCurrency;
      },
      async fetchData() {
         this.loading = true;
         this.error = null;

         try {
            const response = await fetch('https://status.neuralgeneration.com/api/currency');

            if (!response.ok) throw new Error('Network response was not ok');

            this.data = await response.json();
         } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            this.error = 'Не удалось загрузить данные';  // Устанавливаем ошибку
         } finally {
            this.loading = false;  // Завершаем загрузку
         }
      },
   },
});