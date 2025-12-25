import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Business } from '@/types/business.types';

interface BusinessState {
  businesses: Business[];
  currentBusiness: Business | null;
  isLoading: boolean;
}

const initialState: BusinessState = {
  businesses: [],
  currentBusiness: null,
  isLoading: false,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setBusinesses: (state, action: PayloadAction<Business[]>) => {
      state.businesses = action.payload;
      if (!state.currentBusiness && action.payload.length > 0) {
        state.currentBusiness = action.payload[0];
      }
    },
    setCurrentBusiness: (state, action: PayloadAction<Business>) => {
      state.currentBusiness = action.payload;
    },
    addBusiness: (state, action: PayloadAction<Business>) => {
      state.businesses.push(action.payload);
    },
    updateBusiness: (state, action: PayloadAction<Business>) => {
      const index = state.businesses.findIndex(
        (b) => b.id === action.payload.id
      );
      if (index !== -1) {
        state.businesses[index] = action.payload;
      }
      if (state.currentBusiness?.id === action.payload.id) {
        state.currentBusiness = action.payload;
      }
    },
    removeBusiness: (state, action: PayloadAction<string>) => {
      state.businesses = state.businesses.filter(
        (b) => b.id !== action.payload
      );
      if (state.currentBusiness?.id === action.payload) {
        state.currentBusiness = state.businesses[0] || null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setBusinesses,
  setCurrentBusiness,
  addBusiness,
  updateBusiness,
  removeBusiness,
  setLoading,
} = businessSlice.actions;
export default businessSlice.reducer;
