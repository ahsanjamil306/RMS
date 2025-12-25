export interface Business {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'spa' | 'salon' | 'other';
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  logo?: string;
  settings: {
    timezone: string;
    currency: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    maxAdvanceBooking: number; // days
    minAdvanceBooking: number; // hours
    cancellationPolicy: string;
  };
  ownerId: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface BusinessFormData {
  name: string;
  type: 'hotel' | 'restaurant' | 'spa' | 'salon' | 'other';
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  logo?: string;
  settings?: {
    timezone: string;
    currency: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    maxAdvanceBooking: number;
    minAdvanceBooking: number;
    cancellationPolicy: string;
  };
}
