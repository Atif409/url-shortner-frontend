import React, { useState, useEffect } from 'react';
import DraggableList from '../components/DraggableList';
import Dropdown from '../components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Button';
import Input from '../components/Input';
import { countryNames } from '../data/countries';
import { createLink, updateLink } from '../services/link.api';
import { localStorageService } from '../utils/localStorageService';
import { Draggable } from 'react-drag-reorder';
import { useNavigate, useParams } from 'react-router-dom';
import { getLink } from '../services/link.api';
import Modal from 'react-modal';
import toast from 'react-simple-toasts';
import Loader from '../components/Loader';
import QRCode from 'react-qr-code';
import CustomModal from '../components/CustomModal';
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
const SmartLinks = () => {
  const { id } = useParams();
  const [redirectRule, setRedirectRule] = useState('');
  const [title, setTitle] = useState('');
  const [url, handleUrlChange] = useState('');
  const [redirectRules, setRedirectRules] = useState([]);
  const [linkCreating, setLinkCreating] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shortId, setShortId] = useState('');
  const [linkLoading, setLinkLoading] = useState(id ? true : false);
  const redirectOptions = ['Platform', 'Country', 'Device'];
  const [modalPrIsOpen, setModalPrIsOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/app/manage-links');
  };

  const openPrModal = () => setModalPrIsOpen(true);
  const closePrModal = () => setModalPrIsOpen(false);
  const redirectRuleTypeOptions = {
    Platform: ['iPhone', , 'iPad', 'Android', 'Microsoft Windows'],
    Country: countryNames,
    Device: ['Mobile', 'Desktop', 'Tablet'],
  };
  const [rulePr, setRulePr] = useState(['Platform', 'Country', 'Device']);
  let state = [];

  const setExistingLinkData = (linkData) => {
    setRulePr([...linkData.redirect_rule_priority]);
    handleUrlChange(linkData.original_link);
    setRedirectRules(linkData.redirect_rule);
    setTitle(linkData.title);
  };
  useEffect(() => {}, [rulePr]);
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

  const createGenerateSmartLinkData = () => {
    const linkData = {
      title: title,
      user_id: localStorageService.getItem('user_id'),
      original_link: url,
      is_password: false,
      is_custom_alias: false,
      is_preview_enabled: false,
      is_expiration: false,
      is_tracking_enabled: false,
      is_qr_code_enabled: false,
      is_smart_link: true,
      redirect_rule: JSON.stringify(redirectRules),
      redirect_rule_priority: JSON.stringify(rulePr),
    };
    if (id) {
      linkData.id = id;
    }
    return linkData;
  };
  const handleAddRedirectRule = () => {
    if (!redirectRule) return;
    let newRedirectRule = {};
    if (redirectRule === 'Platform') {
      newRedirectRule = {
        url: '',
        value: '',
        ruleType: 'Platform',
      };
    } else if (redirectRule === 'Country') {
      newRedirectRule = {
        url: '',
        value: '',
        ruleType: 'Country',
      };
    } else if (redirectRule === 'Device') {
      newRedirectRule = {
        url: '',
        value: '',
        ruleType: 'Device',
      };
    }
    setRedirectRules([...redirectRules, newRedirectRule]);
  };

  const getChangedPos = (currentPos, newPos) => {
    const temp = rulePr[currentPos];
    rulePr[currentPos] = rulePr[newPos];
    rulePr[newPos] = temp;
    setRulePr([...rulePr]);
  };

  const createSmartLink = async () => {
    console.log(state);
    // return;
    const linkData = createGenerateSmartLinkData();
    setLinkCreating(true);
    try {
      const response = await (id ? updateLink(linkData) : createLink(linkData));
      if (response.data.success) {
        setShortId(response.data.data.shorten_link);
        // if (!id) customToast('Link created successfully!');
        openModal();
      } else {
        customToast(`Sorry Failed to ${id ? 'update' : 'create'} link \n ${response.data.message}`);
      }
    } catch (error) {
      customToast(`Sorry Failed to ${id ? 'update' : 'create'} link. Unexpected problem please try again!`);
    }
    setLinkCreating(false);
  };
  if (linkLoading) {
    return <Loader title="Loading Smart Link..."></Loader>;
  }

  const getQrCodeLinkString = () => {
    return `${import.meta.env.VITE_APP_BASE_URL}/${shortId}`;
  };

  return (
    <div className="flex flex-col items-start bg-primary-c mt-8">
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        id={id}
        link={`${import.meta.env.VITE_APP_BASE_URL}/${shortId}`}
        qrCode={true}
        message={true ? 'Your QR Code is ' : ''}
      />
      <div className="lg:pl-8 lg:pr-8">
        <h1 className="font-bold text-secondary-a sm:text-4xl text-2xl lg:tracking-widest tracking-wider">
          {id ? 'Update' : 'Create'} Smart Shorten Link
        </h1>
        <h3 className="text-2xl font-medium mb-4 mt-4 text-secondary-a">Redirect Rules</h3>
      </div>
      {/* Select the redirect rule */}
      <div className="lg:pl-8  w-full flex sm:flex-row flex-col sm:gap-4 items-center">
        <Dropdown
          options={redirectOptions}
          placeholder="Select the Redirect Rule"
          value={redirectRule}
          onChange={(e) => setRedirectRule(e.target.value)}
          className="sm:w-1/3 w-full  text-secondary-a"
        />

        <div className="flex flex-col">
          <Button
            text="Add Redirect Rules"
            className="bg-primary-b text-secondary-b rounded-xl h-8 mt-1 flex items-center justify-center "
            onClick={handleAddRedirectRule}
          />
          <Button
            text="Set Priority"
            className="bg-primary-b text-secondary-b rounded-xl h-8 mt-1 flex items-center justify-center "
            onClick={openPrModal}
          />
        </div>
        <Modal
          isOpen={modalPrIsOpen}
          onRequestClose={closePrModal}
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
            {/* <Draggable onPosChange={getChangedPos} key={rulePr}>
              {rulePr.map((word, idx) => {
                return (
                  <div
                    className="bg-primary-b border-2 border-primary-c text-primary-c p-[2px] rounded-[4px]"
                    key={idx}
                  >
                    {word}
                  </div>
                );
              })}
            </Draggable> */}

            <DraggableList initialState={rulePr} onChange={(items) => setRulePr(items)} />
          </div>
        </Modal>
      </div>
      <div className="mt-2 lg:pl-8 lg:pr-8">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title for better Recognition"
          label="Title (Optional) "
          labelClassName=" text-secondary-a sm:text-1xl font-bold tracking-wider"
          className="w-80 h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75 rounded-lg"
        />
        <Input
          type="text"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://urlShorten.com/"
          label="Enter the default Destination Link (In Case of No Redirect Rules Applied)"
          labelClassName="my-3 text-secondary-a sm:text-sm text-sm font-bold tracking-wider"
          className="w-[80%] h-10 border-2 pl-2 border-primary-b focus:outline-none focus:border-primary-a text-secondary-a hover:opacity-75 rounded-lg"
        />
      </div>

      {/* Redirect Rules List */}
      {redirectRules &&
        redirectRules.map((rule, index) => (
          <div key={index} className="grid lg:grid-cols-2 grid-cols-1 lg:pl-8 lg:pr-8 gap-4 mt-8 w-full">
            <div>
              <Dropdown
                title={rule.ruleType}
                options={redirectRuleTypeOptions[rule.ruleType]}
                placeholder={`Select the ${rule.ruleType}`}
                value={rule.value}
                onChange={(e) => {
                  rule.value = e.target.value;
                  setRedirectRules(redirectRules.map((item, Newindex) => (index === Newindex ? rule : item)));
                }}
              />
            </div>

            <div className="grid grid-cols-12 gap-2 ">
              <div className="col-span-11">
                <Input
                  type="text"
                  label={`Destination URL for ${rule.ruleType}`}
                  placeholder="Enter the destination URL"
                  value={rule.url}
                  onChange={(e) => {
                    rule.url = e.target.value;
                    setRedirectRules(redirectRules.map((item, Newindex) => (index === Newindex ? rule : item)));
                  }}
                  className="border border-primary-b p-2 rounded-md w-full focus:outline-none "
                  labelClassName="text-secondary-a"
                />
              </div>
              <div className=" flex mt-8 justify-center col-span-1">
                <FontAwesomeIcon
                  icon="trash"
                  className="text-red-600 cursor-pointer text-2xl hover:text-red-800 "
                  onClick={() => {
                    setRedirectRules(redirectRules.filter((_, Newindex) => index !== Newindex));
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      <div className="lg:pl-8 lg:pr-8 mt-4">
        <Button
          className="bg-primary-b text-secondary-b rounded-xl h-8 mt-1 flex items-center justify-center "
          onClick={createSmartLink}
          text={`${id ? 'Update' : 'Create'} Smart Link`}
          isLoading={linkCreating}
        />
      </div>
    </div>
  );
};

export default SmartLinks;
