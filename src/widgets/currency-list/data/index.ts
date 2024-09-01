import { Currency } from '../../../app/store/currency.ts';

export const SHOWED_CURRENCIES: Record<Currency, string[]> = {
  rub: ['rub-usd', 'rub-eur'],
  usd: ['usd-rub', 'usd-eur'],
  eur: ['eur-rub', 'eur-usd'],
};
