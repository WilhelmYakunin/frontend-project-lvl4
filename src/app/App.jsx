import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import initLocalization from '../locales/initLocalization';
import { i18nLoaded, i18nError } from './i18nSlice';
import AppHeader from '../features/AppHeader';
import Login from '../features/login/Login';
import Signup from '../features/signup/Signup';
import NoMatch from '../components/NoMatch';
import StartPage from '../features/StartPage';
import Modal from '../features/modals/Switch';
import LoadSpinner from '../components/LoadSpinner';
import { isI18nInit } from '../selectors/selectors';

const App = ({ socket }) => {
  const dispatch = useDispatch();
  const isI18nLoaded = useSelector(isI18nInit);

  initLocalization().then(() => {
    try {
      dispatch(i18nLoaded());
    } catch (exception) {
      dispatch(i18nError(exception.message));
    }
  });

  return !isI18nLoaded ? <LoadSpinner /> : (
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
