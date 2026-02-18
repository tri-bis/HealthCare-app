// Defines the data for the top cards (Total, Occupied, etc.)
export interface BedStats {
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  availabilityRate: string;
}

// Defines the data for a single bed card
export interface Bed {
  _id: string;
  bedNumber: string;
  status: 'available' | 'occupied';
  patientName?: string;
  admissionDate?: string;
}