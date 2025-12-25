export interface DashboardStats {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  completedReservations: number;
  cancelledReservations: number;
  totalRevenue: number;
  averageReservationValue: number;
  occupancyRate: number;
  totalCustomers: number;
  newCustomersThisMonth: number;
}

export interface RecentReservation {
  id: string;
  customerName: string;
  resourceName: string;
  startTime: string;
  status: string;
  totalAmount?: number;
}

export interface RevenueChartData {
  labels: string[];
  data: number[];
}

export interface OccupancyChartData {
  labels: string[];
  data: number[];
}
