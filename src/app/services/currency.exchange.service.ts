import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
  private baseUrl = 'https://api.vatcomply.com';
  
  constructor(private http: HttpClient) {}

   // Get all exchange rates for a given base
   getAllRates(base: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/rates?base=${base}`);
  }

  // Get available currencies and their names
  getCurrencySymbols(): Observable<any> {
    return this.http.get(`${this.baseUrl}/currencies`);
  }
}

