import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  imports: [MatFormFieldModule, MatDatepickerModule, MatInputModule, FormsModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}