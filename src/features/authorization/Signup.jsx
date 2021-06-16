import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { requestLogin, receiveLogin, loginError } from './authorizationSlice';
import { setInitialState } from '../channels/channelsSlice';
import routes from '../../routes';

const SignupSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'signup.usernameConstraints')
    .max(20, 'signup.usernameConstraints')
    .required('signup.required'),
  password: yup.string()
    .min(6, 'signup.passMin')
    .required('signup.required'),
  confirmPassword: yup.string()
    .min(6, 'signup.passMin')
    .oneOf([yup.ref('password'), null], 'signup.mustMatch'),
});

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
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (userInfo, { setErrors, resetForm }) => {
              const { username, password } = userInfo;
              const signupUrl = routes.signupPath();
              try {
                dispatch(requestLogin());
                const loginResponse = await axios.post(
                  signupUrl,
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
                const { message } = exception;
                dispatch(loginError(message));
                if (message === 'Request failed with status code 409') {
                  setErrors({ invalidUser: 'signup.alreadyExists' });
                } else {
                  setErrors({ unknownError: 'unknownError' });
                }
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="p-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    {t('signup.username')}
                  </label>
                  <Field
                    name="username"
                    placeholder={t('signup.usernameConstraints')}
                    autoComplete="username"
                    required=""
                    id="username"
                    className={`${'form-control'} ${((errors.username && touched.password) || errors.invalidUser) && 'is-invalid'}`}
                  />
                  {errors.username ? (
                    <div className="invalid-feedback">{t(errors.username)}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    {t('signup.password')}
                  </label>
                  <Field
                    name="password"
                    placeholder={t('signup.passMin')}
                    autoComplete="password"
                    required=""
                    id="password"
                    className={`${'form-control'} ${(errors.password && touched.password) || errors.invalidUser ? 'is-invalid' : null}`}
                  />
                  {errors.password && touched.password ? (
                    <div className="invalid-feedback">{t(errors.password)}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">
                    {t('signup.confirm')}
                  </label>
                  <Field
                    name="confirmPassword"
                    placeholder={t('signup.mustMatch')}
                    autoComplete="confirmPassword"
                    required=""
                    id="confirmPassword"
                    className={`${'form-control'} ${(errors.confirmPassword && touched.confirmPassword) || errors.invalidUser ? 'is-invalid' : null}`}
                  />
                  { errors.confirmPassword ? (
                    <div className="invalid-feedback">{t(errors.confirmPassword)}</div>
                  ) : null }
                  { errors.invalidUser ? (
                    <div className="invalid-feedback">{t(errors.invalidUser)}</div>
                  ) : null }
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                  {t('signup.submit')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
