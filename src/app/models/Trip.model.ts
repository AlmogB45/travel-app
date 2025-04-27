import { Attraction } from "./Attraction.model";
import { TripDocument } from "./TripDocument.model";

export interface Trip {
  id: number;
  destination: string;
  startDate: Date;
  endDate: Date;
  attractions: Attraction[]; // Allows each trip instance to have it's own attractions
  documents: TripDocument[];
}
