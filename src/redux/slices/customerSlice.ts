import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '@/types/customer.types';

interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
  totalCount: number;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  totalCount: 0,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (
      state,
      action: PayloadAction<{ data: Customer[]; totalCount: number }>
    ) => {
      state.customers = action.payload.data;
      state.totalCount = action.payload.totalCount;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
      state.totalCount += 1;
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    removeCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(
        (c) => c.id !== action.payload
      );
      state.totalCount -= 1;
    },
    setSelectedCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCustomers,
  addCustomer,
  updateCustomer,
  removeCustomer,
  setSelectedCustomer,
  setLoading,
} = customerSlice.actions;
export default customerSlice.reducer;
