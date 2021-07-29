import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';
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

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={async (userInfo, { setErrors, setSubmitting, resetForm }) => {
              setSubmitting(true);
              const { username, password } = userInfo;
              const loginUrl = routes.loginPath();
              try {
                const loginResponse = await axios.post(
                  loginUrl,
                  { username, password },
                );
                const loginInfo = loginResponse.data;
                localStorage.setItem('user', JSON.stringify(loginInfo));
                logIn();
                dispatch(login());
                resetForm();
                const { from } = location.state || { from: { pathname: '/' } };
                history.replace(from);
              } catch (exception) {
                const { message } = exception;
                if (exception.isAxiosError && exception.response.status === 401) {
                  dispatch(loginError(message));
                  return setErrors({ authFailed: true });
                }
                dispatch(loginError(message));
              }
              return setSubmitting(false);
            }}
          >
            {({ errors, isValid, touched }) => (
              <Form className="p-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    {t('login.username')}
                  </label>
                  <Field
                    autoFocus
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className={cn(
                      'form-control',
                      !!touched && (!isValid && 'is-invalid'),
                    )}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    {t('login.password')}
                  </label>
                  <Field
                    type="password"
                    name="password"
                    autoComplete="password"
                    required=""
                    id="password"
                    className={cn(
                      'form-control',
                      !!touched && (!isValid && 'is-invalid'),
                    )}
                  />
                  {errors.authFailed && <div className="invalid-feedback">{t('login.authFailed')}</div>}
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                  {t('login.submit')}
                </button>
                <div className="d-flex flex-column align-items-center">
                  <span className="small mb-2">{t('login.newToChat')}</span>
                  <Link to="/signup">{t('login.signup')}</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
