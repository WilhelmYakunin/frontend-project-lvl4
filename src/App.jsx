import React from 'react';
import ReactDOM from 'react-dom';
import './locales/i18n';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './app/store';
import Logo from './features/authorization/Logo';
import Login from './features/authorization/Login';
import LogOutBtn from './features/authorization/LogOutBtn';
import Signup from './features/authorization/Signup';
import NoMatch from './features/noMatch/NoMatch';
import Authorization from './features/authorization/Authorization';
import Modal from './features/modals/Modal';

export default function App() {
  const mountNode = document.querySelector('#chat');

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
            <Link className="mr-auto navbar-brand" to="/" component={Logo} />
            <LogOutBtn />
          </nav>
          <Switch>
            <Authorization exact path="/" />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
        <Modal />
      </BrowserRouter>
    </Provider>,
    mountNode,
  );
}
