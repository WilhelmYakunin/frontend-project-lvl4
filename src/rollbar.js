const rollbarConfig = {
  accessToken: process.env.ACCESS_TOKEN_ROLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

export default rollbarConfig;
