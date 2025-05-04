export interface Rates {
    base: string;
    date: string;
    rates: { [key: string]: number };
}