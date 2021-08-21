import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import rollbarConfig from '../rollbar';
import createStore from '../store/createStore';
import AuthContext from '../contexts/AuthContext';
import SocketContext from '../contexts/SocketContext';
import App from './App';
import SubscribeSocketURLs from '../API/socketURLs';

const init = (socket, preloadedState) => {
  const store = createStore(preloadedState);

  const LogContext = {
    isLoged: () => localStorage.user !== undefined,
    logIn: (userInfo) => {
      localStorage.setItem('user', JSON.stringify(userInfo));
    },
    logOut: () => {
      localStorage.removeItem('user');
    },
  };

  const SocketAPIContext = {
    SubscribeSockets: () => SubscribeSocketURLs(socket),
    addMessage: (messageInfo) => socket.emit('newMessage', messageInfo, (acknowledge) => {
      if (acknowledge.status === 'ok') {
        return 'ok';
      } throw new Error('new message socket error');
    }),
    addChannel: (name) => socket.emit('newChannel', { name }, (acknowledge) => {
      if (acknowledge.status === 'ok') {
        return 'ok';
      } throw new Error('add new channel socket error');
    }),
    renameChannel: (renameChannelInfo) => socket.emit('renameChannel', renameChannelInfo,
      (acknowledge) => {
        if (acknowledge.status === 'ok') {
          return 'ok';
        } throw new Error('rename channel socket error');
      }),
    removeChannel: (removeChannelInfo) => socket.emit('removeChannel', removeChannelInfo, (acknowledge) => {
      if (acknowledge.status === 'ok') {
        return 'ok';
      } throw new Error('remove channel socket error');
    }),
  };

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AuthContext.Provider value={LogContext}>
            <SocketContext.Provider value={SocketAPIContext}>
              <App />
            </SocketContext.Provider>
          </AuthContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export default init;
