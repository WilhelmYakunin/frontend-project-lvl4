import React, { useState } from 'react';
import axios from 'axios';

const Interceptor = () => {
  const [authError, setauthError] = useState(false);

  axios.interceptors.request.use((response) => {
      console.log('HHH')
    return response
},
    (error) => {
        console.log(error)
      if (error.response.status === 401) {
        return setauthError(true);
      }
      return "1111";
    }, null, { synchronous: true });

  return authError && (
  <div>ERROR</div>
  );
};

export default Interceptor;
