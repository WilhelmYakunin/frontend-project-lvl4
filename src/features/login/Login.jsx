import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { login, authError } from './authorizationSlice';
import routes from '../../routes';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

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
                dispatch(login());
                resetForm();
                const { from } = location.state || { from: { pathname: '/' } };
                history.replace(from);
                setSubmitting(false);
              } catch (exception) {
                const { message } = exception;
                if (exception.isAxiosError && exception.response.status === 401) {
                  dispatch(authError(message));
                  setErrors({ authFailed: true });
                  return;
                }
                dispatch(authError(message));
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="p-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    {t('login.username')}
                  </label>
                  <Field
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className={`${'form-control'} ${errors.authFailed && touched.username && 'is-invalid'}`}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    {t('login.password')}
                  </label>
                  <Field
                    name="password"
                    autoComplete="password"
                    required=""
                    id="password"
                    className={`${'form-control'} ${errors.authFailed && touched.password && 'is-invalid'}`}
                  />
                  {errors.authFailed && <div className="invalid-feedback">{t('login.authFailed')}</div>}
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                  {t('login.submit')}
                </button>
                <div className="d-flex flex-column align-items-center">
                  <span className="small mb-2">{t('login.newToChat')}</span>
                  <a href="/signup">{t('login.signup')}</a>
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
