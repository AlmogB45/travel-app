import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyMap } from '../models/getCurrencySymbolsResponse.model';
import { Rates } from '../models/getRatesResponse.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
  private readonly baseUrl = 'https://api.vatcomply.com'; // 'readonly' since value will not change

  constructor(private http: HttpClient) {}

  // Get all exchange rates for a given base
  getAllRates(base: string): Observable<Rates> {
    return this.http.get<Rates>(`${this.baseUrl}/rates?base=${base}`);
  }

  // Get available currencies and their names
  getCurrencySymbols(): Observable<CurrencyMap> {
    return this.http.get<CurrencyMap>(`${this.baseUrl}/currencies`);
  }
}
