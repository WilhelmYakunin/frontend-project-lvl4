import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Context from '../contexts/context';
import Logo from '../components/Logo';

const AppHeader = () => {
  const [isActive, setActive] = useState(false);
  const { isLoged, logToggler } = React.useContext(Context);

  const { t } = useTranslation();

  const location = useLocation();
  const history = useHistory();

  const logOut = () => logToggler();
  const makeLogOut = () => {
    setActive(true);
    logOut();
    localStorage.removeItem('user');
    const { from } = location.state || { from: { pathname: '/login' } };
    history.replace(from);
    setActive(false);
  };

  return (
    <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
      <Logo />
      { isLoged
      && (
        <Button type="button" onClick={makeLogOut} variant="primary" disabled={isActive}>
          {t('logout')}
        </Button>
      )}
    </nav>
  );
};

export default AppHeader;
