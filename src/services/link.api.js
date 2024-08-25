import axios from 'axios';
import { localStorageService } from '../utils/localStorageService';
import prepareParams from '../utils/prepareParams';

const createLink = async (data) => {
  // Convert the data to x-www-form-urlencoded format
  const formattedData = prepareParams(data);
  console.log(formattedData);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/links/create`, // Your API endpoint
      formattedData, // Formatted data
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorageService.getItem('token')}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateLink = async (data) => {
  // Convert the data to x-www-form-urlencoded format
  const formattedData = prepareParams(data);
  console.log(formattedData);
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/links/update`, // Your API endpoint
      formattedData, // Formatted data
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorageService.getItem('token')}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getRecentLink = async (data) => {
  // Convert the data to x-www-form-urlencoded format
  const formattedData = prepareParams(data);
  console.log(formattedData);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/links/getRecentLink`, // Your API endpoint
      {
        params: formattedData, // Query parameters
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorageService.getItem('token')}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getLink = async (data) => {
  // Convert the data to x-www-form-urlencoded format
  const formattedData = prepareParams(data);
  console.log(formattedData);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/links`, // Your API endpoint
      {
        params: formattedData, // Query parameters
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorageService.getItem('token')}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const deleteLink = async (data) => {
  // Convert the data to x-www-form-urlencoded format
  const formattedData = prepareParams(data);
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/links/delete`, // Your API endpoint
      {
        params: formattedData, // Query parameters
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorageService.getItem('token')}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getLinkList = async (data) => {
  // Convert the data to x-www-form-urlencoded format
  const formattedData = prepareParams(data);
  console.log(formattedData);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/links/list`, // Your API endpoint
      {
        params: formattedData, // Query parameters
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorageService.getItem('token')}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};
export { createLink, getLink, updateLink, getLinkList, deleteLink, getRecentLink };
