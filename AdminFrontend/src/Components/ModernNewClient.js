import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function ModernNewClient({ setNewClientClicked }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobile: "",
    email: "",
    membershipType: "",
    packageType: "",
    amount: "",
    transactionDate: "",
    transactionNumber: "",
    subscriptionStart: "",
    batchTime: "",
    remarks: "",
  });

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("https://egs-delhicombatadmin.onrender.com/api/packages");
      setPackages(response.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First create the new client
      const clientData = {
        fName: formData.firstName,
        lName: formData.lastName,
        address: formData.address,
        mobile: formData.mobile,
        email: formData.email,
        amount: formData.amount,
        transacDate: formData.transactionDate,
        transacNum: formData.transactionNumber,
        subscripSta: formData.subscriptionStart,
        subscripHist: "No History",
        batchTime: formData.batchTime,
        memeberShipType: formData.membershipType,
        remarks: formData.remarks,
        packageType: formData.packageType
      };

      const response = await axios.post("https://egs-delhicombatadmin.onrender.com/api/newClient", clientData);

      if (response.data === "Success") {
        // Then handle the membership renewal
        await axios.post("https://egs-delhicombatadmin.onrender.com/api/renewMemberShip", {
          fName: formData.firstName,
          mobile: formData.mobile,
          packageType: formData.packageType,
          memeberShipType: formData.membershipType,
          subscripSta: formData.subscriptionStart,
        });

        alert("Client added successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error adding client:", err);
      alert("Failed to add client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto relative top-[18rem] md:top-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Client</h2>
          <button
            onClick={() => setNewClientClicked(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Membership Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Membership Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Membership Type</label>
                <select
                  name="membershipType"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.membershipType}
                  onChange={handleInputChange}
                >
                  <option value="">Select type</option>
                  <option value="GS">Group Session</option>
                  <option value="PT">Personal Training</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Package Type</label>
                <select
                  name="packageType"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.packageType}
                  onChange={handleInputChange}
                >
                  <option value="">Select package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.duration}>
                      {pkg.type} - {pkg.duration} (₹{pkg.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
                <input
                  type="number"
                  name="amount"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction Date</label>
                <input
                  type="date"
                  name="transactionDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.transactionDate}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction Number</label>
                <input
                  type="text"
                  name="transactionNumber"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.transactionNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subscription Start Date</label>
                <input
                  type="date"
                  name="subscriptionStart"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.subscriptionStart}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Batch Time</label>
                <input
                  type="text"
                  name="batchTime"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.batchTime}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea
                  name="remarks"
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={formData.remarks}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setNewClientClicked(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 