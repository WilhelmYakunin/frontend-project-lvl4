import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { logout, authError } from './authorizationSlice';

export default function Logo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthorized = localStorage.user !== undefined;
  const location = useLocation();
  const history = useHistory();

  const logOut = async () => {
    try {
      await localStorage.clear();
      await dispatch(logout());
      const { from } = location.state || { from: { pathname: '/login' } };
      await history.replace(from);
    } catch (exception) {
      dispatch(authError(exception.message));
    }
  };

  return (
    <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
      <a className="mr-auto navbar-brand" href="/">{t('hexletChat')}</a>
      {!isAuthorized ? null
        : (
          <button type="button" onClick={logOut} className="btn btn-primary">
            {t('logout')}
          </button>
        )}
    </nav>

  );
}
