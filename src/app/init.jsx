import React, { useState } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import rollbarConfig from '../rollbar';
import createStore from '../store/createStore';
import AuthContext from '../contexts/AuthContext';
import SocketContext from '../contexts/SocketContext';
import App from './App';
import initLocalization from '../locales/initLocalization';
import registerSocketsHandlers from '../API/registerSocketsHandlers';

const initApp = (socket = io(), preloadedState) => {
  const store = createStore(preloadedState);

  const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const logIn = (userInfo) => {
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    };
    const logOut = () => {
      localStorage.removeItem('user');
      setUser(null);
    };
    const getAuthHeader = () => {
      if (user) return { Authorization: 'Bearer '.concat(user.token) };
      return {};
    };

    return (
      <AuthContext.Provider value={{
        user, logIn, logOut, getAuthHeader,
      }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  const SocketContextProdiver = ({ children }) => {
    initLocalization();
    const dispatch = useDispatch();
    registerSocketsHandlers(socket, dispatch);

    const emitEvent = (eventName, eventData) => socket.emit(eventName, eventData, (acknowledge) => {
      if (acknowledge.status === 'ok') {
        return 'ok';
      } throw new Error(`${eventName} socket error`);
    });

    const SocketAPIContext = {
      addMessage: (messageInfo) => emitEvent('newMessage', messageInfo),
      addChannel: (name) => emitEvent('newChannel', { name }),
      renameChannel: (renameChannelInfo) => emitEvent('renameChannel', renameChannelInfo),
      removeChannel: (removeChannelInfo) => emitEvent('removeChannel', removeChannelInfo),
    };

    return (
      <SocketContext.Provider value={SocketAPIContext}>
        {children}
      </SocketContext.Provider>
    );
  };

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketContextProdiver>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </SocketContextProdiver>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export default initApp;
