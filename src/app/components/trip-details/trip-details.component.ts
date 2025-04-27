import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';
import { TripDocumentsComponent } from '../trip-documents/trip-documents.component';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, TripDocumentsComponent],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss'
})

export class TripDetailsComponent {
  private route = inject(ActivatedRoute); // provides information about the current route and route parameters i.e: IDs.
  tripService = inject(TripService)

  tripId!: number; //"!" promises that tripId will be defined as num
  trip: any;

  ngOnInit() {
    // Subscribe to the route parameters to get the tripId
    this.route.params.subscribe(params => {
      this.tripId = +params['id']; // Parse the tripId as a number
      this.loadTrip();
    });
  }

   // Method to load the trip details from the tripService using tripId
   loadTrip() {
    // Find the trip by its ID
    this.trip = this.tripService.trips.find(t => t.id === this.tripId);
    if (!this.trip) {
      console.error('Trip not found');
    }
  }

   // Method to add an attraction to the current trip
   addAttraction(type: string, desc: string, startDate: string, time: string) {
    if (!desc || !startDate || !time) {
      alert('Please fill in the required information!')
      return;
    }
    if (this.trip) {
      // Ensure the trip exists before adding the attraction
      this.tripService.addAttraction(this.tripId, type, desc, startDate, time);
    } else {
      console.error('Cannot add attraction, trip not found.');
    }
  }
}

