import { Component, inject, Input } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { DocsType } from '../../models/TripDocument.model';

@Component({
  selector: 'app-trip-documents',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, CommonModule],
  templateUrl: './trip-documents.component.html',
  styleUrl: './trip-documents.component.scss'
})
export class TripDocumentsComponent {
  @Input() tripId!: string; // Trip ID to associate doc with
  tripService = inject(TripService);
  documentName: string = '';
  DocsTypes = Object.values(DocsType);
  documentType: DocsType = DocsType.FlightCard;;
  documentFile: File | null = null;
  errorMessage: string = '';

  // Method for file selection handling
  onFileSelected(event: any) {
    this.documentFile = event.target.files[0];
  }

  // Method to handle document upload
  onUpload() {
    if (!this.documentName || !this.documentType || !this.documentFile) {
      this.errorMessage = 'Please provide all required information on the document';
      return;
    }

    const url = URL.createObjectURL(this.documentFile);

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.errorMessage = 'You must be logged in to upload a document.';
      return;
    }

    // Add document to trip and subscribe to the result
    this.tripService.addDocument(
      this.tripId.toString(),
      this.documentName,
      this.documentType,
      url,
      userId
    ).subscribe({
      next: (document) => {
        this.errorMessage = '';
        this.documentName = '';
        this.documentFile = null;

        // Update the trip's documents array directly
        this.tripService.fetchDocuments(this.tripId).subscribe({
          next: (documents) => {
            console.log('Documents reloaded:', documents);
            // Assuming the parent component binds to this service's data
            this.tripService.trips.find(t => t.id === this.tripId)!.documents = documents;
          },
          error: () => {
            console.error('Failed to reload documents.');
          }
        });

        alert('Document added successfully!');
      },
      error: () => {
        this.errorMessage = 'Failed to upload document.';
      }
    });
  }
}
