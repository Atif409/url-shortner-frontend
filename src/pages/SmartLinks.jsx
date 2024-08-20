import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Button';
import Input from '../components/Input';
import ToggleButton from '../components/ToggleButton';
const SmartLinks = () => {
  const [redirectRule, setRedirectRule] = useState('');
  const [country, setCountry] = useState('');
  const [countryUrl, setCountryUrl] = useState('');
  const [device, setDevice] = useState('');
  const [deviceUrl, setDeviceUrl] = useState('');

  const redirectOptions = [
    { value: 'rule1', label: 'Platform' },
    { value: 'rule2', label: 'Country' },
    { value: 'rule3', label: 'Device' },
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  const deviceOptions = [
    { value: 'mobile', label: 'Mobile' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'tablet', label: 'Tablet' },
  ];

  const handleAddRedirectRule = () => {
    console.log('redirect clicked');
  };

  return (
    <div className="p-2">
      <div className="lg:pl-8 lg:pr-8">
        <h1 className="text-4xl font-semibold mb-4 text-secondary-a tracking-wider ">Smart Shorten Link Page</h1>
        <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Redirect Rules</h3>
      </div>
      <div className="lg:pl-8  w-full flex sm:flex-row flex-col sm:gap-4">
        <Dropdown
          options={redirectOptions}
          placeholder="Select the Redirect Rule"
          value={redirectRule}
          onChange={(e) => setRedirectRule(e.target.value)}
          className="mb-4 sm:w-1/2 w-full  text-secondary-a"
        />
        <Button
          text="Add Redirect Rules"
          className="bg-primary-b text-secondary-b rounded-xl h-8 mt-1 flex items-center justify-center "
          onClick={handleAddRedirectRule}
        />
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:pl-8 lg:pr-8 gap-4 mt-8 ">
        <div>
          <Dropdown
            title="Country"
            options={countryOptions}
            placeholder="Select the country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-12 gap-2 ">
          <div className="col-span-11">
            <Input
              type="text"
              label="Destination URL for selected Device"
              placeholder="Enter the destination URL"
              value={countryUrl}
              onChange={(e) => setCountryUrl(e.target.value)}
              className="border border-primary-b p-2 rounded-md w-full focus:outline-none "
              labelClassName="text-secondary-a"
            />
          </div>
          <div className=" flex mt-8 justify-center col-span-1">
            <FontAwesomeIcon
              icon="trash"
              className="text-red-600 cursor-pointer text-2xl hover:text-red-800 "
              onClick={() => console.log('Delete rule')}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:pl-8 lg:pr-8 gap-4 mt-8 ">
        <div>
          <Dropdown
            title="Device"
            options={deviceOptions}
            placeholder="Select the device"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-12 gap-2 ">
          <div className="col-span-11">
            <Input
              label="Destination URL for selected Device"
              type="text"
              placeholder="Enter the destination URL"
              value={deviceUrl}
              onChange={(e) => setDeviceUrl(e.target.value)}
              className="border p-2 rounded-md w-full focus:outline-none border-primary-b"
              labelClassName="text-secondary-a"
            />
          </div>
          <div className=" flex mt-8 justify-center col-span-1">
            <FontAwesomeIcon
              icon="trash"
              className="text-red-600 cursor-pointer text-2xl hover:text-red-800 "
              onClick={() => console.log('Delete rule')}
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:pl-8 lg:pr-8 gap-4 mt-8 ">
        <div className="">
          <ToggleButton description="Enable this to generate a QR Code" />
        </div>

        <div className="w-full">
          <Button
            text="Generate Smart Link"
            iconShow={['arrow-right']}
            iconPosition="right"
            className="bg-primary-b text-secondary-b rounded-xl  h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default SmartLinks;
