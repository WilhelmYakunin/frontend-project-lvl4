import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import Chat from '../Chat';

export default function Authorization() {
  const isAuthorized = localStorage.user !== undefined;

  return (
    <Route
      render={() => (isAuthorized ? <Chat /> : (
        <Redirect to="/login" />
      ))}
    />
  );
}
