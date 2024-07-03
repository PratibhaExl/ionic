
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ApiService = {
  get: async (url, params = {}) => {
    try {
      const response = await apiService.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data = {}) => {
    try {
      const response = await apiService.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data = {}) => {
    try {
      const response = await apiService.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await apiService.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiService;





//uses
import React, { useEffect, useState } from 'react';
import ApiService from './ApiService';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ApiService.get('/posts');
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default MyComponent;



//another call





// async postAddressTextQuery(prompt: string) {
        
//   await fetch(
//     "https://addressvalidation.googleapis.com/v1:validateAddress?key=",
//       {
//       body: JSON.stringify(
//         {
//           "textQuery" : "Spicy Vegetarian Food in Sydney, Australia"
//         },
        
      
//       ),
//       method: "POST",
//       headers: {
//           "content-type": "application/json",
//           "X-Goog-Api-Key": this.apiKey,
//           "X-Goog-FieldMask":"places.displayName,places.formattedAddress,places.priceLevel"
//       },
//           }
//   ).then((res) => {
//   console.log(res)
//   })
// }
//**************************** */






