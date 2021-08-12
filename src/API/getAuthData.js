import axios from 'axios';
import routes from './routes.js';

const loginUrl = routes.loginPath();

const getAuthData = async (userInfo) => {
  const { username, password } = userInfo;
  const { data } = await axios.post(
    loginUrl,
    { username, password },
  );
  return data;
};

export default getAuthData;
