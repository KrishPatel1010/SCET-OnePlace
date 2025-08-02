'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandableCard from '@/app/offer/page';

const AddCompany = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    logo: '',
    link: '',
    description: '',
    contact: ''
  });

  const [addressData, setAddressData] = useState({
    address_line: '',
    area: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const currentStep = showAddressForm ? 2 : 1;

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...companyData, address: addressData });
    // TODO: Replace console.log with API call
  };

  // Animation variants for form sections
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen flex font-inter">
      {/* Left 60% - Form Section */}
      <div className="w-full lg:w-3/5 bg-white flex items-center justify-center p-4 lg:p-8 relative z-10 my-8">
        <motion.div
          className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-white shadow-2xl rounded-3xl space-y-6 transform transition-all duration-500 ease-in-out border-b-4 border-blue-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">
            {currentStep === 1 ? 'Company Details' : 'Company Address'}
          </h2>

          <AnimatePresence mode="wait">
            {/* Company Details Section */}
            {currentStep === 1 && (
              <motion.form
                key="company-form"
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={companyData.name}
                    onChange={handleCompanyChange}
                    placeholder="Company Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="logo" className="block text-sm font-semibold text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    id="logo"
                    name="logo"
                    value={companyData.logo}
                    onChange={handleCompanyChange}
                    placeholder="Logo URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="link" className="block text-sm font-semibold text-gray-700 mb-1">
                    Website Link
                  </label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    value={companyData.link}
                    onChange={handleCompanyChange}
                    placeholder="Website Link"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={companyData.description}
                    onChange={handleCompanyChange}
                    placeholder="Description"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-semibold text-gray-700 mb-1">
                    Contact
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={companyData.contact}
                    onChange={handleCompanyChange}
                    placeholder="Contact"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddressForm(true)}
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
                >
                  Next
                </button>
              </motion.form>
            )}

            {/* Address Details Section */}
            {currentStep === 2 && (
              <motion.form
                key="address-form"
                onSubmit={handleSubmit}
                className="space-y-5"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div>
                  <label htmlFor="address_line" className="block text-sm font-semibold text-gray-700 mb-1">
                    Address Line
                  </label>
                  <input
                    type="text"
                    id="address_line"
                    name="address_line"
                    value={addressData.address_line}
                    onChange={handleAddressChange}
                    placeholder="Address Line"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-1">
                    Area
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={addressData.area}
                    onChange={handleAddressChange}
                    placeholder="Area"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={addressData.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={addressData.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={addressData.country}
                    onChange={handleAddressChange}
                    placeholder="Country"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={addressData.pincode}
                    onChange={handleAddressChange}
                    placeholder="Pincode"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 bg-gray-50"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="w-full py-3 px-6 bg-gray-300 text-gray-800 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
                  >
                    Submit Company
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right 40% - Image & Stepper Section */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-500 to-blue-700 flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Dynamic Image - Using placeholder images */}
        <motion.img
          key={currentStep}
          src={currentStep === 1 ? '/company-details.png' : '/company-address.png'}
          alt={currentStep === 1 ? 'Company details illustration' : 'Company address illustration'}
          className="w-full h-auto rounded-xl object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/600x800/2563EB/FFFFFF?text=Company+${currentStep === 1 ? 'Details' : 'Address'}`;
          }}
        />

        {/* Stepper Indicator */}
        <div className="flex space-x-4 mt-12">
          {[1, 2].map((stepNum) => (
            <div
              key={stepNum}
              className={`w-5 h-5 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center
                ${currentStep === stepNum ? 'bg-white scale-125 shadow-md' : 'bg-blue-300'}
              `}
            >
              {currentStep > stepNum && (
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          ))}
        </div>
        <div className="text-white text-lg font-semibold mt-4">
          Step {currentStep} of 2
        </div>
      </div>
    
    </div>
  );
};

export default AddCompany;