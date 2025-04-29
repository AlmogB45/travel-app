import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
  private baseUrl = 'https://api.vatcomply.com'; // OFIR - best practice to make this 'readonly' since it is a constant value
  
  constructor(private http: HttpClient) {}

   // Get all exchange rates for a given base
   getAllRates(base: string): Observable<any> { // OFIR - once you know the structure of the response, you can replace '<any>' with a more specific type
    return this.http.get(`${this.baseUrl}/rates?base=${base}`);
  }

  // Get available currencies and their names
  getCurrencySymbols(): Observable<any> { // OFIR - once you know the structure of the response, you can replace '<any>' with a more specific type
    return this.http.get(`${this.baseUrl}/currencies`);
  }
}

