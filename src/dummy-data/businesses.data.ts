import type { Business } from '@/types/business.types';

export const dummyBusinesses: Business[] = [
  {
    id: '1',
    name: 'Grand Hotel',
    type: 'hotel',
    email: 'contact@grandhotel.com',
    phone: '+1234567890',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001',
    },
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Grand Hotel',
    settings: {
      timezone: 'America/New_York',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      maxAdvanceBooking: 365,
      minAdvanceBooking: 2,
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    },
    ownerId: '1',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Bella Restaurant',
    type: 'restaurant',
    email: 'info@bellarestaurant.com',
    phone: '+1234567891',
    address: {
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zipCode: '90001',
    },
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Bella Restaurant',
    settings: {
      timezone: 'America/Los_Angeles',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      maxAdvanceBooking: 90,
      minAdvanceBooking: 1,
      cancellationPolicy: 'Please cancel at least 2 hours in advance',
    },
    ownerId: '1',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Serenity Spa',
    type: 'spa',
    email: 'hello@serenityspa.com',
    phone: '+1234567892',
    address: {
      street: '789 Wellness Blvd',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33101',
    },
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Serenity Spa',
    settings: {
      timezone: 'America/New_York',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      maxAdvanceBooking: 60,
      minAdvanceBooking: 4,
      cancellationPolicy: 'Cancellations must be made 24 hours in advance',
    },
    ownerId: '1',
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
];

export const mockGetBusinessesResponse = {
  Data: {
    Items: dummyBusinesses,
    TotalCount: dummyBusinesses.length,
  },
  Success: true,
  ResponseMessage: 'Businesses retrieved successfully',
};

export const mockGetBusinessByIdResponse = (id: string) => ({
  Data: dummyBusinesses.find((b) => b.id === id) || dummyBusinesses[0],
  Success: true,
  ResponseMessage: 'Business retrieved successfully',
});
