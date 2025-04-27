import { Routes } from '@angular/router';
import { UpcomingTripsComponent } from './components/upcoming-trips/upcoming-trips.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';


export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'currency-exchange', component: CurrencyExchangeComponent},
    { path: 'upcoming-trips',component: UpcomingTripsComponent },
    { path: 'trip/:id', component: TripDetailsComponent}
];
