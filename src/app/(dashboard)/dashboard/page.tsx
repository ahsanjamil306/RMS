'use client';

import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { currentBusiness } = useAppSelector((state) => state.business);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<any>(null);

  const reservationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Reservations',
        data: [65, 78, 90, 81, 96, 105, 134, 142, 138, 145, 152, 165],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [12500, 15000, 18000, 16500, 19000, 22000, 28000, 31000, 29500, 34500, 36000, 38500],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const occupancyData = {
    labels: ['Occupied', 'Available'],
    datasets: [
      {
        label: 'Occupancy Rate',
        data: [78.5, 21.5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(229, 231, 235, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(229, 231, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const recentReservations = [
    {
      id: 1,
      customerName: 'Alice Johnson',
      service: 'Deluxe Suite 101',
      date: 'Dec 25, 2024',
      time: '2:00 PM',
      status: 'Confirmed',
      guests: 2,
      phone: '+1 (555) 123-4567',
      email: 'alice.johnson@example.com',
      notes: 'Anniversary celebration, requested flowers',
    },
    {
      id: 2,
      customerName: 'Bob Smith',
      service: 'Table 5',
      date: 'Dec 24, 2024',
      time: '7:00 PM',
      status: 'Confirmed',
      guests: 4,
      phone: '+1 (555) 234-5678',
      email: 'bob.smith@example.com',
      notes: 'Allergic to peanuts',
    },
    {
      id: 3,
      customerName: 'Carol White',
      service: 'Deep Tissue Massage',
      date: 'Dec 26, 2024',
      time: '10:00 AM',
      status: 'Pending',
      guests: 1,
      phone: '+1 (555) 345-6789',
      email: 'carol.white@example.com',
      notes: 'First time customer',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Reservations</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">145</p>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">$34,500</p>
          <p className="text-sm text-green-600 mt-2">+8% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Occupancy Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">78.5%</p>
          <p className="text-sm text-green-600 mt-2">+5% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Customers</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">234</p>
          <p className="text-sm text-green-600 mt-2">+18 new this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Reservations Trend</h2>
          <div className="h-80">
            <Line data={reservationsData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Revenue</h2>
          <div className="h-80">
            <Bar data={revenueData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Occupancy Rate</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={occupancyData} options={chartOptions} />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reservations</h2>
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={() => setSelectedReservation(reservation)}
              >
                <div>
                  <p className="font-medium">{reservation.customerName} - {reservation.service}</p>
                  <p className="text-sm text-gray-600">{reservation.date} at {reservation.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  reservation.status === 'Confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {reservation.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedReservation && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Reservation Details</h2>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Customer Name</h3>
                  <p className="text-lg text-gray-900">{selectedReservation.customerName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    selectedReservation.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedReservation.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Service</h3>
                  <p className="text-lg text-gray-900">{selectedReservation.service}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Number of Guests</h3>
                  <p className="text-lg text-gray-900">{selectedReservation.guests}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                  <p className="text-lg text-gray-900">{selectedReservation.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Time</h3>
                  <p className="text-lg text-gray-900">{selectedReservation.time}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                <p className="text-lg text-gray-900">{selectedReservation.phone}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-lg text-gray-900">{selectedReservation.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                <p className="text-gray-900">{selectedReservation.notes}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Reservation
                </button>
                <button
                  onClick={() => {
                    setReservationToCancel(selectedReservation);
                    setShowCancelModal(true);
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setReservationToCancel(null);
        }}
        onConfirm={() => {
          setShowCancelModal(false);
          setReservationToCancel(null);
          setSelectedReservation(null);
        }}
        title="Cancel Reservation"
        message={
          reservationToCancel
            ? `Are you sure you want to cancel the reservation for ${reservationToCancel.customerName}? This action cannot be undone.`
            : ''
        }
        confirmText="Yes, Cancel It"
        cancelText="Keep Reservation"
      />
    </div>
  );
}
