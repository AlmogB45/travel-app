import { Injectable } from '@angular/core';
import { Attraction, AttractionType } from '../models/Attraction.model';
import { TripService } from './trip.service';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {
  constructor(private tripService: TripService) {}

  addAttraction(
    tripId: string,
    type: AttractionType,
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
      trip_id: tripId,
    };
    trip.attractions.push(newAttraction);
  }
}
