import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/Trip.model';

@Component({
  selector: 'upcoming-trips',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './upcoming-trips.component.html',
  styleUrl: './upcoming-trips.component.scss'
})
export class UpcomingTripsComponent implements OnInit {

  tripService = inject(TripService);
  trips: Trip[] = [];

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.tripService.fetchTrips(userId).subscribe({
        next: (trips) => {
          this.trips = trips;
        },
        error: () => {
          // Optionally handle error
        }
      });
    }
  }

  trackByTripId(index: number, trip: any) {
    return trip.id; // Track by trip id for performance
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
