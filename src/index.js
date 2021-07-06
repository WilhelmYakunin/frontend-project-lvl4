// @ts-check

import { render } from 'react-dom';
import App from './App.jsx';

App().then((vdom) => {
  render(vdom, document.getElementById('chat'));
});
