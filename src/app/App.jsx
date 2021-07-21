import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import initLocalization from '../locales/initLocalization';
import AppHeader from '../features/AppHeader';
import Login from '../features/login/Login';
import Signup from '../features/signup/Signup';
import NoMatch from '../components/NoMatch';
import StartPage from '../features/StartPage';
import Modal from '../features/modals/Switch';

const App = ({ socket }) => {
  initLocalization();

  return (
    <Router>
      <React.Suspense fallback="Loading...">
        <div className="d-flex flex-column h-100">
          <AppHeader />
          <Switch>
            <StartPage exact path="/" socket={socket} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="*" component={NoMatch} />
          </Switch>
          <Modal socket={socket} />
        </div>
      </React.Suspense>
    </Router>
  );
};

export default App;
