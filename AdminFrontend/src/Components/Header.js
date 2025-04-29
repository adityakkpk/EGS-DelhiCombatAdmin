import React, { useState } from "react";
import Logo from "./Logo.jpg";
import { SearchIcon, PlusIcon, PackageIcon, CalendarIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import NewPackage from "./NewPackage";
import NewClient from "./NewClient";
import DashBoard from "./DashBoard";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [packages, setPackages] = useState();
  const [upcomingRenewalClicked, setUpcomingRenewalClicked] = useState(false);
  const [upcomingRenewalUser, setUpcomingRenewalUser] = useState();
  const [searchData, setSearchData] = useState(null);
  const [newPackageClicked, setNewPackageClicked] = useState(false);
  const [newClientClicked, setNewClientClicked] = useState(false);
  const [viewPackage, setViewPackage] = useState(false);

  const upcomingRenewal = () => {
    setUpcomingRenewalClicked(!upcomingRenewalClicked);
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
  };

  const newClientCli = () => {
    setNewClientClicked(!newClientClicked);
  };

  const viewPackageCl = () => {
    setViewPackage(!viewPackage);
    axios
      .get("https://egs-delhicombatadmin.onrender.com/api/packages")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={Logo} alt="DC" className="h-12 w-auto" onClick={() => setNewClientClicked(false)} />
              <h1 className="ml-4 text-2xl font-bold text-gray-900">Welcome to Dashboard</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="input-field pl-10 pr-4"
                  onChange={(val) => setSearchData(val.target.value)}
                />
                <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 py-4">
            <button
              onClick={newClientCli}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Client</span>
            </button>
            <button
              onClick={newPackageCli}
              className="btn-primary flex items-center space-x-2"
            >
              <PackageIcon className="h-5 w-5" />
              <span>New Package</span>
            </button>
            <button
              onClick={viewPackageCl}
              className="btn-secondary flex items-center space-x-2"
            >
              <PackageIcon className="h-5 w-5" />
              <span>View Packages</span>
            </button>
            <button
              onClick={upcomingRenewal}
              className="btn-secondary flex items-center space-x-2"
            >
              <CalendarIcon className="h-5 w-5" />
              <span>Upcoming Renewal</span>
            </button>
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
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Packages</h2>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S. No.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {packages?.map((pkg) => (
                      <tr key={pkg.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {newPackageClicked ? (
          <NewPackage setNewPackageClicked={setNewPackageClicked} />
        ) : newClientClicked ? (
          <NewClient setNewClientClicked={setNewClientClicked} />
        ) : (
          <DashBoard searchedData={searchData} />
        )}
      </main>
    </div>
  );
}
