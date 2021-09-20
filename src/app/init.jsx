import React, { useState } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider, useDispatch } from 'react-redux';
import rollbarConfig from '../rollbar';
import createStore from '../store/createStore';
import AuthContext from '../contexts/AuthContext';
import SocketContext from '../contexts/SocketContext';
import App from './App';
import subscribeSocekts from '../API/sockets';
// import Interceptor from '../Interceptor';

const init = (socket, preloadedState) => {
  const store = createStore(preloadedState);
  // Interceptor.interceptor(store);

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
    const dispatch = useDispatch();
    subscribeSocekts(socket, dispatch);

    const SocketAPIContext = {
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

export default init;
