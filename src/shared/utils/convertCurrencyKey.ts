export const convertCurrencyKey = (str: string) => {
  return str.slice(str.indexOf('-') + 1, str.length);
};
