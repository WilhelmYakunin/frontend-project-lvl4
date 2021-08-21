import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import initLocalization from '../locales/initLocalization';
import AppHeader from '../features/AppHeader';
import LoginFrom from '../features/LoginFrom';
import SignupFrom from '../features/signup/SignupFrom';
import NoMatch from '../components/NoMatch';
import ModalForm from '../features/modals/SwitchModalForm';
import LoadSpinner from '../components/LoadSpinner';
import ChatPage from '../features/ChatPage';
import AuthContext from '../contexts/AuthContext';
import SocketContext from '../contexts/SocketContext';

const PrivateRoute = ({ children, path }) => {
  const { isLoged } = React.useContext(AuthContext);

  return (
    <Route
      path={path}
      render={({ location }) => (isLoged()
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const App = () => {
  const { SubscribeSockets } = React.useContext(SocketContext);

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
            <Route path="/login" component={LoginFrom} />
            <Route path="/signup" component={SignupFrom} />
            <Route path="*" component={NoMatch} />
          </Switch>
          <ModalForm />
        </React.Suspense>
      </Router>
    </div>
  );
};

export default App;
