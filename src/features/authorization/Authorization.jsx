import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import SpinnerChatSwitch from '../spinnerChatSwitch';

const Authorization = () => {
  const isAuthorized = localStorage.user !== undefined;

  return (
    <Route
      render={() => (isAuthorized ? <SpinnerChatSwitch /> : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default Authorization;
