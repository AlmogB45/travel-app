export enum DocsType {
   FlightCard = "Flight Card",
   DutyFreeReceipts = "Duty Free Receipts",
   TravelInsurance = "Travel Insurance",
   HotelBooking = "Hotel Booking",
   HotelReservations = "Hotel Reservations",
   CarRental = "Car Rental",
   Tickets = "Tickets",
   Receipts = "Receipts",
   Itinerary = "Itinerary"
  }
  
export interface TripDocument {
    id: number;
    name: string;
    type: DocsType; 
    url: string;
    dateUploaded?: Date; // Optional field to track when the document was uploaded
}