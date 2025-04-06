import { Injectable } from '@angular/core';
import { Trip } from '../models/Trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  trips: Trip[] = []; // array of trips

  constructor() {}

  // add a new trip to the trips array
  // the logic is in the service so it can be reused in other components
  addTrip(destination: string, startDate: string, endDate: string) {
    const newTrip: Trip = {
      id: this.trips.length,
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    this.trips.push(newTrip);
  }
}
