export interface Reservation {
  id: string;
  businessId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  resourceType: 'room' | 'table' | 'service' | 'other';
  resourceId?: string;
  resourceName?: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  numberOfGuests: number;
  notes?: string;
  totalAmount?: number;
  depositAmount?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationFormData {
  businessId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  resourceType: 'room' | 'table' | 'service' | 'other';
  resourceId?: string;
  resourceName?: string;
  startTime: string;
  endTime: string;
  numberOfGuests: number;
  notes?: string;
  totalAmount?: number;
  depositAmount?: number;
}

export interface CheckAvailabilityRequest {
  businessId: string;
  resourceType: string;
  resourceId?: string;
  startTime: string;
  endTime: string;
  excludeReservationId?: string;
}
