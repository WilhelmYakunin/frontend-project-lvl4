// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'bootstrap';

import { render } from 'react-dom';
import App from './App.jsx';

const init = () => {
  const mountNode = document.getElementById('chat');
  const vdom = App();
  render(vdom, mountNode);
};

init();

export default init;
