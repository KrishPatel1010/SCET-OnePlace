'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, BookOpen, Award, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';


<Navbar/>
// Define the same interfaces from your Createprofile component
interface FormData {
  name: string;
  email: string;
  enrollment: string;
  dob: string;
  contact: string;
  gender: string;
  caste: string;
  profileImageUrl: string; // Added for profile picture
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

// Combined type for student data
type StudentProfile = FormData & AddressData & AcademicData;



const studentDataArray: StudentProfile[] = [
  {
    // Personal Info
    name: 'Anya Sharma',
    email: 'anya.sharma.ce21@scet.ac.in',
    enrollment: '21BECE001',
    dob: '2003-08-15',
    contact: '+91 98765 43210',
    gender: 'Female',
    caste: 'General',
    profileImageUrl: '', // Placeholder image URL
    
    // Address Info
    fullAddressLine: 'A-42, Silicon Apartments',
    area: 'Adajan',
    city: 'Surat',
    state: 'Gujarat',
    country: 'India',
    pinCode: '395009',

    // Academic Info
    passoutYear: '2025',
    semesterResults: ['8.5', '8.8', '9.1', '8.9', '9.2', '9.0'],
    tenthResult: '94.5%',
    tenthPassoutYear: '2019',
    qualificationType: 'twelfth',
    twelfthResult: '91.2%',
    twelfthPassoutYear: '2021',
    diplomaSemesterResults: [], // Empty as qualification is 12th
    diplomaPassoutYear: '',
    cgpa: '8.92',
    backlogs: '0',
  },
];


const UserProfile = () => {
  // For demonstration, we'll use the first student from the array.
  const student = studentDataArray[0];

  if (!student) {
    return <div>Loading profile...</div>;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter p-4 sm:p-6 lg:p-8 my-10">
      <motion.div
        className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 relative">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.img
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              src={student.profileImageUrl}
              alt="Profile Picture"
              variants={fadeIn}
            />
            <motion.div variants={fadeIn} className="text-center sm:text-left">
              <h1 className="text-4xl font-extrabold text-white">{student.name}</h1>
              <p className="text-blue-200 text-lg font-medium">{student.enrollment}</p>
            </motion.div>
          </div>

        </div>

        {/* Profile Body */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Contact & Personal Details */}
          <motion.div className="lg:col-span-1 space-y-8" variants={fadeIn}>
            {/* Contact Card */}
            <div className="p-6 bg-gray-50 rounded-2xl border">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{student.contact}</span>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                  <span>{`${student.fullAddressLine}, ${student.area}, ${student.city}, ${student.state} - ${student.pinCode}`}</span>
                </div>
              </div>
            </div>

            {/* Personal Details Card */}
            <div className="p-6 bg-gray-50 rounded-2xl border">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                  <span><strong>DOB:</strong> {student.dob}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
                  <span><strong>Gender:</strong> {student.gender}</span>
                </div>
                 <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-3 text-blue-500" />
                  <span><strong>Caste:</strong> {student.caste}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Academic Details */}
          <motion.div className="lg:col-span-2 space-y-8" variants={fadeIn}>
            <div className="p-6 bg-gray-50 rounded-2xl border">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Academic Record</h3>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
                  <div className="bg-blue-100 p-4 rounded-lg">
                      <p className="text-sm text-blue-800 font-semibold">CGPA</p>
                      <p className="text-2xl font-bold text-blue-600">{student.cgpa}</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                      <p className="text-sm text-green-800 font-semibold">Backlogs</p>
                      <p className="text-2xl font-bold text-green-600">{student.backlogs}</p>
                  </div>
                  <div className="bg-indigo-100 p-4 rounded-lg">
                      <p className="text-sm text-indigo-800 font-semibold">Passout Year</p>
                      <p className="text-2xl font-bold text-indigo-600">{student.passoutYear}</p>
                  </div>
                   <div className="bg-yellow-100 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800 font-semibold">10th Result</p>
                      <p className="text-2xl font-bold text-yellow-600">{student.tenthResult}</p>
                  </div>
              </div>

              {/* Semester Performance */}
              <div>
                <h4 className="font-bold text-gray-700 mb-3">Degree Semester Performance (SPI)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {student.semesterResults.map((spi, index) => (
                    <div key={index} className="border p-3 rounded-lg text-center">
                      <p className="text-xs font-semibold text-gray-500">Sem {index + 1}</p>
                      <p className="text-lg font-bold text-gray-700">{spi}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Previous Qualifications */}
              <div className="mt-8">
                 <h4 className="font-bold text-gray-700 mb-3">Previous Qualifications</h4>
                 <div className="space-y-4">
                    {/* 12th Grade Details */}
                    {student.qualificationType === 'twelfth' && (
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
                            <div>
                                <p className="font-bold text-gray-800">12th Grade</p>
                                <p className="text-sm text-gray-500">Passout Year: {student.twelfthPassoutYear}</p>
                            </div>
                            <p className="text-lg font-bold text-blue-600">{student.twelfthResult}</p>
                        </div>
                    )}

                    {/* Diploma Details */}
                     {student.qualificationType === 'diploma' && (
                        <div className="bg-white p-4 rounded-lg border">
                           <div className="flex items-center justify-between mb-3">
                             <div>
                                <p className="font-bold text-gray-800">Diploma</p>
                                <p className="text-sm text-gray-500">Passout Year: {student.diplomaPassoutYear}</p>
                            </div>
                           </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                               {student.diplomaSemesterResults.map((spi, index) => (
                                <div key={index} className="border p-2 rounded-md text-center bg-gray-50">
                                    <p className="text-xs font-semibold text-gray-500">Sem {index + 1}</p>
                                    <p className="text-md font-bold text-gray-700">{spi}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                    )}
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;