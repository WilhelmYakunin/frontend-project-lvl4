import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { login, loginError } from './LoginFromSlice';
import AuthContext from '../../contexts/AuthContext';

const LoginFrom = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { logAttemptWith } = React.useContext(AuthContext);
  const handleLoginAttempt = async (userInfo, { setErrors, resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      await logAttemptWith(userInfo);
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
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={handleLoginAttempt}
          >
            {({
              errors, isSubmitting, isValid, touched,
            }) => (
              <Form className="p-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    {t('login.username')}
                  </label>
                  <Field
                    autoFocus
                    placeholder={t('login.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    readOnly={isSubmitting}
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
                    placeholder={t('login.password')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    readOnly={isSubmitting}
                    required
                    className={cn(
                      'form-control',
                      !!touched && (!isValid && 'is-invalid'),
                    )}
                  />
                  {errors.authFailed && <div className="invalid-feedback">{t('login.authFailed')}</div>}
                </div>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3 btn"
                  disabled={isSubmitting}
                >
                  {t('login.submit')}
                </Button>
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

export default LoginFrom;
