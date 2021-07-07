import React from 'react';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'bootstrap';
import './locales/i18n';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import store from './app/store';
import AppHeader from './features/appHeader';
import Login from './features/login';
import Signup from './features/signup';
import NoMatch from './features/noMatch/NoMatch';
import Authorization from './features/authorization';
import Modal from './features/modals/Switch';

const App = async () => (

      <div className="d-flex flex-column h-100">

          <Login exact path="/" />

      </div>

);

export default App;
