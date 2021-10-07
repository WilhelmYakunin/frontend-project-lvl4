import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import AppHeader from '../features/AppHeader';
import LoginFrom from '../features/LoginFrom';
import SignupFrom from '../features/signup/SignupFrom';
import NoMatch from '../components/NoMatch';
import ModalForm from '../features/modals/SwitchModalForm';
import LoadSpinner from '../components/LoadSpinner';
import ChatPage from '../features/ChatPage';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ children, path }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      path={path}
      render={({ location }) => (user
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <React.Suspense fallback={<LoadSpinner />}>
        <AppHeader />
        <Switch>
          <PrivateRoute exact path="/">
            <ChatPage exact path="/" />
          </PrivateRoute>
          <Route exact path="/login" component={LoginFrom} />
          <Route exact path="/signup" component={SignupFrom} />
          <Route path="*" component={NoMatch} />
        </Switch>
        <ModalForm />
      </React.Suspense>
    </Router>
  </div>
);

export default App;
