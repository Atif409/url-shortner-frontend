import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import Home1 from '../assets/grapichs/home_1.webp';
import ShortenLinkIllus from '../assets/grapichs/home_short_link.webp';
import QRCodeIllus from '../assets/grapichs/home_qr_code.jpg';
import { useNavigate } from 'react-router';
const Home = () => {
  const [activeButton, setActiveButton] = useState('short');
  const [header, setHeader] = useState('Sign in to unlock pro features.');
  const [cardHeader, setCardHeader] = useState('Create a Short Link');
  const [inputLabel, setInputLabel] = useState('Enter Your Long URL');
  const [buttonText, setButtonText] = useState('Get your Shorten URL for Free');
  const [imageSrc, setImageSrc] = useState(ShortenLinkIllus);
  const navigate = useNavigate();
  const handleShortButtonClick = () => {
    setActiveButton('short');
    setHeader('Sign in to unlock pro features.');
    setCardHeader('Create a Short Link');
    setInputLabel('Enter Your Long URL');
    setButtonText('Get Your Shorten URL for Free');
    setImageSrc(ShortenLinkIllus);
  };

  const handleQRCodeButtonClick = () => {
    setActiveButton('qr');
    setHeader('Sign up for a free account to explore more options.');
    setCardHeader('Create a QR Code');
    setInputLabel('Enter Your Long URL');
    setButtonText('Get Your QR Code for Free');
    setImageSrc(QRCodeIllus);
  };

  return (
    <div className="bg-primary-c min-h-screen flex flex-col">
      <Header />

      <main className="grid sm:grid-cols-12 gap-4 mt-12 ">
        <div className="lg:col-span-6 col-span-12 sm:ml-12 ml-6 grid ">
          <div>
            <div className="p-4">
              <h1 className="text-secondary-a sm:text-5xl text-4xl font-bold tracking-wider">
                <span className="block mb-3">Build a Strong</span>
                <span className="block">Digital Connection</span>
              </h1>
            </div>
            <div className="p-4">
              <p className="text-secondary-a sm:text-2xl text-xl overflow-hidden">
                <span className="block">Take charge of your links like a boss! Shorten URLs,</span>
                <span className="block">track their success with fancy analytics, and give</span>
                <span className="block">them a stylish makeover with branding and QR codes.</span>
              </p>
            </div>
            <div className="p-4 flex flex-col">
              <Button
                text="Start for Free"
                className="bg-primary-a text-secondary-b w-48 h-auto flex justify-center items-center hover:opacity-75 rounded-lg font-bold"
                onClick={() => {
                  navigate('/signup');
                }}
              />
              <p className="mt-3 text-secondary-c text-sm ml-3">*No credit card required</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 hidden lg:flex justify-center items-center">
          <img src={Home1} alt="Sign Up Image" className="w-full max-w-md" />
        </div>
      </main>
      <div className="flex justify-center items-center flex-col bg-primary-a pb-12  ">
        <h1 className="text-secondary-b xsm:text-base sm:text-2xl text-xl font-bold mt-12 ">{header}</h1>

        <div className="flex flex-row items-center justify-center gap-3 w-1/2 mt-4">
          <Button
            text="Short"
            iconShow={['link']}
            iconPosition="left"
            className={`mt-2 text-nowrap w-auto h-10 font-bold text-lg sm:text-base rounded-md 
                            ${activeButton === 'short' ? 'bg-primary-c text-secondary-a' : 'bg-primary-a text-secondary-b border-primary-c border-2'} 
                            hover:opacity-75`}
            onClick={handleShortButtonClick}
          />

          <Button
            text="QR Code"
            iconShow={['qrcode']}
            iconPosition="left"
            className={`mt-2 text-nowrap w-auto h-10  font-bold text-lg sm:text-base rounded-md 
                            ${activeButton === 'qr' ? 'bg-primary-c text-secondary-a' : 'bg-primary-a text-secondary-b border-primary-c border-2'} 
                            hover:opacity-75`}
            onClick={handleQRCodeButtonClick}
          />
        </div>
        <div className="mt-8">
          <Card
            cardHeader={cardHeader}
            inputLabel={inputLabel}
            buttonText={buttonText}
            onClick={() => navigate('/signup')}
            imageSrc={imageSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
