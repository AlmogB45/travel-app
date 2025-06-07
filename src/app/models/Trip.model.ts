import { Attraction } from './Attraction.model';
import { TripDocument } from './TripDocument.model';

export interface Trip {
  user_id: string;
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  attractions: Attraction[]; // Allows each trip instance to have it's own attractions
  documents: TripDocument[];
}
