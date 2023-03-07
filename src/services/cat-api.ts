import axios from 'axios';
import Config from './config';

const catAPI = () => {
  return axios({
    method: 'get',
    baseURL: Config.CAT_API_URL,
    url: '/search',
    params: {
      limit: 5,
    },
    headers: {
      'x-api-key': Config.API_KEY,
    },
  });
};

export default catAPI;
