import { Component, inject } from '@angular/core';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'upcoming-trips',
  imports: [],
  templateUrl: './upcoming-trips.component.html',
  styleUrl: './upcoming-trips.component.scss'
})
export class UpcomingTripsComponent {

  tripService = inject(TripService);

}
