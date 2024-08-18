import React, { useEffect, useState } from 'react';
import ToggleButton from '../components/ToggleButton';
import Input from '../components/Input';
import Button from '../components/Button';
import DateTimePicker from '../components/DateTimePicker';
import toast from 'react-simple-toasts';
import { localStorageService } from '../utils/localStorageService';
import { createLink, getLink, updateLink } from '../services/link.api';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
Modal.setAppElement('#root');
const CreateLinks = () => {
  const { id } = useParams();
  const [linkTracking, isLinkTracking] = useState(false);
  const [qrCode, isQrCode] = useState(false);
  const [isCustomAlias, setisCustomAlias] = useState(false);
  const [isDateTimePickerToggled, setIsDateTimePickerToggled] = useState(false);
  const [isPasswordToggled, setIsPasswordToggled] = useState(false);
  const [linkCreating, setLinkCreating] = useState(false);
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [alias, setAlias] = useState('');
  const [shortId, setShortId] = useState('');
  const [expirationTime, setExpirationTime] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [linkLoading, setLinkLoading] = useState(id ? true : false);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleCustomAliasChange = (e) => setAlias(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const setExistingLinkData = (linkData) => {
    setUrl(linkData.original_link);
    if (linkData.is_custom_alias) {
      setisCustomAlias(true);
      setAlias(linkData.custom_alias);
    }
    if (linkData.is_expiration) {
      setIsDateTimePickerToggled(true);
      setExpirationTime(new Date(linkData.expiration_date));
    }
    if (linkData.is_password) {
      setIsPasswordToggled(true);
      setPassword(linkData.password);
    }
    isQrCode(linkData.is_qr_code_enabled);
    isLinkTracking(linkData.is_tracking_enabled);
  };
  useEffect(() => {
    const fetchLinkData = async () => {
      if (id) {
        const linkData = await getLink({ id });
        setExistingLinkData(linkData.data.data);
        setLinkLoading(false);
      } else {
        setLinkLoading(false);
      }
    };
    fetchLinkData();
  }, []);
  const toggleAliasSetting = () => {
    setisCustomAlias(!isCustomAlias);
  };
  const toggleDateTimePicker = () => {
    setIsDateTimePickerToggled(!isDateTimePickerToggled);
  };
  const togglePasswordSetting = () => {
    setIsPasswordToggled(!isPasswordToggled);
  };

  const createGenerateLinkData = () => {
    const linkData = {
      user_id: localStorageService.getItem('user_id'),
      original_link: url,
      is_password: isPasswordToggled,
      is_custom_alias: isCustomAlias,
      is_preview_enabled: false,
      is_expiration: isDateTimePickerToggled,
      is_tracking_enabled: linkTracking,
      is_qr_code_enabled: qrCode,
      is_smart_link: false,
    };
    if (isPasswordToggled) {
      linkData.password = password;
    }
    if (isCustomAlias) {
      linkData.custom_alias = alias;
    }
    if (isDateTimePickerToggled) {
      linkData.expiration_date = expirationTime;
    }
    if (id) {
      linkData.id = id;
    }
    return linkData;
  };
  const createShortLink = async () => {
    if (!url) {
      toast('Please enter a destination url');
    } else if (isCustomAlias && !alias) {
      toast('Please choose a unique alias');
    } else if (isDateTimePickerToggled && !expirationTime) {
      toast('Please choose an expiration time or disabled the set expiration');
    } else if (isPasswordToggled && !password) {
      toast('Please choose some password or diabled the set password');
    } else {
      const linkData = createGenerateLinkData();
      setLinkCreating(true);
      try {
        const response = await (id ? updateLink(linkData) : createLink(linkData));
        if (response.data.success) {
          setShortId(response.data.data.shorten_link);
          if (!id) toast('Link created successfully!');
          openModal();
        } else {
          toast(`Sorry Failed to create link \n ${response.data.message}`);
        }
      } catch (error) {
        toast(`Sorry Failed to create link. Unexpected problem please try again!`);
      }
      setLinkCreating(false);
    }
  };
  return (
    <>
      {linkLoading ? (
        <h1>Loading Link...</h1>
      ) : (
        <div className="flex flex-col items-start bg-primary-c p-8">
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
            {!id && <h2>Thanks for creating a shorten Link;</h2>}
            {id && <h2>Your Shorten Link Updated successfully;</h2>}
            <h3>
              Your shorten Link is {import.meta.env.VITE_APP_BASE_URL}/{isCustomAlias ? alias : shortId}
            </h3>
            <h5>For more details please check Manage shorten link section</h5>
            <button onClick={closeModal}>Close</button>
          </Modal>
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
                text={!id ? 'Shorten your Link' : 'Update your Link'}
                onClick={() => {
                  createShortLink();
                }}
                disabled={linkCreating}
                isLoading={linkCreating}
                className="bg-primary-b text-secondary-b lg:w-[20%] sm:w-[30%] w-[60%] h-auto font-bold text-xs lg:text-base hover:opacity-75 rounded-lg"
                iconShow={['arrow-right']}
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
                isToggled={isCustomAlias}
                onClick={toggleAliasSetting}
                className="mb-4"
                titleClassName="text-secondary-a"
                descriptionClassName="text-secondary-a sm:text-base text-xs"
              />

              {isCustomAlias && (
                <Input
                  type="text"
                  value={alias}
                  onChange={handleCustomAliasChange}
                  placeholder="Enter your custom alias here"
                  className="sm:w-[50%] w-[80%] h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75 mb-4"
                  disabled={!isCustomAlias}
                />
              )}

              <ToggleButton
                title="Link Tracking (optional)"
                description="Enable this to track the traffic of your URL"
                isToggled={linkTracking}
                onClick={() => {
                  isLinkTracking(!linkTracking);
                }}
                className="mb-4"
                titleClassName="text-secondary-a"
                descriptionClassName="text-secondary-a sm:text-base text-xs"
              />
            </div>
            <div className="mt-4">
              <ToggleButton
                title="Link Expiration (optional)"
                description="Enable this to set link expiration"
                isToggled={isDateTimePickerToggled}
                onClick={toggleDateTimePicker}
                className="mb-4"
                titleClassName="text-secondary-a"
                descriptionClassName="text-secondary-a sm:text-base text-xs"
              />
              {isDateTimePickerToggled && (
                <DateTimePicker
                  defaultDate={expirationTime}
                  disabled={!isDateTimePickerToggled}
                  onChange={(dateTime) => {
                    setExpirationTime(new Date(dateTime).toISOString());
                  }}
                />
              )}
            </div>
            <div className="mt-4 grid ">
              <div className="">
                <ToggleButton
                  title="QR Code (optional)"
                  description="Enable this to generate a QR code"
                  isToggled={qrCode}
                  onClick={() => {
                    isQrCode(!qrCode);
                  }}
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
                isToggled={isPasswordToggled}
                onClick={togglePasswordSetting}
                className="mb-4"
                titleClassName="text-secondary-a"
                descriptionClassName="text-secondary-a sm:text-base text-xs"
              />

              {isPasswordToggled && (
                <Input
                  type="text"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Enter your password here..."
                  className="sm:w-[50%] w-[80%] h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75 mb-4"
                  disabled={!isPasswordToggled}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateLinks;
