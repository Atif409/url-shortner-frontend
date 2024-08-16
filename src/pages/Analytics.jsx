import { useState, useEffect } from 'react';
import Table from '../components/Table';
import FilterComponent from '../components/FilterComponent';
import { Line, Bar, Pie } from 'react-chartjs-2';
const Analytics = () => {
  const [records, setRecords] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timePeriod, setTimePeriod] = useState('years');

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

  const headers = ['Link URL', 'Total clicks', 'Unique clicks', 'Top Country', 'Top Device', 'Creation Date'];
  const data = [
    {
      link: 'https://urlshorten.com/',
      totalClicks: 750,
      uniqueClicks: 107,
      topCountry: 'UK',
      topDevice: 'Mobile, Laptop',
      creationDate: '12/03/2021',
    },
    {
      link: 'https://urlshorten.com/',
      totalClicks: 700,
      uniqueClicks: 107,
      topCountry: 'UK',
      topDevice: 'Mobile, Laptop',
      creationDate: '12/03/2021',
    },
    {
      link: 'https://urlshorten.com/',
      totalClicks: 300,
      uniqueClicks: 100,
      topCountry: 'UK',
      topDevice: 'Mobile, Laptop',
      creationDate: '12/03/2021',
    },
    {
      link: 'https://urlshorten.com/',
      totalClicks: 150,
      uniqueClicks: 107,
      topCountry: 'UK',
      topDevice: 'Mobile, Laptop',
      creationDate: '12/03/2021',
    },
  ];
  const referrerData = {
    labels: ['Google', 'LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'Other'],
    datasets: [
      {
        label: 'Clicks',
        data: [5, 15, 10, 30, 25, 70],
        backgroundColor: '#c5cef0',
        borderColor: '#c5cef0',
        borderWidth: 1,
      },
    ],
  };
  const deviceData = {
    labels: ['Mobile', 'Tablet', 'Desktop', 'Other'],
    datasets: [
      {
        label: 'Device Types',
        data: [31.6, 10.5, 52.6, 5.3],
        backgroundColor: [
          '#4d4e9f', // Mobile
          '#2c2f6f', // Tablet
          '#768ce1', // Desktop
          '#c5cef0', // Other
        ],
        borderColor: [
          'rgba(51, 51, 153, 1)',
          'rgba(75, 51, 153, 1)',
          'rgba(51, 102, 204, 1)',
          'rgba(153, 204, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const rowRenderer = (row) => (
    <>
      <td className="py-2 px-4 text-center">{row.link}</td>
      <td className="py-2 px-4 text-center">{row.totalClicks}</td>
      <td className="py-2 px-4 text-center">{row.uniqueClicks}</td>
      <td className="py-2 px-4 text-center">{row.topCountry}</td>
      <td className="py-2 px-4 text-center">{row.topDevice}</td>
      <td className="py-2 px-4 text-center">{row.creationDate}</td>
    </>
  );

  const chartData = {
    labels: ['March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Recent Data',
        data: [10, 20, 45, 10, 50, 60],
        fill: false,
        borderColor: '#839CF4',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // // Convert timePeriod to its corresponding date unit
  // const getTimeUnit = (period) => {
  //   switch (period) {
  //     case 'years':
  //       return 'year';
  //     case 'months':
  //       return 'month';
  //     case 'weeks':
  //       return 'week';
  //     case 'days':
  //       return 'day';
  //     default:
  //       return 'month';
  //   }
  // };

  // Filter the chart data based on the selected startDate, endDate, and timePeriod
  const filteredChartData = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // const timeUnit = getTimeUnit(timePeriod);

    // Filter the labels and data based on the date range
    const filteredLabels = chartData.labels.filter((label, index) => {
      const date = new Date(label);
      return (!startDate || date >= start) && (!endDate || date <= end);
    });

    // Filter the dataset based on the filtered labels
    const filteredData = chartData.datasets[0].data.filter((_, index) => {
      const date = new Date(chartData.labels[index]);
      return (!startDate || date >= start) && (!endDate || date <= end);
    });

    return {
      ...chartData,
      labels: filteredLabels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: filteredData,
        },
      ],
    };
  };

  useEffect(() => {
    setRecords(data.length);
  }, [data]);
  return (
    <div className="p-2 w-full ">
      <div className="lg:pl-8 lg:pr-8">
        <h2 className="text-4xl font-semibold mb-4 text-secondary-a tracking-wider ">Analytics</h2>
        <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Overview</h3>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 lg:pl-8 lg:pr-8">
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

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 lg:pl-8 lg:pr-8 mt-8">
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
      <div className="w-full mt-8 lg:pl-8 lg:pr-8">
        <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Top performing Link</h3>

        <Table
          headers={headers}
          data={data}
          rowRenderer={rowRenderer}
          className="border"
          headerClassName="bg-primary-b text-secondary-b"
          rowClassName="border text-secondary-a"
        />
        <div className="flex justify-end items-end w-full lg:pr-10 pr-2">
          <p className="text-lg text-secondary-a mt-4">Total Records: {records}</p>
        </div>
      </div>
      <div className="w-full mt-8 lg:pl-8 lg:pr-8">
        <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Clicks + QR Scans Over Time Period</h3>
        <div className="lg:w-full w-1/2">
          <FilterComponent
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
          />
        </div>
        

        <Line data={filteredChartData()} options={options} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:pl-8 lg:pr-8 place-content-center justify-items-center align-items-center ">
          <div className="sm:w-full sm:h-full w-64 h-64 mt-8 flex flex-col ">
            <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Click + Scan by Referrer</h3>
            <Bar data={referrerData} />
          </div>
          <div className="sm:w-full sm:h-full w-64 h-64 mt-8 flex flex-col ">
            <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Click + Scan by Device Types</h3>
            <div className="flex item-center justify-center sm:w-full sm:h-96 w-64 h-64">
              <Pie data={deviceData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
