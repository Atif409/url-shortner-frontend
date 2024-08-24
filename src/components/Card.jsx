import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const Card = ({ cardHeader, inputLabel, buttonText, imageSrc, onClick }) => {
  const [url, setUrl] = useState('');
  const handleUrlChange = (e) => setUrl(e.target.value);

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-12 w-full bg-primary-c rounded-xl lg:gap-4 p-4">
        <div className="1025:col-span-9 col-span-12 flex flex-col gap-4">
          <div className="flex flex-col">
            <h2 className="text-secondary-a sm:text-4xl text-3xl font-bold tracking-wider">{cardHeader}</h2>
            {/* <p className="mt-1 text-secondary-c text-sm ml-3">*No credit card required</p> */}
          </div>

          <div className="flex flex-col">
            <Input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://urlShorten.com/"
              label={inputLabel}
              labelClassName="my-1 text-secondary-a sm:text-3xl text-2xl font-bold tracking-wide"
              className="w-[90%] h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75"
            />
            <Button
              text={buttonText}
              onClick={() => {
                onClick();
              }}
              className="mt-2 bg-primary-b text-secondary-b xsm:w-[80%] lg:w-[40%] h-auto flex justify-center items-center font-bold text-xs sm:text-base hover:opacity-75 rounded-lg"
            />
          </div>
        </div>

        <div className="1025:flex hidden col-span-3 items-center justify-center">
          <img className="w-[250px] h-[250px]" src={imageSrc} alt="Related" />
        </div>
      </div>
    </div>
  );
};
export default Card;
