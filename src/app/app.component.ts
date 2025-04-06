import { Component } from '@angular/core';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UpcomingTripsComponent } from "./components/upcoming-trips/upcoming-trips.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, UpcomingTripsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'travel-app';
}


