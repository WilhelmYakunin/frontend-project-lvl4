import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';
import AuthContext from '../contexts/AuthContext';
import routes from '../API/routes';

const LoginFrom = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const { logIn } = React.useContext(AuthContext);
  const handleLoginAttempt = async (userInfo, { setErrors, resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      const loginPath = routes.loginPath();
      const { data } = await axios.post(loginPath, userInfo);
      logIn(data);
      resetForm();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (exception) {
      if (exception.isAxiosError && exception.response
        && exception.response.status === 401) {
        return setErrors({ authFailed: true });
      }
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
            validateOnChange
            onSubmit={handleLoginAttempt}
          >
            {({
              errors, isSubmitting, isValid,
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
                      !isValid && 'is-invalid',
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
                      !isValid && 'is-invalid',
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
