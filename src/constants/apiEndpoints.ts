const version = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiEndpoints = {
  BASE_URL: baseURL,

  // Auth endpoints
  LOGIN: `/${version}/auth/login`,
  SIGNUP: `/${version}/auth/signup`,
  FORGOT_PASSWORD: `/${version}/auth/forgot-password`,
  RESET_PASSWORD: `/${version}/auth/reset-password`,
  VERIFY_TOKEN: `/${version}/auth/verify-token`,
  LOGOUT: `/${version}/auth/logout`,
  REFRESH_TOKEN: `/${version}/auth/refresh-token`,

  // User endpoints
  GET_PROFILE: `/${version}/user/profile`,
  UPDATE_PROFILE: `/${version}/user/profile`,

  // Business endpoints
  GET_BUSINESSES: `/${version}/businesses`,
  GET_BUSINESS_BY_ID: (id: string) => `/${version}/businesses/${id}`,
  CREATE_BUSINESS: `/${version}/businesses`,
  UPDATE_BUSINESS: (id: string) => `/${version}/businesses/${id}`,
  DELETE_BUSINESS: (id: string) => `/${version}/businesses/${id}`,

  // Reservation endpoints
  GET_RESERVATIONS: `/${version}/reservations`,
  GET_RESERVATION_BY_ID: (id: string) => `/${version}/reservations/${id}`,
  CREATE_RESERVATION: `/${version}/reservations`,
  UPDATE_RESERVATION: (id: string) => `/${version}/reservations/${id}`,
  DELETE_RESERVATION: (id: string) => `/${version}/reservations/${id}`,
  UPDATE_RESERVATION_STATUS: (id: string) => `/${version}/reservations/${id}/status`,
  CHECK_AVAILABILITY: `/${version}/reservations/check-availability`,

  // Customer endpoints
  GET_CUSTOMERS: `/${version}/customers`,
  GET_CUSTOMER_BY_ID: (id: string) => `/${version}/customers/${id}`,
  CREATE_CUSTOMER: `/${version}/customers`,
  UPDATE_CUSTOMER: (id: string) => `/${version}/customers/${id}`,
  DELETE_CUSTOMER: (id: string) => `/${version}/customers/${id}`,

  // Dashboard endpoints
  GET_DASHBOARD_STATS: `/${version}/dashboard/stats`,
  GET_RECENT_RESERVATIONS: `/${version}/dashboard/recent-reservations`,
  GET_REVENUE_CHART: `/${version}/dashboard/revenue-chart`,
  GET_OCCUPANCY_CHART: `/${version}/dashboard/occupancy-chart`,
};
