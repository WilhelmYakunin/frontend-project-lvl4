import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AppHeader from '../features/appHeader/AppHeader';
import Login from '../features/login/Login';
import Signup from '../features/signup/Signup';
import NoMatch from '../features/noMatch/NoMatch';
import Authorization from '../features/authorization/Authorization';
import Modal from '../features/modals/Switch';

const App = ({ socket }) => (
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
);

export default App;
