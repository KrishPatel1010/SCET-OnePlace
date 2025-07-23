'use client';

import React from 'react';
import {
  Briefcase,
  UserPlus,
  FileText,
  CheckCircle,
  ClipboardList,
  Megaphone,
  Handshake,
} from 'lucide-react';

const steps = [
  {
    title: 'Student Registration & Preparation',
    icon: <UserPlus className="h-6 w-6 text-white" />,
    color: 'bg-blue-600',
  },
  {
    title: 'Company Invitation & Registration',
    icon: <Megaphone className="h-6 w-6 text-white" />,
    color: 'bg-green-600',
  },
  {
    title: 'Job Posting & Pre-Placement Talk',
    icon: <Briefcase className="h-6 w-6 text-white" />,
    color: 'bg-yellow-500',
  },
  {
    title: 'Student Application & Shortlisting',
    icon: <ClipboardList className="h-6 w-6 text-white" />,
    color: 'bg-purple-600',
  },
  {
    title: 'Assessments & Interviews',
    icon: <FileText className="h-6 w-6 text-white" />,
    color: 'bg-red-500',
  },
  {
    title: 'Final Selection & Offer Letters',
    icon: <CheckCircle className="h-6 w-6 text-white" />,
    color: 'bg-indigo-600',
  },
  {
    title: 'Acceptance, Joining, and Post-Placement Support',
    icon: <Handshake className="h-6 w-6 text-white" />,
    color: 'bg-teal-600',
  },
];

export default function TNPWorkflow() {
  return (
    <section className="py-16 px-4 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 md:mb-16">TNP Workflow Roadmap</h2>

        {/* Desktop Version */}
        <div className="hidden md:grid md:grid-cols-7 gap-6 relative">
          {/* Connecting Line */}
          <div className="absolute top-10 left-0 w-full h-1 bg-gray-300 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div className={`rounded-full p-4 ${step.color} shadow-lg`}>
                {step.icon}
              </div>
              <div className="mt-4 text-sm font-medium text-gray-700 w-32">{step.title}</div>
            </div>
          ))}
        </div>

        {/* Mobile Version */}
        <div className="md:hidden w-full overflow-x-auto pb-4">
          <div className="flex w-max min-w-full px-4 space-x-8">
            {steps.map((step, index) => (
              <div key={index} className="flex-shrink-0 flex flex-col items-center w-40">
                <div className={`rounded-full p-3 ${step.color} shadow-lg`}>
                  {React.cloneElement(step.icon, { className: 'h-5 w-5 text-white' })}
                </div>
                <div className="mt-3 text-xs font-medium text-gray-700 text-center">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}