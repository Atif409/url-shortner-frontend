import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from './Button';
import QRCode from 'react-qr-code';

import { createToast } from 'react-simple-toasts';
const customToast = createToast({
  duration: 3000,
  theme: 'dark',
  className: 'custom-toast',
  clickClosable: true,
  position: 'top-right',
  maxVisibleToasts: 1,

  render: (message) => <b className="my-toast bg-primary-b text-secondary-b p-2 rounded-2xl ">{message}</b>,
});
Modal.setAppElement('#root');
const CustomModal = ({
  isOpen,
  onRequestClose,
  id,
  link,
  title,
  message,
  copySuccess,
  handleCopyLink,
  modalStyles,
  overlayStyles,
  qrCode = false,
  ...props
}) => {
  const [copy, setCopy] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFFFFF',
          color: '#2C2F6F',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: 'none',
          boxShadow: '6px 6px 12px #4e4552,-6px -6px 12px #ffffff',
          width: '90%',
          maxWidth: '500px',
          ...modalStyles,
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          ...overlayStyles,
        },
      }}
    >
      <div className="text-center space-y-6">
        <h2 className="text-lg font-semibold">
          {id ? 'Your shortened link has been updated successfully.' : 'Thanks for creating a shortened link.'}
        </h2>

        <h3 className="flex flex-col items-center text-secondary-a">
          <span>Your shortened link is:</span>
          <span className="text-lg font-medium text-secondary-a mt-2">{link}</span>
        </h3>

        <div className="w-full flex items-center justify-center">
          <Button
            text={copy ? 'Copied!' : 'Copy Link'}
            onClick={() => {
              navigator.clipboard
                .writeText(`${link}`)
                .then(() => {
                  customToast('Short Link Copied!');
                })
                .catch(() => {
                  customToast('Failed to copy!');
                });
              setCopy(true);
              setTimeout(() => setCopy(false), 2000);
            }}
            iconShow={['fa-solid', 'copy']}
            className="flex items-center justify-center bg-primary-b text-secondary-b font-bold rounded-md hover:bg-primary-d transition"
          />
        </div>

        <h5 className="text-sm text-secondary-a mt-4">{message}</h5>
        {qrCode && (
          <div className="flex justify-center ">
            <QRCode size={128} value={link} />
          </div>
        )}
        <div className="w-full flex items-center justify-center">
          <Button
            text="Close"
            onClick={onRequestClose}
            className="flex items-center justify-center bg-primary-b text-secondary-b  font-bold rounded-md hover:bg-primary-d transition"
            iconShow={['fa-solid', 'xmark']}
            iconClassName="text-xl "
          />
        </div>
      </div>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  link: PropTypes.string.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  modalStyles: PropTypes.object,
  overlayStyles: PropTypes.object,
  qrCode: PropTypes.bool,
};

CustomModal.default = {
  title: 'Example Modal',
  modalStyles: {},
  overlayStyles: {},
};

export default CustomModal;
