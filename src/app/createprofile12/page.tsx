
'use client';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import type { CredentialResponse } from '@react-oauth/google';

// Define interfaces for TypeScript
interface FormData {
  name: string;
  email: string;
  enrollment: string;
  dob: string;
  contact: string;
  gender: string;
  caste: string;
}

interface AddressData {
  fullAddressLine: string;
  area: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

interface AcademicData {
  passoutYear: string;
  semesterResults: string[];
  tenthResult: string;
  tenthPassoutYear: string;
  qualificationType: 'twelfth' | 'diploma' | '';
  twelfthResult: string;
  twelfthPassoutYear: string;
  diplomaSemesterResults: string[];
  diplomaPassoutYear: string;
  cgpa: string;
  backlogs: string;
}

// Extend JwtPayload to include name and email
interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

const Createprofile = () => {
  const router = useRouter();
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    enrollment: '',
    dob: '',
    contact: '',
    gender: '',
    caste: '',
  });
  const [addressData, setAddressData] = useState<AddressData>({
    fullAddressLine: '',
    area: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  });
  const [academicData, setAcademicData] = useState<AcademicData>({
    passoutYear: '',
    semesterResults: [],
    tenthResult: '',
    tenthPassoutYear: '',
    qualificationType: '',
    twelfthResult: '',
    twelfthPassoutYear: '',
    diplomaSemesterResults: Array(6).fill(''),
    diplomaPassoutYear: '',
    cgpa: '',
    backlogs: '',
  });
  const [showAddress, setShowAddress] = useState(false);
  const [showAcademic, setShowAcademic] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleAcademicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAcademicData({ ...academicData, [name]: value });
  };

  const handleSemesterChange = (index: number, value: string) => {
    const updatedResults = [...academicData.semesterResults];
    updatedResults[index] = value;
    setAcademicData({ ...academicData, semesterResults: updatedResults });
  };

  const handleDiplomaSemesterChange = (index: number, value: string) => {
    const updatedResults = [...academicData.diplomaSemesterResults];
    updatedResults[index] = value;
    setAcademicData({ ...academicData, diplomaSemesterResults: updatedResults });
  };

  const handleQualificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qualificationType = e.target.value as 'twelfth' | 'diploma' | '';
    setAcademicData({
      ...academicData,
      qualificationType,
      twelfthResult: qualificationType !== 'twelfth' ? '' : academicData.twelfthResult,
      twelfthPassoutYear: qualificationType !== 'twelfth' ? '' : academicData.twelfthPassoutYear,
      diplomaSemesterResults: qualificationType !== 'diploma' ? Array(6).fill('') : academicData.diplomaSemesterResults,
      diplomaPassoutYear: qualificationType !== 'diploma' ? '' : academicData.diplomaPassoutYear,
    });
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (idToken) {
      const decoded = jwtDecode<CustomJwtPayload>(idToken);
      setUser(decoded);
      setToken(idToken);
      setFormData((prev) => ({
        ...prev,
        name: decoded.name || '',
        email: decoded.email || '',
      }));
    } else {
      console.error('No credential returned from Google login.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/student/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, ...addressData, ...academicData, token }),
    });

    const data = await res.json();
    console.log('✅ Backend response:', data);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('google-user');
    const storedToken = localStorage.getItem('google-token');
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser) as CustomJwtPayload;
      setUser(parsedUser);
      setToken(storedToken);
      setFormData((prev) => ({
        ...prev,
        name: parsedUser.name || '',
        email: parsedUser.email || '',
      }));
    }
  }, []);

  // Calculate number of semesters based on passout year
  const calculateSemesters = (passoutYear: string): number => {
    const currentYear = 2025;
    const passout = parseInt(passoutYear, 10);
    if (isNaN(passout) || passout < currentYear) {
      return 8; // Assume all semesters completed if passout year is in the past or invalid
    }
    const yearsRemaining = passout - currentYear;
    return Math.max(2, 8 - yearsRemaining * 2); // At least 2 semesters, up to 8
  };

  // Update semesterResults array when passoutYear changes
  useEffect(() => {
    if (academicData.passoutYear) {
      const numSemesters = calculateSemesters(academicData.passoutYear);
      const currentResults = academicData.semesterResults || [];
      const updatedResults = Array(numSemesters).fill('');
      for (let i = 0; i < Math.min(currentResults.length, numSemesters); i++) {
        updatedResults[i] = currentResults[i] || '';
      }
      setAcademicData((prev) => ({ ...prev, semesterResults: updatedResults }));
    }
  }, [academicData.passoutYear]);

  return (
    <>
      {/* Overlay Login Prompt */}
      {!user && (
        <motion.div
          className="fixed inset-0 z-[10000] flex justify-center items-center backdrop-blur-md bg-black/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/90 p-6 rounded-xl shadow-lg max-w-md w-full mx-4 text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              🚨 Please Sign In First
            </motion.h1>
            <motion.p
              className="text-gray-700 mb-6 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              To continue creating your student profile, sign in with your SCET Google account and unlock your personalized placement journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log('❌ Login Failed')} />
            </motion.div>
          </div>
        </motion.div>
      )}

      <div className="w-full max-w-4xl mx-auto mt-32 p-6 bg-blue-200 shadow rounded relative z-10 space-y-4">
        {!showAddress && !showAcademic ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-white text-center">Student Profile</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="enrollment" className="block text-sm font-medium text-white mb-1">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  id="enrollment"
                  name="enrollment"
                  value={formData.enrollment}
                  onChange={handleChange}
                  placeholder="Enrollment Number"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-white mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-white mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-white mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-white text-gray-700"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="caste" className="block text-sm font-medium text-white mb-1">
                  Caste
                </label>
                <select
                  id="caste"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-white text-gray-700"
                >
                  <option value="">Select Caste</option>
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                  <option value="SCBC">SCBC</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setShowAddress(true)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Next
              </button>
            </form>
          </>
        ) : showAddress ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-white text-center">Address Details</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label htmlFor="fullAddressLine" className="block text-sm font-medium text-white mb-1">
                  Full Address Line
                </label>
                <input
                  type="text"
                  id="fullAddressLine"
                  name="fullAddressLine"
                  value={addressData.fullAddressLine}
                  onChange={handleAddressChange}
                  placeholder="Full Address Line"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-white mb-1">
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={addressData.area}
                  onChange={handleAddressChange}
                  placeholder="Area"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-white mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-white mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={addressData.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={addressData.country}
                  onChange={handleAddressChange}
                  placeholder="Country"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="pinCode" className="block text-sm font-medium text-white mb-1">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={addressData.pinCode}
                  onChange={handleAddressChange}
                  placeholder="Pin Code"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddress(false)}
                  className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddress(false);
                    setShowAcademic(true);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-white text-center">Academic Details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="passoutYear" className="block text-sm font-medium text-white mb-1">
                  Degree Passout Year
                </label>
                <input
                  type="number"
                  id="passoutYear"
                  name="passoutYear"
                  value={academicData.passoutYear}
                  onChange={handleAcademicChange}
                  placeholder="Passout Year (e.g., 2025)"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {academicData.semesterResults.map((result, index) => (
                  <div key={index}>
                    <label htmlFor={`semester${index + 1}`} className="block text-sm font-medium text-white mb-1">
                      Sem {index + 1} SPI
                    </label>
                    <input
                      type="text"
                      id={`semester${index + 1}`}
                      value={result}
                      onChange={(e) => handleSemesterChange(index, e.target.value)}
                      placeholder={`Sem ${index + 1} SPI`}
                      className="w-full p-2 border rounded bg-white text-gray-700"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="tenthResult" className="block text-sm font-medium text-white mb-1">
                  10th Result (e.g., Percentage)
                </label>
                <input
                  type="text"
                  id="tenthResult"
                  name="tenthResult"
                  value={academicData.tenthResult}
                  onChange={handleAcademicChange}
                  placeholder="10th Result"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="tenthPassoutYear" className="block text-sm font-medium text-white mb-1">
                  10th Passout Year
                </label>
                <input
                  type="number"
                  id="tenthPassoutYear"
                  name="tenthPassoutYear"
                  value={academicData.tenthPassoutYear}
                  onChange={handleAcademicChange}
                  placeholder="10th Passout Year (e.g., 2018)"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white mb-1">Additional Qualification</label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="qualificationTwelfth"
                      name="qualificationType"
                      value="twelfth"
                      checked={academicData.qualificationType === 'twelfth'}
                      onChange={handleQualificationChange}
                      className="h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="qualificationTwelfth" className="text-sm font-medium text-white">
                      Completed 12th Grade
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="qualificationDiploma"
                      name="qualificationType"
                      value="diploma"
                      checked={academicData.qualificationType === 'diploma'}
                      onChange={handleQualificationChange}
                      className="h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="qualificationDiploma" className="text-sm font-medium text-white">
                      Completed Diploma
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="qualificationNone"
                      name="qualificationType"
                      value=""
                      checked={academicData.qualificationType === ''}
                      onChange={handleQualificationChange}
                      className="h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="qualificationNone" className="text-sm font-medium text-white">
                      None
                    </label>
                  </div>
                </div>
              </div>
              {academicData.qualificationType === 'twelfth' && (
                <>
                  <div>
                    <label htmlFor="twelfthResult" className="block text-sm font-medium text-white mb-1">
                      12th Result (e.g., Percentage)
                    </label>
                    <input
                      type="text"
                      id="twelfthResult"
                      name="twelfthResult"
                      value={academicData.twelfthResult}
                      onChange={handleAcademicChange}
                      placeholder="12th Result"
                      className="w-full p-2 border rounded bg-white text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="twelfthPassoutYear" className="block text-sm font-medium text-white mb-1">
                      12th Passout Year
                    </label>
                    <input
                      type="number"
                      id="twelfthPassoutYear"
                      name="twelfthPassoutYear"
                      value={academicData.twelfthPassoutYear}
                      onChange={handleAcademicChange}
                      placeholder="12th Passout Year (e.g., 2020)"
                      className="w-full p-2 border rounded bg-white text-gray-700"
                    />
                  </div>
                </>
              )}
              {academicData.qualificationType === 'diploma' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {academicData.diplomaSemesterResults.map((result, index) => (
                      <div key={index}>
                        <label htmlFor={`diplomaSemester${index + 1}`} className="block text-sm font-medium text-white mb-1">
                          Diploma Sem {index + 1} SPI
                        </label>
                        <input
                          type="text"
                          id={`diplomaSemester${index + 1}`}
                          value={result}
                          onChange={(e) => handleDiplomaSemesterChange(index, e.target.value)}
                          placeholder={`Diploma Sem ${index + 1} SPI`}
                          className="w-full p-2 border rounded bg-white text-gray-700"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="diplomaPassoutYear" className="block text-sm font-medium text-white mb-1">
                      Diploma Passout Year
                    </label>
                    <input
                      type="number"
                      id="diplomaPassoutYear"
                      name="diplomaPassoutYear"
                      value={academicData.diplomaPassoutYear}
                      onChange={handleAcademicChange}
                      placeholder="Diploma Passout Year (e.g., 2020)"
                      className="w-full p-2 border rounded bg-white text-gray-700"
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="cgpa" className="block text-sm font-medium text-white mb-1">
                  Overall CGPA
                </label>
                <input
                  type="text"
                  id="cgpa"
                  name="cgpa"
                  value={academicData.cgpa}
                  onChange={handleAcademicChange}
                  placeholder="Overall CGPA"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="backlogs" className="block text-sm font-medium text-white mb-1">
                  Number of Backlogs
                </label>
                <input
                  type="text"
                  id="backlogs"
                  name="backlogs"
                  value={academicData.backlogs}
                  onChange={handleAcademicChange}
                  placeholder="Backlogs"
                  className="w-full p-2 border rounded bg-white text-gray-700"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddress(true);
                    setShowAcademic(false);
                  }}
                  className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Submit Profile
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Createprofile;
