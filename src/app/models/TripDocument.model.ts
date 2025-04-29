export interface TripDocument {
    id: number;
    name: string;
    type: string; // OFIR - consider using an enum for type
    url: string;
}