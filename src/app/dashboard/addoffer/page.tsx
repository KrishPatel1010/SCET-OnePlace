'use client';
import ExpandableCard from '@/app/offer/page';
import React, { useState } from 'react';

const AddOfferForm = () => {
  const [offerData, setOfferData] = useState({
    company: '',
    role: '',
    location: '',
    total_opening: '',
    drive: '',
    type: '',
    sector: '',
    salary: {
      min: '',
      max: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('salary.')) {
      const salaryField = name.split('.')[1];
      setOfferData(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value
        }
      }));
    } else {
      setOfferData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(offerData);
    // Submit logic here
  };

  return (
    <div className="min-h-screen font-inter text-blue-800 p-6 mt-10 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-3rem)] rounded-2xl">
        {/* Form Section - Scrollable */}
        <div className="lg:w-1/2 overflow-y-auto max-h-screen pb-10 mt-12">
          <form onSubmit={handleSubmit} className="bg-blue-50 shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center">Add New Offer</h2>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">
                Company ID
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={offerData.company}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={offerData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">
                Location ID
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={offerData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="total_opening" className="block text-sm font-semibold text-gray-700 mb-1">
                Total Openings
              </label>
              <input
                type="number"
                id="total_opening"
                name="total_opening"
                value={offerData.total_opening}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                required
              />
            </div>

            <div>
              <label htmlFor="drive" className="block text-sm font-semibold text-gray-700 mb-1">
                Drive Type
              </label>
              <select
                id="drive"
                name="drive"
                value={offerData.drive}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                required
              >
                <option value="">Select Drive Type</option>
                <option value="on campus">On Campus</option>
                <option value="off campus">Off Campus</option>
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-1">
                Offer Type
              </label>
              <select
                id="type"
                name="type"
                value={offerData.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                required
              >
                <option value="">Select Offer Type</option>
                <option value="internship">Internship</option>
                <option value="placement">Placement</option>
                <option value="internship and placement">Internship and Placement</option>
              </select>
            </div>

            <div>
              <label htmlFor="sector" className="block text-sm font-semibold text-gray-700 mb-1">
                Sector
              </label>
              <select
                id="sector"
                name="sector"
                value={offerData.sector}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                required
              >
                <option value="">Select Sector</option>
                <option value="IT">IT</option>
                <option value="Core">Core</option>
                <option value="Management">Management</option>
              </select>
            </div>

            <div>
              <label htmlFor="salary.min" className="block text-sm font-semibold text-gray-700 mb-1">
                Minimum Salary (₹)
              </label>
              <input
                type="number"
                id="salary.min"
                name="salary.min"
                value={offerData.salary.min}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="salary.max" className="block text-sm font-semibold text-gray-700 mb-1">
                Maximum Salary (₹)
              </label>
              <input
                type="number"
                id="salary.max"
                name="salary.max"
                value={offerData.salary.max}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              Add Offer
            </button>
          </form>
        </div>

        {/* ExpandableCard Section - Scrollable */}
        <div className="lg:w-1/2 h-[calc(100vh-3rem)] -mt-7.5 pb-10 ">
  <ExpandableCard/>
</div>
      </div>
    </div>
  );
};

export default AddOfferForm;