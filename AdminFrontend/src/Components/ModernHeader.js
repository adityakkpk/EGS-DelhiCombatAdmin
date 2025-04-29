import React, { useState } from "react";
import Logo from "./Logo.jpg";
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  CubeIcon, 
  CalendarIcon, 
  XMarkIcon, 
  TrashIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";
import ModernNewPackage from "./ModernNewPackage";
import ModernNewClient from "./ModernNewClient";
import ModernDashboard from "./ModernDashboard";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ModernHeader() {
  const [packages, setPackages] = useState();
  const [upcomingRenewalClicked, setUpcomingRenewalClicked] = useState(false);
  const [upcomingRenewalUser, setUpcomingRenewalUser] = useState();
  const [searchData, setSearchData] = useState(null);
  const [newPackageClicked, setNewPackageClicked] = useState(false);
  const [newClientClicked, setNewClientClicked] = useState(false);
  const [viewPackage, setViewPackage] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const upcomingRenewal = () => {
    setUpcomingRenewalClicked(!upcomingRenewalClicked);
    setMobileMenuOpen(false);
    axios
      .get("https://egs-delhicombatadmin.onrender.com/api/upcomingRenewalUser")
      .then((res) => {
        setUpcomingRenewalUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClickPackage = (id) => {
    if (window.confirm("Are you sure want to delete")) {
      setPackages(packages.filter((row) => row.id !== id));
      try {
        axios
          .delete("https://egs-delhicombatadmin.onrender.com/api/deletePackage/" + id)
          .then((res) => {
            alert("Successfully Deleted");
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = () => {
    window.location.reload();
  };

  const newPackageCli = () => {
    setNewPackageClicked(!newPackageClicked);
    setMobileMenuOpen(false);
  };

  const newClientCli = () => {
    setNewClientClicked(!newClientClicked);
    setMobileMenuOpen(false);
  };

  const viewPackageCl = () => {
    setViewPackage(!viewPackage);
    setMobileMenuOpen(false);
    axios
      .get("https://egs-delhicombatadmin.onrender.com/api/packages")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => console.log(err));
  };

  const ActionButtons = () => (
    <>
      <button
        onClick={newClientCli}
        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full md:w-auto"
      >
        <PlusIcon className="h-5 w-5" />
        <span>Add Client</span>
      </button>
      <button
        onClick={newPackageCli}
        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full md:w-auto"
      >
        <CubeIcon className="h-5 w-5" />
        <span>New Package</span>
      </button>
      <button
        onClick={viewPackageCl}
        className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full md:w-auto"
      >
        <CubeIcon className="h-5 w-5" />
        <span>View Packages</span>
      </button>
      <button
        onClick={upcomingRenewal}
        className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full md:w-auto"
      >
        <CalendarIcon className="h-5 w-5" />
        <span>Upcoming Renewal</span>
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={Logo} alt="DC" className="h-8 w-auto md:h-12" onClick={() => setNewClientClicked(false)} />
              <h1 className="ml-4 text-lg md:text-2xl font-bold text-gray-900">Welcome to Dashboard</h1>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pl-10"
                  onChange={(val) => setSearchData(val.target.value)}
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pl-10"
                onChange={(val) => setSearchData(val.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-2 space-y-2"
              >
                <ActionButtons />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex space-x-4 py-4">
            <ActionButtons />
          </div>
        </div>
      </header>

      {/* Modal Overlays */}
      <AnimatePresence>
        {viewPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-4 md:p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Packages</h2>
                <button
                  onClick={() => setViewPackage(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S. No.</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Type</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {packages?.map((pkg) => (
                      <tr key={pkg.id}>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.id}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.type}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.duration}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.price}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => handleDeleteClickPackage(pkg.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        {newPackageClicked ? (
          <ModernNewPackage setNewPackageClicked={setNewPackageClicked} />
        ) : newClientClicked ? (
          <ModernNewClient setNewClientClicked={setNewClientClicked} />
        ) : (
          <ModernDashboard searchedData={searchData} />
        )}
      </main>
    </div>
  );
} 