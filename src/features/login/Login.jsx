import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { login, loginError } from './loginSlice';
import LogContext from '../../contexts/logContext';
import routes from '../../API/routes';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const log = React.useContext(LogContext);
  const logIn = () => log.logToggler();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (userInfo, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true);
      setErrors({ authFailed: false });
      const { username, password } = userInfo;
      const loginUrl = routes.loginPath();
      try {
        const { data } = await axios.post(
          loginUrl,
          { username, password },
        );
        localStorage.setItem('user', JSON.stringify(data));
        logIn();
        dispatch(login());
        resetForm();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (exception) {
        const { message } = exception;
        if (exception.isAxiosError && exception.response
          && exception.response.status === 401) {
          dispatch(loginError(message));
          return setErrors({ authFailed: true });
        }
        dispatch(loginError(message));
      }
      return setSubmitting(false);
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <Form.Group>
              <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
              <Form.Control
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder={t('login.username')}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={formik.touched.username && formik.errors.authFailed === true}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={t('login.password')}
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={formik.touched.password && formik.errors.authFailed === true}
                required
              />
              <Form.Control.Feedback type="invalid">{t('login.authFailed')}</Form.Control.Feedback>
            </Form.Group>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
              {t('login.submit')}
            </button>
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">{t('login.newToChat')}</span>
              <Link to="/signup">{t('login.signup')}</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
