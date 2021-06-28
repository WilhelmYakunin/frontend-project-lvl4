import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { login, authError } from '../login/authorizationSlice';
import routes from '../../routes';
import signupSchema from './signupSchema';

const Signup = () => {
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
              confirmPassword: '',
            }}
            validationSchema={signupSchema}
            onSubmit={async (userInfo, { setSubmitting, setErrors, resetForm }) => {
              setSubmitting(true);
              const { username, password } = userInfo;
              const signupUrl = routes.signupPath();
              try {
                const loginResponse = await axios.post(
                  signupUrl,
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
                  {errors.username && <div className="invalid-feedback">{t(errors.username)}</div>}
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
                  {errors.password && touched.password && <div className="invalid-feedback">{t(errors.password)}</div>}
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
                  { errors.confirmPassword && <div className="invalid-feedback">{t(errors.confirmPassword)}</div> }
                  { errors.invalidUser && <div className="invalid-feedback">{t(errors.invalidUser)}</div>}
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
};

export default Signup;
