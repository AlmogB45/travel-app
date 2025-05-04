export interface Currency {
  name: string;
  symbol: string;
}

export interface CurrencyMap {
  [currencyCode: string]: Currency;
}
