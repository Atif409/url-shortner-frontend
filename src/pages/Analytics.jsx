import { useState, useEffect } from 'react';
import Table from '../components/Table';
import FilterComponent from '../components/FilterComponent';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Button from '../components/Button';
const Analytics = () => {
  const [records, setRecords] = useState(0);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timePeriod, setTimePeriod] = useState('years');
  const [activeTab, setActiveTab] = useState('countries');

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

  const countryData = [
    { country: 'United States', clicks: 50, percentage: '25%' },
    { country: 'Pakistan', clicks: 40, percentage: '59%' },
    { country: 'United Kingdom', clicks: 30, percentage: '95%' },
    { country: 'Japan', clicks: 49, percentage: '45%' },
    { country: 'Canada', clicks: 82, percentage: '10%' },
  ];

  const cityData = [
    { city: 'New York', clicks: 20, percentage: '15%' },
    { city: 'Lahore', clicks: 35, percentage: '50%' },
    { city: 'London', clicks: 25, percentage: '70%' },
    { city: 'Tokyo', clicks: 45, percentage: '40%' },
    { city: 'Toronto', clicks: 50, percentage: '12%' },
  ];

  const countryHeaders =
    activeTab === 'countries' ? ['#', 'Country', 'Clicks + Scans', '%'] : ['#', 'City', 'Clicks + Scans', '%'];

  const countryRowRenderer = (row, index) => (
    <>
      <td className="py-2 px-4">{index + 1}</td>
      <td className="py-2 px-4">{activeTab === 'countries' ? row.country : row.city}</td>
      <td className="py-2 px-4">{row.clicks}</td>
      <td className="py-2 px-4">{row.percentage}</td>
    </>
  );
  return (
    <div className="p-2 w-full ">
      <div className="lg:pl-8 lg:pr-8 mt-8">
        <h1 className="font-bold text-secondary-a sm:text-4xl text-2xl lg:tracking-widest tracking-wider">Analytics</h1>
        <h3 className="text-3xl font-medium mb-4 mt-4 text-secondary-a">Overview</h3>
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
        <div className="lg:w-full w-1/2">
          <FilterComponent
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
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
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-[85%]">
            <Line data={filteredChartData()} options={options} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:pl-8 lg:pr-8 place-content-center justify-items-center align-items-center ">
          <div className="sm:w-full sm:h-full w-64 h-64 mt-8 flex flex-col  ">
            <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Click + Scan by Referrer</h3>
            <div className="flex item-center justify-center sm:w-full sm:h-96 w-64 h-6">
              <Bar data={referrerData} />
            </div>
          </div>
          <div className="sm:w-full sm:h-full w-64 h-64 mt-8 flex flex-col ">
            <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Click + Scan by Device Types</h3>
            <div className="flex item-center justify-center sm:w-full sm:h-96 w-64 h-64">
              <Pie data={deviceData} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:p-8 pt-8 sm:mt-2 mt-16">
        <h2 className="text-2xl font-medium  mt-4 text-secondary-a mb-4">Clicks + Scans by location</h2>
        <div className="flex mb-6 justify-center items-center">
          <div className="bg-[#b3c1f8] rounded-full flex items-center justify-center">
            <Button
              text="Countries"
              onClick={() => setActiveTab('countries')}
              className={`py-2 px-4 rounded-tl-full rounded-bl-full flex items-center justify-center font-semibold sm:w-48 w-32 transition-all duration-700 ease-in-out ${activeTab === 'countries' ? 'bg-primary-b text-secondary-b rounded-full' : 'bg-[#b3c1f8] text-secondary-a'}`}
            />

            <Button
              text="Cities"
              onClick={() => setActiveTab('cities')}
              className={`py-2 px-4 rounded-tr-full rounded-br-full flex items-center justify-center font-semibold sm:w-48 w-32 transition-all duration-700 ease-in-out ${activeTab === 'cities' ? 'bg-primary-b text-secondary-b rounded-full' : 'bg-[#b3c1f8] text-secondary-a'}`}
            />
          </div>
        </div>
        <Table
          headers={countryHeaders}
          data={activeTab === 'countries' ? countryData : cityData}
          rowRenderer={countryRowRenderer}
          className="rounded-tr-3xl rounded-tl-3xl"
          headerClassName="bg-primary-b text-secondary-b  "
          rowClassName="bg-primary-c text-center border text-secondary-a "
        />
      </div>
    </div>
  );
};

export default Analytics;
