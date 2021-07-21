// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import initLocalization from './locales/initLocalization.js';
import '../assets/application.scss';
import 'bootstrap';
import init from './app/init.jsx';

const app = init();

initLocalization().then(() => {
  const socket = io();
  const container = document.getElementById('chat');
  ReactDOM.render(init(socket), container);
});

export default app;
