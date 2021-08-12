import axios from 'axios';
import routes from './routes.js';

const signupUrl = routes.signupPath();

const getSignupData = async (signupInputInfo) => {
  const { username, password } = signupInputInfo;
  const { data } = await axios.post(
    signupUrl,
    { username, password },
  );
  return data;
};

export default getSignupData;
