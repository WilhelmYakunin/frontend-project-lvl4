// @ts-check

import { render } from 'react-dom';
import App from './App.jsx';

const init = () => App().then((vdom) => {
  render(vdom, document.getElementById('chat'));
});

init();

export default init;
