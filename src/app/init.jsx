import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider, useDispatch } from 'react-redux';
import rollbarConfig from '../rollbar/rollbar';
import createStore from '../store/createStore';
import LogContext from '../contexts/logContext';
import App from './App';

const init = (socket, preloadedState) => {
  const store = createStore(preloadedState);

  const log = {
    isLoged: localStorage.user !== undefined,
    logToggler: () => {
      log.isLoged = !log.isLoged;
    },
  };

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <LogContext.Provider value={log}>
            <App socket={socket} />
          </LogContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export default init;
