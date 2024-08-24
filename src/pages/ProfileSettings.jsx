import { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-simple-toasts';
import { localStorageService } from '../utils/localStorageService';
import { getUserData, updateUser } from '../services/user.api';
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
const ProfileSettings = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [profileData, serProfileData] = useState({});
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUpdate = async () => {
    setIsUpdateLoading(true);
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!email || !userName) {
      customToast('All fields are required');
    } else if (!validateEmail(email)) {
      customToast('Email is not valid');
    }

    // Add your sign up logic here
    else {
      const userData = { id: localStorageService.getItem('user_id'), username: userName, email: email };
      const userUpdatedResponse = await updateUser(userData);
      if (userUpdatedResponse.data.success) {
        customToast('Profile updated successfully');
      } else {
        customToast(userUpdatedResponse.data.message);
      }
    }
    setIsUpdateLoading(false);
  };
  useEffect(() => {
    if (profileData.user) {
      setEmail(profileData.user.email);
      setUserName(profileData.user.user_name);
    }
  }, [profileData]);
  useEffect(() => {
    const fetchData = async () => {
      const userData = { user_id: localStorageService.getItem('user_id') };
      try {
        setIsUpdateLoading(true);
        const user = await getUserData(userData);
        console.log(user);
        serProfileData(user.data.data);
      } catch (error) {
        customToast('Sorry! Something went wrong. Please try again later.');
      }
      setIsUpdateLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="p-2 w-full  h-[100vh] flex items-center justify-center">
      <div className="mb-4 flex flex-col gap-8 justify-center items-center">
        <div className="h-11 w-full min-w-[200px]">
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            label="Email"
            labelClassName="my-1"
            className="w-72 h-10 border-2 rounded-md border-primary-b focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-40
              "
          />
        </div>
        <div className="h-11 w-full min-w-[200px]">
          <Input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            label="User Name"
            labelClassName="my-1"
            className="w-72 h-10 border-2 rounded-md border-primary-b focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-40
              "
          />
        </div>
        <Button
          text="Update Profile"
          className="mt-8 bg-primary-b text-secondary-b w-36 h-8 flex justify-center items-center
          hover:opacity-75
          "
          onClick={() => {
            handleUpdate();
          }}
          isLoading={isUpdateLoading}
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
