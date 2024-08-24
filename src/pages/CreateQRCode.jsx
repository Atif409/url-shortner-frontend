import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';
import Modal from 'react-modal';
import QRCode from 'react-qr-code';
const CreateQRCode = () => {
  const [url, changeURL] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);
  return (
    <div className="flex flex-col bg-primary-c lg:pl-8 lg:mt-8">
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
        <div className="flex justify-center ">
          <QRCode size={128} value={url} />
        </div>

        <div className="w-full flex items-center justify-center mt-4">
          <Button
            text="Close"
            onClick={closeModal}
            className="flex items-center justify-center bg-primary-b text-secondary-b  font-bold rounded-md hover:bg-primary-d transition"
            iconShow={['fa-solid', 'xmark']}
            iconClassName="text-xl "
          />
        </div>
      </Modal>
      <div className="">
        <h1 className="font-bold text-secondary-a sm:text-4xl text-2xl lg:tracking-widest tracking-wider">
          Create QR Code
        </h1>
        <div>
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-cols-12 w-full bg-primary-c rounded-xl lg:gap-4 lg:p-4">
              <div className="1025:col-span-8 col-span-12 flex flex-col gap-6">
                <div className="flex flex-col">
                  {/* <h2 className="text-secondary-a sm:text-4xl text-3xl font-bold tracking-wider">{cardHeader}</h2> */}
                </div>

                <div className="flex flex-col  w-[70vw]">
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => changeURL(e.target.value)}
                    placeholder="https://urlShorten.com/"
                    label="Enter Your URL"
                    labelClassName="my-1 text-secondary-a sm:text-2xl text-xl font-bold tracking-wide mb-1"
                    className=" h-10 md:w-[60%] w-full border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75"
                  />
                  <Button
                    text="Generate QR Code"
                    onClick={() => {
                      setModalIsOpen(true);
                    }}
                    className="mt-2 bg-primary-b text-secondary-b md:w-[30%] h-auto flex justify-center items-center font-bold text-xs sm:text-base hover:opacity-75 rounded-lg"
                  />
                </div>
              </div>

              <div className="1025:flex hidden col-span-4 items-center justify-center ">
                {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcY0hCdAgzbtF2AM8B9ESuvzALzmiDNR9Ow&s"
                alt="Related"
              /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQRCode;
