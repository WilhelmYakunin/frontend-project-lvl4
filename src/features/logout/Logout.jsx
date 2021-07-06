import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { logout, logoutError } from './logoutSlice';
import logoutBtnStyles from './logoutStyles';

const Logout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isLoged = localStorage.user !== undefined;
  const makeLogOut = async () => {
    try {
      await localStorage.clear();
      await dispatch(logout());
      const { from } = location.state || { from: { pathname: '/login' } };
      await history.replace(from);
    } catch (exception) {
      dispatch(logoutError(exception.message));
    }
  };

  return isLoged ? (
    <button type="button" onClick={makeLogOut} className={logoutBtnStyles}>
      {t('logout')}
    </button>
  ) : null;
};

export default Logout;
