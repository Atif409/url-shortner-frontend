import React from 'react';

const Analytics = () => {

  const analyticsData = {
    
    topPerformingDates: {
      period: 'June 10, 2024 & July 05, 2024',
      clicksScans: 40,
      dateRange: 'July 10 - July 25, 2024',
    },
    topPerformingLocation: {
      location: 'United Kingdom & United States',
      clicksScans: 40,
      dateRange: 'July 10 - July 25, 2024',
    },
    totalClicks: 3500,
    geographicDistribution: 'US: 50%, UK: 20%, CA: 15%, Other: 15%',
    deviceDistribution: 'Mobile: 60%, Desktop: 30%, Tablet: 10%',
  };

  return (
    <div className="p-8">
      <div className="lg:pl-12 lg:pr-12">
        <h2 className="text-4xl font-semibold mb-4 text-secondary-a tracking-wider ">Analytics</h2>
        <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Overview</h3>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 lg:pl-12 lg:pr-12">
        {/* Top performing dates */}
        <div className="bg-primary-b text-secondary-b p-6 rounded-md shadow-md lg:h-[200px]">
          <h4 className="text-2xl font-semibold mb-2">Top performing dates</h4>
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg">{analyticsData.topPerformingDates.period}</p>
            <p className="text-lg mt-1">{analyticsData.topPerformingDates.clicksScans} clicks + scans</p>
            <p className="text-lg mt-1">{analyticsData.topPerformingDates.dateRange}</p>
          </div>
        </div>

        {/* Top performing location */}
        <div className="bg-primary-b text-secondary-b p-6 rounded-md shadow-md">
          <h4 className="text-2xl font-semibold mb-2">Top performing location</h4>
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg">{analyticsData.topPerformingLocation.location}</p>
            <p className="text-lg mt-1">{analyticsData.topPerformingLocation.clicksScans} clicks + scans</p>
            <p className="text-lg mt-1">{analyticsData.topPerformingLocation.dateRange}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 lg:pl-12 lg:pr-12 mt-8">
        {/* Total clicks */}
        <div className="bg-primary-b text-secondary-b p-6 rounded-md shadow-md flex flex-col justify-center items-center">
          <p className="text-2xl">Total Clicks</p>
          <p className="text-4xl font-bold mt-2">{analyticsData.totalClicks}</p>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-primary-b text-secondary-b p-6 rounded-md shadow-md flex flex-col justify-center items-center">
          <p className="text-2xl">Geographic Distribution</p>
          <p className="text-lg mt-2">{analyticsData.geographicDistribution}</p>
        </div>

        {/* Device Distribution */}
        <div className="bg-primary-b text-secondary-b p-6 rounded-md shadow-md flex flex-col justify-center items-center">
          <p className="text-2xl">Device Distribution</p>
          <p className="text-lg mt-2">{analyticsData.deviceDistribution}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
