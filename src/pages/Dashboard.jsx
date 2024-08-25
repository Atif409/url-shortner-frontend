import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { getRecentLink } from '../services/link.api';
import { UTCTOLocal } from '../utils/getUTCToLocal';
import { localStorageService } from '../utils/localStorageService';
const Dashboard = () => {
  const [recentLinkLoading, setRecentLinkLoading] = useState(false);
  const [recentLinkData, setRecentLinkData] = useState([]);
  const [recentLinkLoadingError, setRecentLinkLoadingError] = useState(false);
  const [lastSevenDaysRecentLinks, setLastSevenDaysRecentLinks] = useState(0);
  const getRecentLinks = async () => {
    setRecentLinkLoading(true);
    const recentLinkData = await getRecentLink({ length: 10, user_id: localStorageService.getItem('user_id') });
    if (recentLinkData.data.success == false) {
      setRecentLinkLoadingError(true);
    } else {
      // console.log(recentLinkData.data.data);

      setRecentLinkData(recentLinkData.data.data.recentLinks);
      setLastSevenDaysRecentLinks(recentLinkData.data.data.recentDaysRecordsCount);
    }
    setRecentLinkLoading(false);
  };

  useEffect(() => {
    getRecentLinks();
  }, []);
  const overviewData = [
    {
      title: 'Total URL Shorten in the last 7 days',
      value: '100+',
      change: null,
    },
    {
      title: 'Total QR Code Scan in the last 7 days',
      value: '50+',
      change: '40%',
      changeType: 'up',
    },
    {
      title: 'Total Clicks in the last 7 days',
      value: '500+',
      change: '30%',
      changeType: 'down',
    },
  ];

  const recentClicks = [
    { shortenUrl: 'Shorten URL 1', timeStamp: 'Date 1', clickLocation: 'Japan' },
    { shortenUrl: 'Shorten URL 2', timeStamp: 'Date 2', clickLocation: 'USA' },
    { shortenUrl: 'Shorten URL 3', timeStamp: 'Date 3', clickLocation: 'Canada' },
    { shortenUrl: 'Shorten URL 4', timeStamp: 'Date 4', clickLocation: 'UK' },
    { shortenUrl: 'Shorten URL 5', timeStamp: 'Date 5', clickLocation: 'London' },
  ];
  const activityHeaders = ['#', 'Original URL', 'Shorten URL', 'Date Created', 'Smart Link', 'Click Count'];
  const clicksHeaders = ['#', 'Shorten URL', 'Time Stamp', 'Click Location'];

  const clickData = {
    labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5'],
    datasets: [
      {
        label: 'Click Over Time (Last 7 Days)',
        data: [10, 30, 20, 35, 40],
        borderColor: '#839CF4',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true,
      },
    ],
  };

  const qrScanData = {
    labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5'],
    datasets: [
      {
        label: 'QR Scan Over Time (Last 7 Days)',
        data: [5, 25, 15, 20, 30],
        borderColor: '#839CF4',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true,
      },
    ],
  };

  const referralData = {
    labels: ['Direct', 'Social Media', 'Search Engines'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#001f3f', '#3D94F6', '#FF4136'],
      },
    ],
  };

  const deviceData = {
    labels: ['Mobile', 'Tablet', 'Desktop'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#007bff', '#80bfff', '#162447'],
      },
    ],
  };

  const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
  };

  const getShortOrCustom = (row) => {
    return row.is_custom_alias ? row.custom_alias : row.shorten_link;
  };

  return (
    <div className="p-6 bg-primary-c">
      <h1 className="text-2xl font-bold mb-4 text-secondary-a ">Overview</h1>
      <div className="grid sm:grid-cols-3 auto-rows-auto gap-4 ">
        {/* {overviewData.map((item, index) => ( */}
        <div className="p-4 bg-primary-b text-secondary-b rounded-lg flex">
          <div className="w-[75%]">
            <h2 className="text-lg font-semibold">Total URL Shorten in the last 7 days</h2>
            <div className="flex items-center justify-center mt-2">
              <span className="text-3xl font-bold">
                {lastSevenDaysRecentLinks == 0 ? '0' : lastSevenDaysRecentLinks - 1}+
              </span>
            </div>
          </div>

          {/* Conditionally render the separator div */}
          {/* {index >= overviewData.length - 2 && <div className="bg-primary-c w-1"></div>} */}

          {/* <div className="w-[25%] flex items-center justify-center">
              {item.change && (
                <span className="ml-2 text-secondary text-xl">
                  <span className={`${item.changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    <FontAwesomeIcon icon={item.changeType === 'up' ? 'arrow-up' : 'arrow-down'} />
                  </span>{' '}
                  {item.change}
                </span>
              )}
            </div> */}
        </div>
        {/* ))} */}
      </div>

      <h2 className="text-xl font-bold mb-4 mt-4 text-secondary-a ">Recent Activity</h2>

      <Table
        headers={activityHeaders}
        data={recentLinkData}
        className="mb-8 rounded-t-3xl"
        rowRenderer={(row, index) => (
          <>
            <td className=" text-nowrap border px-4 py-2 font-semibold">{index + 1}</td>
            <td className=" text-nowrap border px-4 py-2">
              {row.original_link.length > 30 ? `${row.original_link.slice(0, 30)}...` : row.original_link}
            </td>
            <td className="border text-nowrap px-4 py-2">
              {import.meta.env.VITE_APP_BASE_URL}/{getShortOrCustom(row)}
            </td>
            <td className="border px-4 py-2 text-nowrap">{new Date(row.createdAt).toLocaleString()}</td>
            <td className="border font-semibold px-4 py-2">{row.is_smart_link ? 'Yes' : 'No'}</td>
            <td className="border font-semibold px-4 py-2">{row.clickCount}</td>
          </>
        )}
      />

      <div className=" bg-primary-c mt-4">
        <h2 className="text-xl font-bold mb-4 text-secondary-a">Most Recent URL Clicks</h2>
        <Table
          headers={clicksHeaders}
          data={recentClicks}
          className="mb-8 rounded-t-3xl"
          rowRenderer={(row, index) => (
            <>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{row.shortenUrl}</td>
              <td className="border px-4 py-2">{row.timeStamp}</td>
              <td className="border px-4 py-2">{row.clickLocation}</td>
            </>
          )}
        />

        <h2 className="text-xl font-bold mb-4 text-secondary-a ">Analytics Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center align-items-center">
          <div className="sm:w-full sm:h-96 w-72 h-7w-72 mt-4 flex flex-col items-center justify-center">
            <Line data={clickData} />
          </div>
          <div className="sm:w-full sm:h-96 w-72 h-7w-72 mt-4 flex flex-col items-center justify-center">
            <Line data={qrScanData} />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 mt-4 text-secondary-a ">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center pb-8">
          <div className="sm:w-full sm:h-96 w-64 h-64 mt-4 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-2 text-secondary-a">Referral Resources</h2>
            <Doughnut data={referralData} />
          </div>
          <div className="sm:w-full sm:h-96 w-64 h-64 mt-8 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-2 text-secondary-a">Device Types</h2>
            <Doughnut data={deviceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
