import React from 'react';
import './locales/i18n';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import rollbarConfig from './rollbar';
import store from './app/store';
import AppHeader from './features/appHeader';
import Login from './features/login';
import Signup from './features/signup';
import NoMatch from './features/noMatch/NoMatch';
import Authorization from './features/authorization/Authorization';
import Modal from './features/modals/Switch';

const App = async (socket) => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <div className="d-flex flex-column h-100">
            <AppHeader />
            <Switch>
              <Authorization exact path="/" socket={socket} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="*" component={NoMatch} />
            </Switch>
            <Modal socket={socket} />
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
