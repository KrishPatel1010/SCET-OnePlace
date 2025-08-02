'use client';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="relative z-10 p-4 mt-10 sm:p-6 md:p-10 text-white min-h-screen flex flex-col gap-6">
      {/* Header Section */}
      <section className="rounded-xl bg-blue-700 bg-opacity-80 p-7 md:p-8 shadow-lg">
        <h1 className="text-4xl font-bold">👋 Welcome, student!</h1>
        <p className="mt-3 text-base sm:text-lg">
          Final Year | Computer Science | SCET
        </p>
        <p className="text-sm sm:text-base text-black">Enrollment: 21XX123456</p>
      </section>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 flex-grow">
        {/* Applied: spans 2 cols and 2 rows */}
        <div className="md:col-span-2 md:row-span-2 bg-blue-700/30 backdrop-blur-sm p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-white">🎯 Applied</h2>
          <p className="text-white">
            You have applied to 5 companies. Stay updated for interview schedules.
          </p>
        </div>

        {/* Notifications */}
        <div className="bg-blue-700/30 backdrop-blur-sm p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-white">🔔 Notifications</h2>
          <ul className="text-white space-y-2">
            <li>📢 Infosys drive open — apply by 5th Aug</li>
            <li>✅ Resume shortlisted by TCS</li>
          </ul>
        </div>

        {/* Schedule */}
        <div className="bg-blue-700/30 backdrop-blur-sm p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-white">📅 Schedule</h2>
          <ul className="text-white space-y-2">
            <li>🕘 Wipro Interview - 2nd Aug @10:00AM</li>
            <li>📤 Resume deadline - 4th Aug</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;