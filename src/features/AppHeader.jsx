import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import Logo from '../components/Logo';

const AppHeader = () => {
  const [isActive, setActive] = useState(false);
  const { isLoged, logOut } = React.useContext(AuthContext);

  const { t } = useTranslation();

  const location = useLocation();
  const history = useHistory();

  const makeLogOut = () => {
    setActive(true);
    logOut();
    const { from } = location.state || { from: { pathname: '/login' } };
    history.replace(from);
    setActive(false);
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Logo />
        { isLoged
      && (
        <Button type="button" onClick={makeLogOut} variant="primary" disabled={isActive}>
          {t('logout')}
        </Button>
      )}
      </div>
    </nav>
  );
};

export default AppHeader;
