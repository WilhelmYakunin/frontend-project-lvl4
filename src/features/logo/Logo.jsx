import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoStyles from './logoStyles';

const Logo = () => {
  const { t } = useTranslation();

  return <Link to="/" className={logoStyles} href="/">{t('hexletChat')}</Link>;
};

export default Logo;
