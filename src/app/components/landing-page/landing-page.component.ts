import {ChangeDetectionStrategy, Component, inject, ViewChild,} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepicker, MatDatepickerModule,} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  tripService = inject(TripService);
  destinationText: string = '';
  startDate: Date = new Date(); 
  endDate: Date = new Date(); 

  onSubmit() {

    // Check if any required fields are empty
    if (!this.destinationText || !this.startDate || !this.endDate) {
      return; // Stop the method if validation fails
    }

    this.tripService.addTrip(
      this.destinationText,
      this.startDate,
      this.endDate
    );
    this.destinationText = '';
    this.startDate = new Date();
    this.endDate = new Date();
  }
}
