import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-simple-toasts';
const ProfileSettings = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUpdate = async () => {
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-:])[A-Za-z\d@$!%*?&#\-:]{8,}$/;
    if (!email || !password || !userName) {
      toast('All fields are required');
    } else if (!validateEmail(email)) {
      toast('Email is not valid');
    } else if (passwordCriteria.test(password) == false) {
      toast(
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
    }

    // Add your sign up logic here
    else {
      const userData = { user_name: userName, email: email, password: password };

      try {
        setIsUpdateLoading(true);
      } catch (error) {
        toast('Sorry! Something went wrong. Please try again later.');
      }
    }
    setIsUpdateLoading(false);
  };

  return (
    <div className="p-2 w-full  h-[100vh] flex items-center justify-center">
      <div className="mb-4 flex flex-col gap-8 justify-center items-center">
        <div className="h-11 w-full min-w-[200px]">
          <Input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            label="Please Enter User Name"
            labelClassName="my-1"
            className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-40
              "
          />
        </div>
        <div className="h-11 w-full min-w-[200px]">
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            label="Please Enter Email"
            labelClassName="my-1"
            className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a 
              hover:opacity-40
              "
          />
        </div>
        <div className=" h-11 w-full min-w-[200px]">
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder=" "
            label="Please Enter Password"
            labelClassName="my-1"
            className="w-72 h-10 border-2 rounded-md border-primary-a focus:outline-none focus:border-primary-a text-secondary-a
              hover:opacity-40
              "
          />
        </div>
        <Button
          text="Update Profile"
          className="mt-8 bg-primary-a text-secondary-b w-36 h-8 flex justify-center items-center
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
