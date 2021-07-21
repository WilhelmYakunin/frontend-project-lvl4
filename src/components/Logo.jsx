import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Logo = () => {
  const { t } = useTranslation();

  return <Link to="/" className="mr-auto navbar-brand" href="/">{t('hexletChat')}</Link>;
};

export default Logo;
