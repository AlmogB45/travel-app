import { Injectable } from '@angular/core';
import { Attraction } from '../models/Attraction.model';
import { TripService } from './trip.service';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {
  constructor(private tripService: TripService) {}

  addAttraction(
    tripId: number,
    type: string,
    desc: string,
    startDate: string,
    time: string
  ) {
    const trip = this.tripService.trips.find((t) => t.id === tripId);
    if (!trip) {
      console.error('Trip not found');
      return;
    }

    const newAttraction: Attraction = {
      id: trip.attractions.length,
      startDate: new Date(startDate),
      desc,
      time,
      type,
    };
    trip.attractions.push(newAttraction);
  }
}
