import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

export const { t } = useTranslation();
export const dispatch = () => useDispatch();
export const location = () => useLocation();
export const history = () => useHistory();
