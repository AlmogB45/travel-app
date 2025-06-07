import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';
import { TripDocumentsComponent } from '../trip-documents/trip-documents.component';
import { AttractionType } from '../../models/Attraction.model';
import { Trip } from '../../models/Trip.model';
import { DocsType } from '../../models/TripDocument.model';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, TripDocumentsComponent],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  tripService = inject(TripService);
  tripId!: string;
  trip: Trip | undefined;
  attractionTypes = Object.values(AttractionType);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tripId = params.get('id')!;
      const userId = localStorage.getItem('user_id');
      if (userId && this.tripId) {
        this.tripService.fetchTrips(userId).subscribe({
          next: (trips) => {
            this.trip = trips.find((t) => t.id === this.tripId);
            if (this.trip) {
              // Fetch documents for the trip
              this.tripService.fetchDocuments(this.tripId).subscribe({
                next: (documents) => {
                  this.trip!.documents = documents; // Update the documents array
                },
                error: () => {
                  console.error('Failed to fetch documents');
                },
              });

              // Fetch attractions for the trip
              this.tripService.fetchAttractions(this.tripId).subscribe({
                next: (attractions) => {
                  this.trip!.attractions = attractions; // Update the attractions array
                },
                error: () => {
                  console.error('Failed to fetch attractions');
                },
              });
            }
          },
          error: () => {
            this.trip = undefined;
          },
        });
      }
    });
  }

  // Method to load the trip details from the tripService using tripId
  loadTrip() {
    // Find the trip by its ID
    this.trip = this.tripService.trips.find((t) => t.id === this.tripId);
    if (!this.trip) {
      console.error('Trip not found');
    }
  }

  // Method to add an attraction to the current trip
  addAttraction(
    tripId: string,
    type: AttractionType,
    desc: string,
    startDate: string,
    time: string
  ) {
    if (!tripId) {
      console.error('Trip ID is not provided or invalid.');
      alert('Cannot add attraction: Trip ID is missing.');
      return;
    }

    if (!desc || !startDate || !time) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.trip) {
      this.tripService
        .addAttraction(tripId, type, desc, startDate, time)
        .subscribe({
          next: (attraction) => {
            this.trip!.attractions.push(attraction); // Update the local attractions array
            alert('Attraction added successfully!');
            this.tripService.fetchAttractions(tripId).subscribe({
              next: (attractions) => {
                this.trip!.attractions = attractions; // Reload attractions
              },
              error: () => {
                console.error('Failed to reload attractions.');
              },
            });
          },
          error: () => {
            console.error('Failed to add attraction.');
            alert('Failed to add attraction.');
          },
        });
    } else {
      console.error('Cannot add attraction, trip not found.');
      alert('Cannot add attraction: Trip not found.');
    }
  }

  // Method to add a document to the current trip
  addDocument(
    tripId: string,
    name: string,
    type: DocsType,
    fileUrl: string,
    userId: string
  ) {
    if (!name || !type || !fileUrl) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.trip) {
      this.tripService
        .addDocument(tripId, name, type, fileUrl, userId)
        .subscribe({
          next: (document) => {
            this.trip!.documents.push(document); // Update the local documents array
            alert('Document added successfully!');
          },
          error: () => {
            console.error('Failed to add document.');
            alert('Failed to add document.');
          },
        });
    } else {
      console.error('Cannot add document, trip not found.');
    }
  }

  getAttractionType(type: string): AttractionType {
    // Make sure it's a valid AttractionType enum value
    if (Object.values(AttractionType).includes(type as AttractionType)) {
      return type as AttractionType;
    } else {
      console.error('Invalid attraction type');
      return AttractionType.Concert; // default value
    }
  }

  deleteAttraction(attractionId: string) {
    console.log('Deleting attraction with ID:', attractionId); // Log the ID for debugging

    if (!confirm('Are you sure you want to delete this attraction?')) return;

    this.tripService.deleteAttraction(attractionId).subscribe({
      next: () => {
        alert('Attraction removed successfully!');
        this.trip!.attractions = this.trip!.attractions.filter(
          (attraction) => String(attraction.id) !== attractionId // Ensure correct comparison
        );
      },
      error: (err) => {
        console.error('Failed to remove attraction:', err);
        alert('Failed to remove attraction.');
      },
    });
  }

  deleteDocument(documentId: string) {
    console.log('Deleting document with ID:', documentId); // Log the ID for debugging

    if (!confirm('Are you sure you want to delete this document?')) return;

    this.tripService.deleteDocument(documentId).subscribe({
      next: () => {
        alert('Document removed successfully!');
        this.trip!.documents = this.trip!.documents.filter(
          (doc) => String(doc.id) !== documentId // Ensure both are strings
        );
      },
      error: (err) => {
        console.error('Failed to remove document:', err);
        alert('Failed to remove document.');
      },
    });
  }
}
