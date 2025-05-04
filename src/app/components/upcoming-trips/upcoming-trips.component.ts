import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'upcoming-trips',
  imports: [RouterModule, CommonModule],
  templateUrl: './upcoming-trips.component.html',
  styleUrl: './upcoming-trips.component.scss'
})
export class UpcomingTripsComponent {

  tripService = inject(TripService);

  get trips() { 
    return this.tripService.trips; // Access the trips from the service
  }

  trackByTripId(index: number, trip: any) {
    return trip.id; // Track by trip id for performance
  }

}
