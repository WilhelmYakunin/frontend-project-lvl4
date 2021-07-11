// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';
import { io } from 'socket.io-client';
import '../assets/application.scss';
import 'bootstrap';
import App from './App.jsx';

// const socket = io();
// App(socket).then((vdom) => render(vdom, document.getElementById('chat')));

export default App;
