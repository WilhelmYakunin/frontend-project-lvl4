import React from 'react';
import ReactDOM from 'react-dom';
import './locales/i18n';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import store from './app/store';
import PublicPage from './features/authorization/PublicPage&Logo';
import Login from './features/authorization/Login';
import Signup from './features/authorization/Signup';
import NoMatch from './features/noMatch/NoMatch';
import Authorization from './features/authorization/Authorization';
import Modal from './features/modals/Switch';

const App = () => {
  const mountNode = document.querySelector('#chat');

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <PublicPage />
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
};

export default App;
