'use client';

import { useState } from 'react';
import { Calendar, Search, Plus, Filter, Download } from 'lucide-react';
import ConfirmationModal from '@/components/modals/ConfirmationModal';

interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  guests: number;
  notes?: string;
}

const mockReservations: Reservation[] = [
  {
    id: '1',
    customerName: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 234 567 8901',
    service: 'Deluxe Suite 101',
    date: '2024-12-25',
    time: '14:00',
    status: 'confirmed',
    guests: 2,
    notes: 'Anniversary celebration',
  },
  {
    id: '2',
    customerName: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1 234 567 8902',
    service: 'Table 5',
    date: '2024-12-24',
    time: '19:00',
    status: 'confirmed',
    guests: 4,
  },
  {
    id: '3',
    customerName: 'Carol White',
    email: 'carol@example.com',
    phone: '+1 234 567 8903',
    service: 'Deep Tissue Massage',
    date: '2024-12-26',
    time: '10:00',
    status: 'pending',
    guests: 1,
  },
  {
    id: '4',
    customerName: 'David Brown',
    email: 'david@example.com',
    phone: '+1 234 567 8904',
    service: 'Conference Room A',
    date: '2024-12-23',
    time: '09:00',
    status: 'completed',
    guests: 10,
  },
  {
    id: '5',
    customerName: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+1 234 567 8905',
    service: 'Standard Room 205',
    date: '2024-12-27',
    time: '15:00',
    status: 'cancelled',
    guests: 2,
  },
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [editFormData, setEditFormData] = useState<Reservation | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || reservation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEditClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setEditFormData({ ...reservation });
    setShowEditModal(true);
  };

  const handleCancelClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowCancelModal(true);
  };

  const handleEditSave = () => {
    if (editFormData) {
      setReservations(
        reservations.map((r) => (r.id === editFormData.id ? editFormData : r))
      );
      setShowEditModal(false);
      setEditFormData(null);
      setSelectedReservation(null);
    }
  };

  const handleCancelConfirm = () => {
    if (selectedReservation) {
      setReservations(
        reservations.map((r) =>
          r.id === selectedReservation.id ? { ...r, status: 'cancelled' } : r
        )
      );
      setShowCancelModal(false);
      setSelectedReservation(null);
    }
  };

  const handleExport = () => {
    const csvHeaders = ['Customer Name', 'Email', 'Phone', 'Service', 'Date', 'Time', 'Guests', 'Status', 'Notes'];
    const csvRows = filteredReservations.map((r) => [
      r.customerName,
      r.email,
      r.phone,
      r.service,
      r.date,
      r.time,
      r.guests.toString(),
      r.status,
      r.notes || '',
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reservations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {reservations.length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {reservations.filter((r) => r.status === 'confirmed').length}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-green-600"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {reservations.filter((r) => r.status === 'pending').length}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-yellow-600"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {reservations.filter((r) => r.status === 'completed').length}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-blue-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-5 w-5" />
                Export
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Reservation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.customerName}
                      </div>
                      <div className="text-sm text-gray-500">{reservation.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.date}</div>
                    <div className="text-sm text-gray-500">{reservation.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.guests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        reservation.status
                      )}`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(reservation)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancelClick(reservation)}
                      className="text-red-600 hover:text-red-900"
                      disabled={reservation.status === 'cancelled'}
                    >
                      {reservation.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Create Modal (Placeholder) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Create New Reservation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Reservation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Edit Reservation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={editFormData.customerName}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, customerName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  value={editFormData.service}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, service: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editFormData.date}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={editFormData.time}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editFormData.guests}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        guests: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      status: e.target.value as Reservation['status'],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={editFormData.notes || ''}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditFormData(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedReservation(null);
        }}
        onConfirm={handleCancelConfirm}
        title="Cancel Reservation"
        message={
          selectedReservation
            ? `Are you sure you want to cancel the reservation for ${selectedReservation.customerName}? This action cannot be undone.`
            : ''
        }
        confirmText="Yes, Cancel It"
        cancelText="Keep Reservation"
      />
    </div>
  );
}
