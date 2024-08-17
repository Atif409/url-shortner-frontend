import axios from 'axios';
import prepareParams from '../utils/prepareParams';

const registerUser = async (data) => {
  // Convert the data to x-www-form-urlencoded format
  const formattedData = prepareParams(data);
  console.log(formattedData);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`, // Your API endpoint
      formattedData, // Formatted data
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // console.log('Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const loginUser = async (data) => {
  // Convert the data to x-www-form-urlencoded format
  const formattedData = prepareParams(data);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`, 
      formattedData, // Formatted data
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // console.log('Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const forgotPassword = async (data) => {
  const formattedData = prepareParams(data);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/forgot-password`, // Your API endpoint
      formattedData, // Formatted data
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // console.log('Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const verifyResetPasswordToken = async (data) => {
  const formattedData = prepareParams(data);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/verify-reset-password`, // Your API endpoint
      formattedData, // Formatted data
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // console.log('Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const changeUserPassword = async (data) => {
  const formattedData = prepareParams(data);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/create-new-password`, // Your API endpoint
      formattedData, // Formatted data
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // console.log('Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export { registerUser, loginUser, forgotPassword, verifyResetPasswordToken, changeUserPassword };
