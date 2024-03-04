// apiService.js

const BASE_URL = 'https://example.com/api';

// Helper function to handle response
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// GET request
export const get = async (url) => {
  const response = await fetch(BASE_URL + url);
  return handleResponse(response);
};

// POST request
export const post = async (url, body) => {
  const response = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

// PUT request
export const put = async (url, body) => {
  const response = await fetch(BASE_URL + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

// DELETE request
export const del = async (url) => {
  const response = await fetch(BASE_URL + url, {
    method: 'DELETE',
  });
  return handleResponse(response);
};


//uses
import { get, post, put, del } from './apiService';

// Example usage
const fetchData = async () => {
  try {
    const data = await get('/endpoint');
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();
