import axios from 'axios';

const interceptor = (store) => {
  axios.interceptors.request.use(
    (conf) => {
      alert('front req');
      return conf;
    },
    (error) => {
      alert('front111', axios.defaults);
      return Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    (next) => {
      alert('front res');
      return Promise.resolve(next);
    },
    (error) => {
      console.log('front 222', axios.defaults);
      return Promise.reject(error);
    },
  );
};

export default {
  interceptor,
};
