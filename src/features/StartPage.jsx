import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import ChatPage from './ChatPage';

const StartPage = ({ socket }) => {
  const isAuthorized = localStorage.user !== undefined;

  return (
    <Route
      render={() => (isAuthorized ? <ChatPage socket={socket} /> : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default StartPage;
