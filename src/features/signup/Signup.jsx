import React from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { signup, signupError } from './signupSlice';
import routes from '../../API/routes';
import signupSchema from './signupSchema';
import LogContext from '../../contexts/logContext';

const Signup = () => {
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
                dispatch(signup());
                resetForm();
                logIn();
                const { from } = location.state || { from: { pathname: '/' } };
                history.replace(from);
                setSubmitting(false);
              } catch (exception) {
                const { message } = exception;
                if (exception.isAxiosError && exception.response.status === 401) {
                  dispatch(signupError(message));
                  setErrors({ authFailed: true });
                  return;
                }
                dispatch(signupError(message));
              }
            }}
          >
            {({ errors, isValid, touched }) => (
              <Form className="p-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    {t('signup.username')}
                  </label>
                  <Field
                    autoFocus
                    name="username"
                    placeholder={t('signup.usernameConstraints')}
                    autoComplete="username"
                    required=""
                    id="username"
                    className={cn(
                      'form-control',
                      !!touched && (!isValid && 'is-invalid'),
                    )}
                  />
                  {errors.username && <div className="invalid-feedback">{t(errors.username)}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    {t('signup.password')}
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder={t('signup.passMin')}
                    autoComplete="password"
                    required=""
                    id="password"
                    className={cn(
                      'form-control',
                      !!touched && (!isValid && 'is-invalid'),
                    )}
                  />
                  {(errors.password && touched.password) && <div className="invalid-feedback">{t(errors.password)}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">
                    {t('signup.confirm')}
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder={t('signup.mustMatch')}
                    autoComplete="confirmPassword"
                    required=""
                    id="confirmPassword"
                    className={`${'form-control password-icon'} 
                    ${((errors.confirmPassword && touched.confirmPassword)
                      || errors.invalidUser) && 'is-invalid'}`}
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
