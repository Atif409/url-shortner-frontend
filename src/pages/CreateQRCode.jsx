import React, { useRef, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { createToast } from 'react-simple-toasts';
import LottieAnimation from '../components/LottieAnimation';
import QrCodeLogo from '../assets/grapichs/temp.svg';
const customToast = createToast({
  duration: 3000,
  theme: 'dark',
  className: 'custom-toast',
  clickClosable: true,
  position: 'top-right',
  maxVisibleToasts: 1,

  render: (message) => <b className="my-toast bg-primary-b text-secondary-b p-2 rounded-2xl ">{message}</b>,
});
const CreateQRCode = () => {
  const [url, changeURL] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const qrCodeRef = useRef(null);

  const closeModal = () => setModalIsOpen(false);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col bg-primary-c lg:pl-8 lg:mt-8 pl-4 mt-2">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h5 className="text-sm text-secondary-a mb-4 font-semibold flex flex-col items-center justify-center">
          <span>Your QR code for</span>
          <span>{url}</span>
        </h5>
        <div className="flex justify-center" ref={qrCodeRef}>
          <QRCode size={300} value={url} />
        </div>
        <div className="w-full flex items-center justify-center mt-4 gap-4">
          <Button
            text="Download"
            onClick={downloadQRCode}
            iconShow={['fa-solid', 'download']}
            className="bg-primary-b text-secondary-b font-bold rounded-md hover:bg-primary-d transition"
          />
          <Button
            text="Close"
            onClick={closeModal}
            className="bg-primary-b text-secondary-b font-bold rounded-md hover:bg-primary-d transition"
            iconShow={['fa-solid', 'xmark']}
            iconClassName="text-xl"
          />
        </div>
      </Modal>
      <div>
        <h1 className="font-bold text-secondary-a sm:text-4xl text-2xl lg:tracking-widest tracking-wider">
          Generate Your QR Code Instantly
        </h1>
        <p className="text-secondary-a  overflow-hidden mt-4">
          <span className="block sm:text-xl text-sm">
            Convert any URL into a QR code for easy sharing and scanning.
          </span>
          <span className="block sm:text-xl text-sm">Just enter your link below, and we'll instantly generate</span>
          <span className="block sm:text-xl text-sm">a high-quality QR code for you to download and use.</span>
        </p>

        <div>
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-cols-12 w-full bg-primary-c rounded-xl lg:gap-4 lg:p-4">
              <div className="md:col-span-8 col-span-12 flex flex-col gap-6">
                <div className="flex flex-col">
                  {/* <h2 className="text-secondary-a sm:text-4xl text-3xl font-bold tracking-wider">{cardHeader}</h2> */}
                </div>

                <div className="flex flex-col w-[70vw]">
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => changeURL(e.target.value)}
                    placeholder="https://urlShorten.com/"
                    label="Enter Your URL"
                    labelClassName="my-1 text-secondary-a sm:text-xl text-lg font-bold tracking-wide mb-1 tracking-wide"
                    className="h-10 md:w-[60%] w-full border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75"
                  />
                  <Button
                    text="Generate QR Code"
                    onClick={() => {
                      if (!url) {
                        customToast('Please enter a valid URL');
                        return;
                      } else {
                        setModalIsOpen(true);
                      }
                    }}
                    className="mt-2 bg-primary-b text-secondary-b md:w-[30%] h-auto flex justify-center items-center font-bold text-xs sm:text-base hover:opacity-75 rounded-lg text-nowrap "
                  />
                </div>
                <div className="flex flex-col  lg:mt-0 mt-8 pb-2">
                  <h4 className="font-bold text-secondary-a sm:text-2xl text-lg lg:tracking-wide tracking-wide ">
                    Why Use Our QR Code Generator?
                  </h4>
                  <ul className="list-disc pl-4 space-y-2 text-secondary-a mt-4 sm:text-xl text-sm">
                    <li>Instantly create high-quality QR codes</li>
                    <li>Perfect for personal and business use</li>
                    <li>Embed QR codes in your marketing materials</li>
                    <li>Use QR codes for easy access to your website or social media</li>
                  </ul>
                </div>
              </div>

              <div className="md:flex hidden col-span-4 items-center justify-center flex-col">
                <h3 className="font-bold text-secondary-a sm:text-4xl text-2xl lg:tracking-wide tracking-wide">
                  Scan me
                </h3>
                {/* <LottieAnimation /> */}

                <div class="relative">
                  <img src={QrCodeLogo} alt="Image" class="w-full h-full object-cover mix-blend-multiply " />
                  <div class="absolute inset-0 bg-[#2C2F6F] opacity-10 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQRCode;
