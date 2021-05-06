import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import Chat from './chat/Chat';

export default function IsLoggedIn() {
  const isAuthorized = localStorage.user !== undefined;

  return (
    <Route
      render={() => (isAuthorized ? <Chat /> : (
        <Redirect to="/login" />
      ))}
    />
  );
}
