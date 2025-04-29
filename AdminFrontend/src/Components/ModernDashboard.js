import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  CalendarIcon, 
  ChartBarIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import RenewMemberShip from './RenewMemberShip';

export default function ModernDashboard({ searchedData }) {
  const [clients, setClients] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [upcomingRenewals, setUpcomingRenewals] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showRenew, setShowRenew] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const calculateRemainingDays = (subscriptionStart, leftDays) => {
    if (!subscriptionStart || !leftDays) return 0;
    const startDate = new Date(subscriptionStart);
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    return Math.max(0, leftDays - daysPassed);
  };

  useEffect(() => {
    fetchData();
  }, [searchedData]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const clientsResponse = await axios.get('https://egs-delhicombatadmin.onrender.com/api/dashboard');
      const renewalsResponse = await axios.get('https://egs-delhicombatadmin.onrender.com/api/upcomingRenewalUser');

      let filteredClients = clientsResponse.data;
      if (searchedData) {
        filteredClients = filteredClients.filter((client) =>
          client.firstName.toLowerCase().includes(searchedData.toLowerCase())
        );
      }

      // Calculate metrics with updated remaining days
      const processedClients = filteredClients.map(client => ({
        ...client,
        remainingDays: calculateRemainingDays(client.subscipSta, client.leftDays)
      }));

      const revenue = processedClients.reduce((sum, client) => sum + (client.amount || 0), 0);
      const active = processedClients.filter((client) => client.remainingDays > 0).length;

      setClients(processedClients);
      setTotalRevenue(revenue);
      setActiveMembers(active);
      setUpcomingRenewals(renewalsResponse.data.length);
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setEditFormData(client);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`https://egs-delhicombatadmin.onrender.com/api/renew/${id}`, editFormData);
      setEditingId(null);
      setEditFormData({});
      fetchData();
    } catch (err) {
      console.error('Error updating client:', err);
      alert('Failed to update client. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`https://egs-delhicombatadmin.onrender.com/api/delete/${id}`);
        fetchData();
      } catch (err) {
        console.error('Error deleting client:', err);
        alert('Failed to delete client. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRenew = (clientId) => {
    setSelectedClientId(clientId);
    setShowRenew(true);
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setShowDetails(true);
  };

  const stats = [
    { name: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: CurrencyDollarIcon },
    { name: 'Active Members', value: activeMembers, icon: UsersIcon },
    { name: 'Upcoming Renewals', value: upcomingRenewals, icon: CalendarIcon },
    { name: 'Total Clients', value: clients.length, icon: ChartBarIcon },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-6">
      {/* Client Details Modal */}
      {showDetails && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Client Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Member ID: <span className="font-medium text-gray-900">DC00{selectedClient.id}</span></p>
                    <p className="text-sm text-gray-600 mb-1">Name: <span className="font-medium text-gray-900">{selectedClient.firstName} {selectedClient.lastName}</span></p>
                    <p className="text-sm text-gray-600 mb-1">Email: <span className="font-medium text-gray-900">{selectedClient.email}</span></p>
                    <p className="text-sm text-gray-600 mb-1">Mobile: <span className="font-medium text-gray-900">{selectedClient.mobile}</span></p>
                    <p className="text-sm text-gray-600">Address: <span className="font-medium text-gray-900">{selectedClient.address}</span></p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Membership Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Package Type: <span className="font-medium text-gray-900">{selectedClient.packageType}</span></p>
                    <p className="text-sm text-gray-600 mb-1">Member Type: <span className="font-medium text-gray-900">{selectedClient.memberType}</span></p>
                    <p className="text-sm text-gray-600">Batch Time: <span className="font-medium text-gray-900">{selectedClient.batchTime}</span></p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Subscription Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Start Date: <span className="font-medium text-gray-900">{selectedClient.subscipSta}</span></p>
                    <p className="text-sm text-gray-600 mb-1">End Date: <span className="font-medium text-gray-900">{selectedClient.subscripEnd}</span></p>
                    <p className="text-sm text-gray-600 mb-1">Days Left: <span className={`font-medium ${selectedClient.remainingDays <= 7 ? 'text-red-600' : 'text-gray-900'}`}>{selectedClient.remainingDays}</span></p>
                    <p className="text-sm text-gray-600">Amount Paid: <span className="font-medium text-gray-900">₹{selectedClient.amount?.toLocaleString() || 0}</span></p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Transaction Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Transaction Date: <span className="font-medium text-gray-900">{selectedClient.transacDate}</span></p>
                    <p className="text-sm text-gray-600">Transaction Number: <span className="font-medium text-gray-900">{selectedClient.transacNum}</span></p>
                  </div>
                </div>

                {selectedClient.remarks && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Notes</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">{selectedClient.remarks}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
              <button
                onClick={() => handleRenew(selectedClient.id)}
                className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Renew Membership
              </button>
              <button
                onClick={() => {
                  setShowDetails(false);
                  handleEdit(selectedClient);
                }}
                className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Renew Modal */}
      {showRenew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-2xl mx-auto">
            <div className="flex justify-end">
              <button
                onClick={() => setShowRenew(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <RenewMemberShip id={selectedClientId} />
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="p-4 md:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="ml-4 md:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-base md:text-lg font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Clients Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Client List</h3>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="hidden md:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="hidden md:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Renewal Days Left
                  </th>
                  <th className="hidden md:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={client.remainingDays <= 7 && client.remainingDays > 0 ? 'bg-yellow-50' : ''}
                  >
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      DC00{client.id}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingId === client.id ? (
                        <input
                          type="text"
                          name="firstName"
                          value={editFormData.firstName || ''}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        `${client.firstName} ${client.lastName}`
                      )}
                    </td>
                    <td className="hidden md:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingId === client.id ? (
                        <input
                          type="text"
                          name="packageType"
                          value={editFormData.packageType || ''}
                          onChange={handleInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        client.packageType
                      )}
                    </td>
                    <td className="hidden md:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {client.subscipSta}
                    </td>
                    <td className={`px-3 md:px-6 py-4 whitespace-nowrap text-sm ${
                      client.remainingDays <= 7 && client.remainingDays > 0 
                        ? 'text-yellow-600 font-medium' 
                        : client.remainingDays <= 0 
                          ? 'text-red-600 font-medium'
                          : 'text-gray-900'
                    }`}>
                      {client.remainingDays}
                    </td>
                    <td className="hidden md:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{client.amount?.toLocaleString() || 0}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-wrap gap-2">
                        {editingId === client.id ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(client.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Save"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-900"
                              title="Cancel"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleViewDetails(client)}
                              className="text-gray-600 hover:text-gray-900"
                              title="View Details"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(client)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(client.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleRenew(client.id)}
                              className="text-blue-600 hover:text-blue-900 px-2 py-1 text-sm border border-blue-600 rounded"
                            >
                              Renew
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 