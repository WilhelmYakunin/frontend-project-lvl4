import axios from 'axios';
import routes from './routes.js';

const loginUrl = routes.loginPath();

const getAuthData = async (userInfo) => {
  const { data } = await axios.post(
    loginUrl,
    userInfo,
  );

  return data;
};

export default getAuthData;
