import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { requestLogin, receiveLogin, loginError } from '../reducers/authorizationSlice';
import { setInitialState } from '../reducers/channelsSlice';
import routes from '../routes';

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={async (userInfo, { setErrors, resetForm }) => {
              const { username, password } = userInfo;
              const loginUrl = routes.loginPath();
              try {
                dispatch(requestLogin());
                const loginResponse = await axios.post(
                  loginUrl,
                  { username, password },
                );
                const loginInfo = loginResponse.data;
                const { token } = loginInfo;
                localStorage.setItem('user', JSON.stringify(loginInfo));
                dispatch(receiveLogin());
                const channelsDataUtl = routes.dataPath();
                const channelsDataResponse = await axios.get(
                  channelsDataUtl, {
                    headers: { Authorization: 'Bearer '.concat(token) },
                  },
                );
                dispatch(setInitialState(channelsDataResponse.data));
                resetForm();
                location.replace('/');
              } catch (exception) {
                dispatch(loginError(exception.message));
                setErrors({ authFailed: true });
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
                    className={`${'form-control'} ${errors.authFailed && touched.username ? 'is-invalid' : null}`}
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
                    className={`${'form-control'} ${errors.authFailed && touched.password ? 'is-invalid' : null}`}
                  />
                  {errors.authFailed ? (
                    <div className="invalid-feedback">{t('login.authFailed')}</div>
                  ) : null}
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
}
