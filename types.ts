
export interface LocationDetail {
  id: string;
  title: string;
  description: string;
  address?: string;
  openingHours?: string;
  mapUrl?: string;
  websiteUrl?: string;
  carNaviPhone?: string;
  imageUrl?: string;
  transitLegs?: TransitLeg[];
  reservation?: {
    id: string;
    sections: ReservationSection[];
  };
}

export interface ReservationSection {
  title: string;
  items: { label: string; value: string; isFullWidth?: boolean }[];
}

export interface TransitLeg {
  type: 'bus' | 'walk' | 'train' | 'wait' | 'flight' | 'taxi';
  transport: string;
  depTime: string;
  depStop: string;
  arrTime: string;
  arrStop: string;
  details: string[];
}

export interface ItineraryEvent {
  id?: string; // Added for editing purposes
  time: string;
  description: string;
  isHighlight?: boolean;
  note?: string;
  locationId?: string;
}

export interface DaySchedule {
  date: string;
  weekday: string;
  title: string;
  accommodation?: string;
  accommodationMapUrl?: string;
  mapUrl?: string;
  events: ItineraryEvent[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  category?: string;
}

export interface UsefulLink {
  title: string;
  url: string;
  category?: string;
}

export interface EmergencyContact {
  title: string;
  number: string;
  note?: string;
}

export interface ShoppingItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

// Updated to match Sheet: A:Date, B:Item, C:PaymentMethod, D:TWD, E:INR, F:Cash(Unused/Legacy), G:Note, H:RowIndex
export interface ExpenseRecord {
  rowIndex: number;     // Col H
  date: string;         // Col A
  item: string;         // Col B
  paymentMethod: string; // Col C (Renamed from payer)
  amountTwd: number;    // Col D
  amountInr: number;    // Col E
  note: string;         // Col G
}

export enum Tab {
  ITINERARY = 'Itinerary',
  PREP = 'Prep',
  COST = 'Cost',
  PACKING = 'Packing',
  SHOPPING = 'Shopping',
  INFO = 'Info'
}
