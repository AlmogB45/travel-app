export enum AttractionType {
  Concert = "Concert",
  Gallery = "Gallery",
  Zoo = "Zoo",
  Park = "Park",
  Sightseeing = "Sightseeing"
}



export interface Attraction {
    id: number;
    trip_id: string;
    desc: String;
    startDate: Date;
    time: String;
    type: AttractionType;
  }

