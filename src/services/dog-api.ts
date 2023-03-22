import axios from 'axios';
import {DOG_API_URL, API_KEY} from '@env';

const dogAPI = () => {
  return axios({
    method: 'get',
    baseURL: DOG_API_URL,
    url: '/search',
    params: {
      limit: 10,
    },
    headers: {
      'x-api-key': API_KEY,
    },
  });
};

export default dogAPI;
