import { Routes } from '@angular/router';
import { UpcomingTripsComponent } from './components/upcoming-trips/upcoming-trips.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AuthGuard } from './services/AuthGuard.service';

export const routes: Routes = [
    { path: '', component: UserLoginComponent },
    { path: 'home', component: LandingPageComponent, canActivate: [AuthGuard] },
    { path: 'currency-exchange', component: CurrencyExchangeComponent},
    { path: 'upcoming-trips',component: UpcomingTripsComponent, canActivate: [AuthGuard] },
    { path: 'trip/:id', component: TripDetailsComponent, canActivate: [AuthGuard] },
    { path: 'register', component: UserRegisterComponent }
];
