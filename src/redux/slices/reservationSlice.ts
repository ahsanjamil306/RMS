import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Reservation } from '@/types/reservation.types';

interface ReservationFilters {
  status?: string[];
  dateRange?: { start: Date; end: Date };
  searchTerm?: string;
}

interface ReservationState {
  reservations: Reservation[];
  selectedReservation: Reservation | null;
  filters: ReservationFilters;
  viewMode: 'calendar' | 'list';
  isLoading: boolean;
  totalCount: number;
}

const initialState: ReservationState = {
  reservations: [],
  selectedReservation: null,
  filters: {},
  viewMode: 'calendar',
  isLoading: false,
  totalCount: 0,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setReservations: (
      state,
      action: PayloadAction<{ data: Reservation[]; totalCount: number }>
    ) => {
      state.reservations = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
      state.totalCount += 1;
    },
    updateReservation: (state, action: PayloadAction<Reservation>) => {
      const index = state.reservations.findIndex(
        (r) => r.id === action.payload.id
      );
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
    },
    removeReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(
        (r) => r.id !== action.payload
      );
      state.totalCount -= 1;
    },
    setSelectedReservation: (
      state,
      action: PayloadAction<Reservation | null>
    ) => {
      state.selectedReservation = action.payload;
    },
    setFilters: (state, action: PayloadAction<ReservationFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setViewMode: (state, action: PayloadAction<'calendar' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setReservations,
  addReservation,
  updateReservation,
  removeReservation,
  setSelectedReservation,
  setFilters,
  clearFilters,
  setViewMode,
  setLoading,
} = reservationSlice.actions;
export default reservationSlice.reducer;
