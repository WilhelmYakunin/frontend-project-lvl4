import React from 'react';
import './locales/i18n';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import store from './app/store';
import AppHeader from './features/appHeader';
import Login from './features/login';
import Signup from './features/signup';
import NoMatch from './features/noMatch/NoMatch';
import Authorization from './features/authorization/Authorization';
import Modal from './features/modals/Switch';

const App = (socket) => {
  console.log(socket);
  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column h-100">
          <AppHeader />
          <Switch>
            <Authorization exact path="/" />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="*" component={NoMatch} />
          </Switch>
          <Modal />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
