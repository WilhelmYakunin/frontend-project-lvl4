import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import SpinnerChatSwitch from '../spinnerChatSwitch';

export default function Authorization() {
  const isAuthorized = localStorage.user !== undefined;

  return (
    <Route
      render={() => (isAuthorized ? <SpinnerChatSwitch /> : (
        <Redirect to="/login" />
      ))}
    />
  );
}
