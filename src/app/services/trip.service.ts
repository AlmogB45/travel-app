import { Injectable } from '@angular/core';
import { Trip } from '../models/Trip.model';
import { DocsType, TripDocument } from '../models/TripDocument.model';
import { Attraction, AttractionType } from '../models/Attraction.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  trips: Trip[] = []; // array of trips

  constructor(private http: HttpClient) {}

  fetchTrips(userId: string): Observable<Trip[]> {
    return this.http
      .get<{ trips: Trip[] }>(`http://localhost:3000/trips/${userId}`)
      .pipe(
        map((res) => {
          const trips = res.trips.map((trip) => ({
            id: trip.id,
            user_id: trip.user_id,
            destination: trip.destination,
            startDate: new Date(trip.startDate),
            endDate: new Date(trip.endDate),
            attractions: trip.attractions ?? [],
            documents: trip.documents ?? [],
          }));
          this.trips = trips; // Automatically update the trips array
          return trips;
        })
      );
  }

  fetchDocuments(tripId: string): Observable<TripDocument[]> {
    return this.http
      .get<{ documents: TripDocument[] }>(
        `http://localhost:3000/documents/${tripId}`
      )
      .pipe(
        map((res) => {
          return res.documents.map((doc) => ({
            id: doc.id,
            trip_id: doc.trip_id,
            user_id: doc.user_id,
            name: doc.name,
            type: doc.type,
            file_url: doc.file_url,
          }));
        })
      );
  }

  fetchAttractions(tripId: string): Observable<Attraction[]> {
    return this.http
      .get<{ attractions: Attraction[] }>(
        `http://localhost:3000/attractions/${tripId}`
      )
      .pipe(
        map((res) => {
          return res.attractions.map((attraction) => ({
            id: attraction.id,
            trip_id: attraction.trip_id,
            type: attraction.type,
            desc: attraction.desc,
            startDate: new Date(attraction.startDate),
            time: attraction.time,
          }));
        })
      );
  }

  // add a new trip to the trips array
  // the logic is in the service so it can be reused in other components
  addTrip(
    destination: string,
    startDate: Date,
    endDate: Date,
    userId: string
  ): Observable<Trip> {
    const newTrip = {
      destination,
      start_date: startDate,
      end_date: endDate,
      user_id: userId,
    };
    return this.http
      .post<{ trip: Trip }>('http://localhost:3000/trips', newTrip)
      .pipe(map((res) => res.trip));
  }

  addAttraction(
    tripId: string,
    type: AttractionType,
    desc: string,
    startDate: string,
    time: string
  ): Observable<Attraction> {
    const tripExists = this.trips.some((t) => t.id === tripId); // Validate tripId locally
    if (!tripExists) {
      console.error('Invalid tripId');
      return throwError(() => new Error('Invalid tripId'));
    }

    const newAttraction = {
      trip_id: tripId,
      type,
      desc,
      startDate,
      time,
    };

    return this.http
      .post<{ attraction: Attraction }>(
        'http://localhost:3000/attractions',
        newAttraction
      )
      .pipe(map((res) => res.attraction));
  }

  // Method to add a document to a specific trip
  addDocument(
    tripId: string,
    name: string,
    type: DocsType,
    url: string,
    userId: string
  ): Observable<TripDocument> {
    const tripExists = this.trips.some((t) => t.id === tripId); // Validate tripId locally
    if (!tripExists) {
      console.error('Invalid tripId');
      return throwError(() => new Error('Invalid tripId'));
    }
    const newDocument = {
      trip_id: tripId,
      name,
      type,
      file_url: url,
      user_id: userId,
    };
    return this.http
      .post<{ document: TripDocument }>(
        'http://localhost:3000/documents',
        newDocument
      )
      .pipe(map((res) => res.document));
  }

  deleteAttraction(attractionId: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3000/attractions/${attractionId}`
    );
  }

  deleteDocument(documentId: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3000/documents/${documentId}`
    );
  }
}
