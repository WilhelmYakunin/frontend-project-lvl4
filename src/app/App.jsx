import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
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

const App = () => {
  const { SubscribeSockets } = React.useContext(Context);

  initLocalization();
  SubscribeSockets();

  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <React.Suspense fallback={<LoadSpinner />}>
          <AppHeader />
          <Switch>
            <PrivateRoute exact path="/">
              <ChatPage exact path="/" />
            </PrivateRoute>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="*" component={NoMatch} />
          </Switch>
          <Modal />
        </React.Suspense>
      </Router>
    </div>
  );
};

export default App;
