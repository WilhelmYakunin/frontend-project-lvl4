import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider, useDispatch } from 'react-redux';
import rollbarConfig from '../rollbar/rollbar';
import createStore from '../store/createStore';
import Context from '../contexts/context';
import App from './App';
import { addMessage } from '../features/messages/messagesSlice';
import {
  addChannel, setCurrentChannel, renameChannel, deleteChannel,
} from '../features/channels/channelsSlice';
import getAuthData from '../API/getAuthData';
import getSignupData from '../API/getSignupData';

const init = (socket, preloadedState) => {
  const store = createStore(preloadedState);

  const context = {
    isLoged: localStorage.user !== undefined,
    logAttemptWith: async (userInfo) => {
      const data = await getAuthData(userInfo);
      localStorage.setItem('user', JSON.stringify(data));
      context.isLoged = true;
    },
    signupAttepmtWith: async (userInfo) => {
      const data = await getSignupData(userInfo);
      localStorage.setItem('user', JSON.stringify(data));
      context.isLoged = true;
    },
    quitLog: () => {
      localStorage.removeItem('user');
      context.isLoged = false;
    },
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
          <Context.Provider value={context}>
            <App />
          </Context.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export default init;
