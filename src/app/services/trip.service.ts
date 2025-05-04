import { Injectable } from '@angular/core';
import { Trip } from '../models/Trip.model';
import { DocsType, TripDocument } from '../models/TripDocument.model';
import { AttractionType } from '../models/Attraction.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  trips: Trip[] = []; // array of trips

  constructor() {}

  // add a new trip to the trips array
  // the logic is in the service so it can be reused in other components
  addTrip(destination: string, startDate: Date, endDate: Date) {
    const newTrip: Trip = {
      id: this.trips.length, //Assign unique ID based by arr length
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      attractions: [],
      documents: [],
    };
    this.trips.push(newTrip); // Add new trip to arr
  }

  // Add an attraction to a specific trip by its ID
  addAttraction(
    tripId: number,
    type: AttractionType,
    desc: string,
    startDate: string,
    time: string
  ) {
    // Find the trip by its ID
    const trip = this.trips.find((t) => t.id === tripId);
    if (trip) {
      // Create a new attraction object
      const newAttraction = {
        id: trip.attractions.length, // Generate a unique ID for the attraction based on length
        type,
        desc,
        startDate: new Date(startDate), // Convert string to Date
        time,
      };

      // Add the new attraction to the trip's attractions array
      trip.attractions.push(newAttraction);
    } else {
      console.error('Trip not found');
    }
  }

  // Method to add a document to a specific trip
  addDocument(tripId: number, name: string, type: DocsType, url: string) {
    const trip = this.trips.find((t) => t.id === tripId);
    if (trip) {
      const newDocument: TripDocument = {
        id: trip.documents.length + 1,
        name,
        type,
        url,
      };
      trip.documents.push(newDocument); // Add the new document to the trip
    }
  }
}
