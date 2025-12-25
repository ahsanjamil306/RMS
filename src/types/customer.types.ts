export interface Customer {
  id: string;
  businessId: string;
  fullName: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  dateOfBirth?: string;
  notes?: string;
  totalReservations: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFormData {
  businessId: string;
  fullName: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  dateOfBirth?: string;
  notes?: string;
}
