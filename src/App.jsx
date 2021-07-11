import React from 'react';
import './locales/i18n';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { io } from 'socket.io-client';
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

const AppHOC = async (socket) => (
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
);

const App = (socket) => {
  if (socket) {
    return AppHOC(socket);
  }
  const serverSocket = io();
  return AppHOC(serverSocket).then((vdom) => render(vdom, document.getElementById('chat')));
};
export default App;
