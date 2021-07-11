import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import SpinnerChatSwitch from '../spinnerChatSwitch';

const Authorization = ({ socket }) => {
  const isAuthorized = localStorage.user !== undefined;

  return (
    <Route
      render={() => (isAuthorized ? <SpinnerChatSwitch socket={socket} /> : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default Authorization;
