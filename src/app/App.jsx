import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import initLocalization from '../locales/initLocalization';
import AppHeader from '../features/AppHeader';
import Login from '../features/login/Login';
import Signup from '../features/signup/Signup';
import NoMatch from '../components/NoMatch';
import Modal from '../features/modals/Switch';
import LoadSpinner from '../components/LoadSpinner';
import ChatPage from '../features/ChatPage';
import Context from '../contexts/context';

const PrivateRoute = ({ children, path }) => {
  const { isLoged } = React.useContext(Context);

  return (
    <Route
      path={path}
      render={({ location }) => (isLoged
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const App = ({ socket }) => {
  const { subscribeSockets } = React.useContext(Context);

  initLocalization();
  subscribeSockets();

  return (
    <Router>
      <React.Suspense fallback={<LoadSpinner />}>
        <div className="d-flex flex-column h-100">
          <AppHeader />
          <Switch>
            <PrivateRoute exact path="/">
              <ChatPage exact path="/" socket={socket} />
            </PrivateRoute>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="*" component={NoMatch} />
          </Switch>
          <Modal />
        </div>
      </React.Suspense>
    </Router>
  );
};

export default App;
