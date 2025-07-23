import React from 'react';
import { statistics } from './workflow';

const StatisticsSection: React.FC = () => {
  return (
    <section className=" py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These numbers represent real students who achieved their career goals through our program
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;