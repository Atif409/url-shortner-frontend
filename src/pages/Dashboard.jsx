import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { getRecentLink } from '../services/link.api';
import { getLastRecentDaysClickCount } from '../services/link.api';
import {
  getLastRecentDaysClickQRScanCount,
  getDeviceTypeGroupedStat,
  getReferrerTypeGroupedStat,
  lastRecentEveryDaysClickCount,
  lastRecentEveryDaysClickQRScanCount,
} from '../services/link.api';
import { getRecentClicks } from '../services/link.api';
import { localStorageService } from '../utils/localStorageService';
const Dashboard = () => {
  const [recentLinkLoading, setRecentLinkLoading] = useState(false);
  const [recentLinkData, setRecentLinkData] = useState([]);
  const [recentLinkLoadingError, setRecentLinkLoadingError] = useState(false);
  const [lastSevenDaysRecentLinks, setLastSevenDaysRecentLinks] = useState(0);

  const [lastSevenDaysQrScanCountData, setLastSevenDaysQrScanCountData] = useState({});
  const [lastSevenDaysQrScanCountLoading, setLastSevenDaysQrScanCountLoading] = useState(true);
  const [lastSevenDaysQrScanCountError, setLastSevenDaysQrScanCountError] = useState(false);

  const [lastSevenDaysClickCountData, setLastSevenDaysClickCountData] = useState({});
  const [lastSevenDaysClickCountLoading, setLastSevenDaysClickCountLoading] = useState(true);
  const [lastSevenDaysClickCountError, setLastSevenDaysClickCountError] = useState(false);

  const [recentClickData, setRecentClickData] = useState([]);
  const [recentClickLoading, setRecentClickLoading] = useState(true);
  const [recentClickError, setRecentClickError] = useState(null);

  const [recentEveryDayClickData, setRecentEveryDayClickData] = useState([]);
  const [recentEveryDayClickLoading, setRecentEveryDayClickLoading] = useState(true);
  const [recentEveryDayClickError, setRecentEveryDayClickError] = useState(null);
  const [recentEveryDayClickChartData, setRecentEveryDayClickChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Click Over Time (Last 7 Days)',
        data: [],
        borderColor: '#839CF4',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true,
      },
    ],
  });

  const [recentEveryDayQrScanData, setRecentEveryDayQrScanData] = useState([]);
  const [recentEveryDayQrScanLoading, setRecentEveryDayQrScanLoading] = useState(true);
  const [recentEveryDayQrScanError, setRecentEveryDayQrScanError] = useState(false);
  const [recentEveryDayQrScanChartData, setRecentEveryDayQrScanChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'QR Scan Over Time (Last 7 Days)',
        data: [],
        borderColor: '#839CF4',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        fill: true,
      },
    ],
  });
  const [deviceTypeData, SetDeviceTypeData] = useState([]);
  const [deviceTypeDataLoading, setDeviceTypeDataLoading] = useState(true);
  const [deviceTypeError, SetDeviceTypeError] = useState(false);
  const [dogNutDeviceTypeChartData, setDogNutDeviceTypeChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [barChartReferrerTypeData, setBarChartReferrerTypeData] = useState({
    labels: [],
    datasets: [
      {
        label: 'No of Clicks',
        data: [],
      },
    ],
  });
  const [referrerTypeData, SetReferrerTypeData] = useState([]);
  const [referrerTypeDataLoading, setReferrerTypeDataLoading] = useState(true);
  const [referrerTypeError, SetReferrerTypeError] = useState(null);
  const getRecentLinks = async () => {
    setRecentLinkLoading(true);
    try {
      const recentLinkData = await getRecentLink({ length: 10, user_id: localStorageService.getItem('user_id') });
      setRecentLinkLoadingError(false);
      if (recentLinkData.data.success == false) {
        setRecentLinkLoadingError(true);
      } else {
        setRecentLinkData(recentLinkData.data.data.recentLinks);
        setLastSevenDaysRecentLinks(recentLinkData.data.data.recentDaysRecordsCount);
      }
    } catch (error) {
      setRecentLinkLoadingError(true);
    }
    setRecentLinkLoading(false);
  };

  const getRecentEveryDayClicks = async () => {
    setRecentEveryDayClickLoading(true);
    try {
      const recentLinkData = await lastRecentEveryDaysClickCount({
        user_id: localStorageService.getItem('user_id'),
      });
      setRecentEveryDayClickError(false);
      if (recentLinkData.data.success == false) {
        setRecentEveryDayClickError(true);
      } else {
        setRecentEveryDayClickData(recentLinkData.data.data.lastRecentDaysClickCountData);
      }
    } catch (error) {
      setRecentEveryDayClickError(true);
    }
    setRecentEveryDayClickLoading(false);
  };

  const getRecentEveryDayQrScans = async () => {
    setRecentEveryDayQrScanLoading(true);
    try {
      const recentLinkData = await lastRecentEveryDaysClickQRScanCount({
        user_id: localStorageService.getItem('user_id'),
      });
      setRecentEveryDayQrScanError(false);
      if (recentLinkData.data.success == false) {
        setRecentEveryDayQrScanError(true);
      } else {
        setRecentEveryDayQrScanData(recentLinkData.data.data.lastRecentDaysClickQRScanCountData);
      }
    } catch (error) {
      setRecentEveryDayQrScanError(true);
    }
    setRecentEveryDayQrScanLoading(false);
  };

  const prepareLabels = (dt) => {
    const labels = [];
    const data = [];
    dt.forEach((val) => {
      labels.push(val._id);
      data.push(val.count);
    });
    return { labels, data };
  };
  const getDeviceType = async () => {
    setDeviceTypeDataLoading(true);
    try {
      const recentLinkData = await getDeviceTypeGroupedStat({
        user_id: localStorageService.getItem('user_id'),
      });
      SetDeviceTypeError(false);
      if (recentLinkData.data.success == false) {
        SetDeviceTypeError(true);
      } else {
        SetDeviceTypeData(recentLinkData.data.data);
      }
    } catch (error) {
      SetDeviceTypeError(true);
    }
    setDeviceTypeDataLoading(false);
  };

  const getReferrerType = async () => {
    setReferrerTypeDataLoading(true);
    try {
      const recentLinkData = await getReferrerTypeGroupedStat({
        user_id: localStorageService.getItem('user_id'),
      });
      SetReferrerTypeError(false);
      if (recentLinkData.data.success == false) {
        SetReferrerTypeError(true);
      } else {
        SetReferrerTypeData(recentLinkData.data.data);
      }
    } catch (error) {
      SetReferrerTypeError(true);
    }
    setReferrerTypeDataLoading(false);
  };

  useEffect(() => {
    const data = prepareLabels(deviceTypeData);
    setDogNutDeviceTypeChartData({
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          backgroundColor: ['#007bff', '#80bfff', '#162447'],
        },
      ],
    });
  }, [deviceTypeData]);

  useEffect(() => {
    const data = prepareLabels(referrerTypeData);
    setBarChartReferrerTypeData({
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          label: 'No of Clicks',
        },
      ],
    });
  }, [referrerTypeData]);

  const getLineChartDateLabels = (dt) => {
    const mn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let labels = [];
    let data = [];
    dt.forEach((val) => {
      labels.push(`${mn[parseInt(val._id.split('-')[1]) - 1]} ${parseInt(val._id.split('-')[2])}`);
      data.push(val.count);
    });
    return { labels, data };
  };
  useEffect(() => {
    const data = getLineChartDateLabels(recentEveryDayQrScanData);
    setRecentEveryDayQrScanChartData({
      labels: data.labels,
      datasets: [
        {
          label: 'QR Scan Over Time (Last 7 Days)',
          data: data.data,
          borderColor: '#839CF4',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          fill: true,
        },
      ],
    });
  }, [recentEveryDayQrScanData]);

  useEffect(() => {
    const data = getLineChartDateLabels(recentEveryDayClickData);
    setRecentEveryDayClickChartData({
      labels: data.labels,
      datasets: [
        {
          label: 'Click Over Time (Last 7 Days)',
          data: data.data,
          borderColor: '#839CF4',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          fill: true,
        },
      ],
    });
  }, [recentEveryDayClickData]);
  const getRecentClick = async () => {
    setRecentClickLoading(true);
    try {
      const recentLinkData = await getRecentClicks({ length: 10, user_id: localStorageService.getItem('user_id') });
      setRecentClickError(false);
      if (recentLinkData.data.success == false) {
        setRecentClickError(true);
      } else {
        setRecentClickData(recentLinkData.data.data);
      }
    } catch (error) {
      setRecentClickError(true);
    }
    setRecentClickLoading(false);
  };
  const getLastSevenDaysQrScanCounts = async () => {
    setLastSevenDaysQrScanCountLoading(true);
    try {
      const recentLinkData = await getLastRecentDaysClickQRScanCount({
        user_id: localStorageService.getItem('user_id'),
      });
      setLastSevenDaysQrScanCountError(false);
      if (recentLinkData.data.success == false) {
        setLastSevenDaysQrScanCountError(true);
      } else {
        setLastSevenDaysQrScanCountData(recentLinkData.data.data);
      }
    } catch (error) {
      setLastSevenDaysQrScanCountError(true);
    }
    setLastSevenDaysQrScanCountLoading(false);
  };

  const getLastSevenDaysClickCounts = async () => {
    setLastSevenDaysClickCountLoading(true);
    try {
      const recentLinkData = await getLastRecentDaysClickCount({ user_id: localStorageService.getItem('user_id') });
      setLastSevenDaysClickCountError(false);
      if (recentLinkData.data.success == false) {
        setLastSevenDaysClickCountError(true);
      } else {
        setLastSevenDaysClickCountData(recentLinkData.data.data);
      }
    } catch (error) {
      setLastSevenDaysClickCountError(true);
    }
    setLastSevenDaysClickCountLoading(false);
  };

  useEffect(() => {
    getRecentLinks();
    getLastSevenDaysClickCounts();
    getLastSevenDaysQrScanCounts();
    getRecentClick();
    getDeviceType();
    getReferrerType();
    getRecentEveryDayClicks();
    getRecentEveryDayQrScans();
  }, []);

  const activityHeaders = ['#', 'Original URL', 'Shorten URL', 'Date Created', 'Smart Link', 'Click Count'];
  const clicksHeaders = ['#', 'Shorten URL', 'Time Stamp', 'Click Location'];

  const getTrend = (lastWeek, currentWeek) => {
    if (!lastWeek || !currentWeek) {
      return { up: false, trend: 0 };
    }
    if (currentWeek > lastWeek) {
      return { up: true, trend: parseInt((currentWeek / lastWeek - 1) * 100) };
    } else {
      return { up: false, trend: parseInt((1 - lastWeek / currentWeek) * 100) };
    }
  };
  const getShortOrCustom = (row) => {
    return row.is_custom_alias ? row.custom_alias : row.shorten_link;
  };

  return (
    <div className=" bg-primary-c lg:pl-8 lg:pr-8 lg:mt-8 mt-8">
      <h1 className="font-bold text-secondary-a sm:text-4xl text-2xl lg:tracking-widest tracking-wider mb-4">
        Dashboard
      </h1>
      <h1 className="text-2xl font-bold mb-4 text-secondary-a ">Overview</h1>
      <div className="grid sm:grid-cols-3 auto-rows-auto gap-4">
        {/* Total URL Shorten in the last 7 days */}

        <div className="p-4 bg-primary-b text-secondary-b rounded-lg flex justify-between">
          {!recentLinkLoadingError && (
            <div className="w-[75%]">
              <h2 className="text-lg font-semibold">URL Shorten in last 7 days</h2>
              <div className="flex items-center justify-center mt-2">
                <span className="text-3xl font-bold">
                  {recentLinkLoading ? (
                    <Loader width="w-[20px]" height="h-[20px]" />
                  ) : lastSevenDaysRecentLinks == 0 ? (
                    '0'
                  ) : (
                    lastSevenDaysRecentLinks - 1
                  )}
                  {!recentLinkLoading && !recentLinkLoadingError ? '+' : ''}
                </span>
              </div>
            </div>
          )}
          {recentLinkLoadingError && (
            <p className="text-xl font-bold">Sorry failed to load URL shorten in last 7 days</p>
          )}
        </div>

        {/* Total QR Scan in last 7 days */}

        <div className="p-4 bg-primary-b text-secondary-b rounded-lg flex ">
          {!lastSevenDaysQrScanCountError && (
            <>
              <div className="w-[75%]">
                <h2 className="text-lg font-semibold">Total QR Scan in Last 7 days</h2>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-3xl font-bold">
                    {lastSevenDaysQrScanCountLoading ? (
                      <Loader width={'w-[20px]'} height={'h-[20px]'} />
                    ) : (
                      lastSevenDaysQrScanCountData.count.lastRecentDaysQrScanCountData
                    )}
                    {!lastSevenDaysQrScanCountLoading &&
                    !lastSevenDaysQrScanCountError &&
                    lastSevenDaysQrScanCountData.count.lastRecentDaysQrScanCountData - 1 > 0
                      ? '+'
                      : ''}
                  </span>
                </div>
              </div>

              <div className="bg-primary-c w-1"></div>

              {!lastSevenDaysQrScanCountLoading && !lastSevenDaysQrScanCountError ? (
                <div className=" pl-2 w-[25%] flex items-center justify-center">
                  {getTrend(
                    lastSevenDaysQrScanCountData.count.previousWeekCount,
                    lastSevenDaysQrScanCountData.count.lastRecentDaysQrScanCountData
                  ).trend + '%'}

                  <span className="ml-2 text-secondary text-xl">
                    <span
                      className={`${
                        getTrend(
                          lastSevenDaysQrScanCountData.count.previousWeekCount,
                          lastSevenDaysQrScanCountData.count.lastRecentDaysQrScanCountData
                        ).up
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={`${
                          getTrend(
                            lastSevenDaysQrScanCountData.count.previousWeekCount,
                            lastSevenDaysQrScanCountData.count.lastRecentDaysQrScanCountData
                          ).up
                            ? 'arrow-up'
                            : 'arrow-down'
                        }`}
                      />
                    </span>{' '}
                  </span>
                </div>
              ) : (
                <Loader width={'w-[20px]'} height={'h-[20px]'} />
              )}
            </>
          )}
          {lastSevenDaysQrScanCountError && (
            <p className="text-xl font-bold">Sorry failed to load QR Scan in last 7 days</p>
          )}
        </div>

        {/* Total Clicks in last 7 days */}

        <div className="p-4 bg-primary-b text-secondary-b rounded-lg flex">
          {!lastSevenDaysClickCountError && (
            <>
              <div className="w-[75%]">
                <h2 className="text-lg font-semibold">Total Clicks in Last 7 days</h2>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-3xl font-bold">
                    {lastSevenDaysClickCountLoading ? (
                      <Loader width={'w-[20px]'} height={'h-[20px]'} />
                    ) : (
                      lastSevenDaysClickCountData.count.lastRecentDaysClickCountData
                    )}
                    {!lastSevenDaysClickCountLoading &&
                    !lastSevenDaysClickCountError &&
                    lastSevenDaysClickCountData.count.lastRecentDaysClickCountData - 1 > 0
                      ? '+'
                      : ''}
                  </span>
                </div>
              </div>

              <div className="bg-primary-c w-1 mr-2"></div>
              {!lastSevenDaysClickCountLoading && !lastSevenDaysClickCountError ? (
                <div className="w-[25%] flex items-center justify-center">
                  {getTrend(
                    lastSevenDaysClickCountData.count.previousWeekCount,
                    lastSevenDaysClickCountData.count.lastRecentDaysClickCountData
                  ).trend + '%'}
                  <span className="ml-2 text-secondary text-xl">
                    <span
                      className={`${
                        getTrend(
                          lastSevenDaysClickCountData.count.previousWeekCount,
                          lastSevenDaysClickCountData.count.lastRecentDaysClickCountData
                        ).up
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={`${
                          getTrend(
                            lastSevenDaysClickCountData.count.previousWeekCount,
                            lastSevenDaysClickCountData.count.lastRecentDaysClickCountData
                          ).up
                            ? 'arrow-up'
                            : 'arrow-down'
                        }`}
                      />
                    </span>{' '}
                  </span>
                </div>
              ) : (
                <Loader width={'w-[20px]'} height={'h-[20px]'} />
              )}
            </>
          )}
          {lastSevenDaysClickCountError && (
            <p className="text-xl font-bold">Sorry failed to load Clicks in last 7 days</p>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 mt-4 text-secondary-a ">Recent Created Link Activity</h2>

      {/* Recent Link created activity */}
      <Table
        hasError={recentLinkLoadingError}
        headers={activityHeaders}
        data={recentLinkData}
        className="mb-8 rounded-t-3xl"
        loadingData={recentLinkLoading}
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
        {/* Recent URL clicks */}
        <Table
          hasError={recentClickError}
          headers={clicksHeaders}
          data={recentClickData}
          loadingData={recentClickLoading}
          className="mb-8 rounded-t-3xl"
          rowRenderer={(row, index) => (
            <>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                {import.meta.env.VITE_APP_BASE_URL}/
                {row.link_id.is_custom_alias ? row.link_id.custom_alias : row.link_id.shorten_link}
              </td>
              <td className="border px-4 py-2">{new Date(row.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">{row.country_name}</td>
            </>
          )}
        />

        <h2 className="text-xl font-bold mb-4 text-secondary-a ">Analytics Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center align-items-center">
          <div className="sm:w-full sm:h-96 w-72 h-7w-72 mt-4 flex flex-col items-center justify-center">
            {!recentEveryDayClickLoading && !recentEveryDayClickError ? (
              <Line data={recentEveryDayClickChartData} />
            ) : (
              !recentEveryDayClickError && <Loader />
            )}
            {recentEveryDayClickError && (
              <p className="text-xl font-bold">Sorry failed to load Clicks over last 7 days</p>
            )}
          </div>
          <div className="sm:w-full sm:h-96 w-72 h-7w-72 mt-4 flex flex-col items-center justify-center">
            {!recentEveryDayQrScanLoading && !recentEveryDayQrScanError ? (
              <Line data={recentEveryDayQrScanChartData} />
            ) : (
              !recentEveryDayQrScanError && <Loader />
            )}
            {recentEveryDayQrScanError && (
              <p className="text-xl font-bold">Sorry failed to load QR Scan over last 7 days</p>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 mt-4 text-secondary-a ">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center pb-8">
          <div className="sm:w-full sm:h-96 w-64 h-64 mt-4 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-2 text-secondary-a">Referral Resources</h2>

            {!referrerTypeDataLoading && !referrerTypeError ? (
              <Bar data={barChartReferrerTypeData} />
            ) : (
              !referrerTypeError && <Loader />
            )}
            {referrerTypeError && <p className="text-xl font-bold">Sorry failed to load Click Referrer Reources</p>}
          </div>
          <div className="sm:w-full sm:h-96 w-64 h-64 mt-8 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-2 text-secondary-a">Device Types</h2>
            {!deviceTypeDataLoading && !deviceTypeError ? (
              <Doughnut data={dogNutDeviceTypeChartData} />
            ) : (
              !deviceTypeError && <Loader />
            )}
            {deviceTypeError && <p className="text-xl font-bold">Sorry failed to load Click Device Type Resources</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
