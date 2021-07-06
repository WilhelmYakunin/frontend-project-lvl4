// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { render } from 'react-dom';

import '../assets/application.scss';
import 'bootstrap';
import App from './App.jsx';

App().then((vdom) => {
  render(vdom, document.getElementById('chat'));
});
