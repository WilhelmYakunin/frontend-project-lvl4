import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import LogContext from '../contexts/logContext';
import ChatPage from './ChatPage';

const StartPage = ({ socket }) => {
  const log = React.useContext(LogContext);

  return (
    <Route
      render={() => (log.isLoged ? <ChatPage socket={socket} /> : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default StartPage;
