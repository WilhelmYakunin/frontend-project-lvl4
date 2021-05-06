import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { requestLogout, receiveLogout, logoutError } from '../reducers/authorizationSlice';

export default function QuitButton() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthorized = localStorage.user !== undefined;

  const logOut = (e) => {
    e.preventDefault();
    try {
      dispatch(requestLogout());
      localStorage.clear();
      dispatch(receiveLogout());
      location.replace('/');
    } catch (exception) {
      dispatch(logoutError(exception.message));
    }
  };

  return (!isAuthorized ? null
    : (
      <button type="button" onClick={logOut} className="btn btn-primary">
        {t('logout')}
      </button>
    )
  );
}
