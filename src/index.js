// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import '../assets/application.scss';
import 'bootstrap';
import initApp from './app/init.jsx';

const app = initApp();
const container = document.getElementById('chat');

ReactDOM.render(app, container);

export default initApp;
