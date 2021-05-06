import React from 'react';
import ReactDOM from 'react-dom';
import './languages/i18n';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store/store';
import Logo from './components/Logo';
import Login from './components/Login';
import QuitButton from './components/QuitButton';
import Signup from './components/Signup';
import NoMatch from './components/NoMatch';
import IsLoggedIn from './components/IsLoggedIn';
import NewChannelModal from './components/modals/NewChannelModal';
import DeleteChannelModal from './components/modals/DeleteChannelModal';
import RenameModal from './components/modals/RenameModal';

export default function App() {
  const mountNode = document.querySelector('#chat');
  const persistor = persistStore(store);

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
              <Link className="mr-auto navbar-brand" to="/" component={Logo} />
              <QuitButton />
            </nav>
            <Switch>
              <IsLoggedIn exact path="/" />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </div>
          <NewChannelModal />
          <DeleteChannelModal />
          <RenameModal />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    mountNode,
  );
}
