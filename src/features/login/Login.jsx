import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { login, loginError } from './loginSlice';
import {
  wrapper, container, columnsStyles, formPadding, formStyle,
  formLabelStyles, loginBtnStyles, newCommersWrapper, newCommersSpanStyles,
} from './loginStyles';
import routes from '../../routes';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={wrapper}>
      <div className={container}>
        <div className={columnsStyles}>
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
            {({ errors, touched }) => (
              <Form className={formPadding}>
                <div className={formStyle}>
                  <label className={formLabelStyles} htmlFor="username">
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
                <div className={formStyle}>
                  <label className={formLabelStyles} htmlFor="password">
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
                <button type="submit" className={loginBtnStyles}>
                  {t('login.submit')}
                </button>
                <div className={newCommersWrapper}>
                  <span className={newCommersSpanStyles}>{t('login.newToChat')}</span>
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
