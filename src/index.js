// @ts-check
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import Login from './features/login/index.js';

const init = () => App().then((vdom) => {
  render(<Login />, document.getElementById('chat'));
});

init();

export default init;
