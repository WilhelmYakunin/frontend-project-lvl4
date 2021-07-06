import React from 'react';
import Logo from '../logo';
import Logout from '../logout';
import appHeader from './appHeaderStyles';

const AppHeader = () => (
  <nav className={appHeader}>
    <Logo />
    <Logout />
  </nav>
);

export default AppHeader;
