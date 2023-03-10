import axios from 'axios';
import {API_KEY, CAT_API_URL} from '@env';

const catAPI = () => {
  return axios({
    method: 'get',
    baseURL: CAT_API_URL,
    url: '/search',
    params: {
      limit: 5,
    },
    headers: {
      'x-api-key': API_KEY,
    },
  });
};

export default catAPI;
