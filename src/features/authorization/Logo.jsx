import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Logo() {
  const { t } = useTranslation();

  return (
    <a className="mr-auto navbar-brand" href="/">{t('hexletChat')}</a>
  );
}
