import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import rollbarConfig from '../rollbar/rollbar';
import createStore from '../store/createStore';
import initLocalization from '../locales/initLocalization';
import App from './App';

const init = (socket, preloadedState) => {
  const store = createStore(preloadedState);

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <App socket={socket} />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export default init;
