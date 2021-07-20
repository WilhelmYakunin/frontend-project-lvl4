// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
// import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import '../assets/application.scss';
import 'bootstrap';
import init from './app/init.jsx';

const socket = io();
const app = init(socket);
const container = document.getElementById('chat');

ReactDOM.render(app, container);

export default app;
