import { Component, inject, OnInit } from '@angular/core';
import { CurrencyExchangeService } from '../../services/currency.exchange.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'currency-exchange',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [CurrencyExchangeService],  // Add CurrencyExchangeService to the component's providers array
  templateUrl: './currency-exchange.component.html'
})
export class CurrencyExchangeComponent implements OnInit {
  symbols: { code: string, name: string }[] = []; // Array to hold currency symbols
  base = 'USD';
  target = 'EUR';
  amount = 1;
  result: number | null = null; // Result of the conversion
  errorMessage: string = '';

  // constructor(private currencyExchangeService: CurrencyExchangeService) {} // Injecting the service
  currencyService = inject(CurrencyExchangeService); // Using inject function for cleaner code
  ngOnInit() {
    this.loadCurrencySymbols();
  }

  loadCurrencySymbols() {
    this.currencyService.getCurrencySymbols().subscribe({
      next: (data) => {
        // Assuming the data comes as an object, mapping it to the symbols array
        this.symbols = Object.entries(data).map(([code, value]) => ({
          code: code.toUpperCase(),
          name: value.name
        }));
      },
      error: (error: HttpErrorResponse) => {
        // Error handling
        this.errorMessage = `Error fetching currency symbols: ${error.message}`;
        console.error('API Error:', error);
      }
    });
  }

  convert() {
    this.currencyService.getAllRates(this.base).subscribe({
      next: (data) => {
        const rate = data.rates[this.target]; 
        if (rate) {
          this.result = this.amount * rate;
        } else {
          this.errorMessage = `Rate not found for ${this.base} → ${this.target}`;
        }
      },
      error: (error: HttpErrorResponse) => {
        // Error handling
        this.errorMessage = `Error fetching conversion rates: ${error.message}`;
        console.error('API Error:', error);
      }
    });
  }
}