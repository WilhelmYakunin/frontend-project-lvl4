import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider, useDispatch } from 'react-redux';
import rollbarConfig from '../rollbar';
import createStore from '../store/createStore';
import AuthContext from '../contexts/AuthContext';
import SocketContext from '../contexts/SocketContext';
import App from './App';
import { addMessage } from '../features/messages/messagesSlice';
import {
  addChannel, setCurrentChannel, renameChannel, deleteChannel,
} from '../features/channels/channelsSlice';
import getAuthData from '../API/getAuthData';
import postSignupData from '../API/postSignupData';

const init = (socket, preloadedState) => {
  const store = createStore(preloadedState);

  const LogContext = {
    isLoged: localStorage.user !== undefined,
    logAttemptWith: async (userInfo) => {
      const data = await getAuthData(userInfo);
      localStorage.setItem('user', JSON.stringify(data));
      LogContext.isLoged = true;
    },
    signupAttepmtWith: async (userInfo) => {
      const data = await postSignupData(userInfo);
      localStorage.setItem('user', JSON.stringify(data));
      LogContext.isLoged = true;
    },
    quitLog: () => {
      localStorage.removeItem('user');
      LogContext.isLoged = false;
    },
  };

  const SocketAPIContext = {
    SubscribeSockets: () => {
      const dispatch = useDispatch();
      socket.on('newMessage', (newMessage) => dispatch(addMessage(newMessage)));
      socket.on('newChannel', (newChannel) => {
        dispatch(addChannel(newChannel));
        dispatch(setCurrentChannel(newChannel.id));
      });
      socket.on('renameChannel', (newName) => dispatch(renameChannel(newName)));
      socket.on('removeChannel', (requestedChannleId) => {
        const INITIAL_CURRENT_CHANNEL_ID = 1;
        dispatch(deleteChannel(requestedChannleId));
        dispatch(setCurrentChannel(INITIAL_CURRENT_CHANNEL_ID));
      });
    },
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
