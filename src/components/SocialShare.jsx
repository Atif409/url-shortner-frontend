import React from 'react';
import TikTokIcon from '../assets/grapichs/tiktok.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import copyToClipboard from '../utils/copyToClipBoard';
import { createToast } from 'react-simple-toasts';
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TelegramIcon,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  RedditIcon,
} from 'react-share';
import Modal from 'react-modal';
const customToast = createToast({
  duration: 3000,
  theme: 'dark',
  className: 'custom-toast',
  clickClosable: true,
  position: 'top-right',
  maxVisibleToasts: 1,

  render: (message) => <b className="my-toast bg-primary-b text-secondary-b p-2 rounded-2xl ">{message}</b>,
});
const SocialShare = ({ url = 'http://localhost:5173/app/social', title = '', open = false }) => {
  const [modalIsOpen, setModalIsOpen] = useState(open);
  const closeModal = () => setModalIsOpen(false);
  return (
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
      <div className="flex flex-col">
        <h1 className="mb-2 font-bold text-secondary-a lg:tracking-widest tracking-wider">
          Share your URL Shortener Link
        </h1>
        <div className="flex space-x-4 overflow-y-auto">
          <WhatsappShareButton url={`${url}?s=w`} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <FacebookShareButton url={`${url}?s=f`} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={`${url}?s=x`} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton url={`${url}?s=l`} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <EmailShareButton url={`${url}?s=e`} subject={title} body="Check out this content!">
            <EmailIcon size={32} round />
          </EmailShareButton>

          <TelegramShareButton url={`${url}?s=tg`} title={title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>

          <FacebookMessengerShareButton url={`${url}?s=m`} appId="YOUR_FACEBOOK_APP_ID">
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>

          <RedditShareButton url={`${url}?s=r`} title={title}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          {/* <TikTokShareButton url={`${url}?s=tk`} title={title} /> */}
        </div>
        <div className="mt-4 flex items-center border border-black rounded-lg overflow-hidden">
          <input
            type="text"
            disabled={true}
            value={url}
            className="w-full px-4 py-2 focus:outline-none"
            placeholder="Enter text here"
          />
          <div>
            <FontAwesomeIcon
              onClick={() => (copyToClipboard(url) == true ? customToast('Copied!') : customToast('Failed to Copy!'))}
              className="p-2 bg-gray-100 hover:bg-gray-200 border-l border-black"
              icon="copy"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

const TikTokShareButton = ({ url, title }) => {
  const handleShare = () => {
    // Open TikTok share dialog
    window.open(
      `https://www.tiktok.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      '_blank'
    );
  };

  return (
    <button onClick={handleShare}>
      <img src={TikTokIcon} alt="TikTok" width={32} height={32} />
    </button>
  );
};

export default SocialShare;
