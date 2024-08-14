import React, { useState } from 'react';
import ToggleButton from '../components/ToggleButton';
import Input from '../components/Input';
import Button from '../components/Button';
import DateTimePicker from '../components/DateTimePicker';
const CreateLinks = () => {
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [isDateTimePickerToggled, setIsDateTimePickerToggled] = useState(false);
  const [isPasswordToggled, setIsPasswordToggled] = useState(false);

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleCustomAliasChange = (e) => setCustomAlias(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleToggle = (newState) => {
    console.log('Toggle State:', newState);
  };

  const toggleAliasSetting = () => {
    setIsToggled(!isToggled);
    console.log('Toggled:', !isToggled);
  };
  const toggleDateTimePicker = () => {
    setIsDateTimePickerToggled(!isDateTimePickerToggled);
  };
  const togglePasswordSetting = () => {
    setIsPasswordToggled(!isPasswordToggled);
  };

  return (
    <div className="flex flex-col items-start bg-primary-c p-8">
      <h1 className="font-bold text-secondary-a sm:text-4xl text-2xl lg:tracking-widest tracking-wider">
        Create Short Links
      </h1>

      <div className="sm:mt-8 mt-2 w-full">
        <Input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://urlShorten.com/"
          label="Destination"
          labelClassName="my-3 text-secondary-a sm:text-3xl text-2xl font-bold tracking-wider"
          className="w-[80%] h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75"
        />

        <p className="text-secondary-a sm:text-base text-xs mt-2">You can create 1 more link this month</p>

        <div className="mt-4 flex justify-end w-[80%]">
          <Button
            text="Shorten your Link"
            onClick={() => {
              console.log('Button clicked');
            }}
            className="bg-primary-b text-secondary-b lg:w-[20%] sm:w-[30%] w-[60%] h-auto font-bold text-xs lg:text-base hover:opacity-75 rounded-lg"
            iconShow={['fas', 'arrow-right']}
            iconPosition="right"
            iconClassName="text-sm"
          />
        </div>

        <h2 className="font-bold text-secondary-a sm:text-2xl text-md lg:tracking-widest tracking-wider mt-8">
          Options (Customize link behaviour)
        </h2>

        <div className="mt-4">
          <ToggleButton
            title="Set Custom Alias (optional)"
            description="Enable this to set a custom URL alias"
            onClick={toggleAliasSetting}
            className="mb-4"
            titleClassName="text-secondary-a"
            descriptionClassName="text-secondary-a sm:text-base text-xs"
          />

          <Input
            type="text"
            value={customAlias}
            onChange={handleCustomAliasChange}
            placeholder="Enter your custom alias here"
            className="sm:w-[50%] w-[80%] h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75 mb-4"
            disabled={!isToggled}
          />

          <ToggleButton
            title="Link Tracking (optional)"
            description="Enable this to track the traffic of your URL"
            onClick={handleToggle}
            className="mb-4"
            titleClassName="text-secondary-a"
            descriptionClassName="text-secondary-a sm:text-base text-xs"
          />
        </div>
        <div className="mt-4">
          <ToggleButton
            title="Link Expiration (optional)"
            description="Enable this to set link expiration"
            onClick={toggleDateTimePicker}
            className="mb-4"
            titleClassName="text-secondary-a"
            descriptionClassName="text-secondary-a sm:text-base text-xs"
          />
          <DateTimePicker disabled={!isDateTimePickerToggled} />
        </div>
        <div className="mt-4 grid ">
          <div className="">
            <ToggleButton
              title="QR Code (optional)"
              description="Enable this to generate a QR code"
              onClick={handleToggle}
              className="mb-4"
              titleClassName="text-secondary-a"
              descriptionClassName="text-secondary-a sm:text-base text-xs"
            />
          </div>

        </div>

        <div className="mt-4">
          <ToggleButton
            title="Set Password (optional)"
            description="Enable this to set a Password"
            onClick={togglePasswordSetting}
            className="mb-4"
            titleClassName="text-secondary-a"
            descriptionClassName="text-secondary-a sm:text-base text-xs"
          />

          <Input
            type="text"
            value={password}
            onChange={handlePassword}
            placeholder="Enter your password here..."
            className="sm:w-[50%] w-[80%] h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75 mb-4"
            disabled={!isPasswordToggled}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateLinks;
