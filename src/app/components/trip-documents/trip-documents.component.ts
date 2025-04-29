import { Component, inject, Input } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-documents',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, CommonModule],
  templateUrl: './trip-documents.component.html',
  styleUrl: './trip-documents.component.scss'
})
export class TripDocumentsComponent {
  @Input() tripId!: number; // Trip ID to associate doc with
  tripService = inject(TripService);
  documentName: string = '';
  documentType: string = ''; // OFIR - consider using an enum for document types
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

    // Add document to trip
    this.tripService.addDocument(this.tripId, this.documentName, this.documentType, url);

    // Reset form
    this.documentName = '';
    this.documentType = '';
    this.documentFile = null;
  }
}
