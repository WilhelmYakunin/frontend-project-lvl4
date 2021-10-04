import React, { useContext } from 'react';
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
  const { logIn } = useContext(AuthContext);

  const handleLoginAttempt = async (userInfo, { setErrors, resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      const loginPath = routes.loginPath();
      const { data } = await axios.post(loginPath, userInfo);
      await logIn(data);
      resetForm();
      const { from } = location.state || { from: { pathname: '/' } };
      await history.replace(from);
    } catch (exception) {
      if (exception.isAxiosError && exception.response.status === 401) {
        return setErrors({ authFailed: true });
      }
    }
    return setSubmitting(false);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow">
            <div className="card-body row p-5">
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
                  <Form className="m-auto p-3 w-50">
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
                          'form-control shadow',
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
                          'form-control shadow',
                          !isValid && 'is-invalid',
                        )}
                      />
                      {errors.authFailed && <div className="invalid-feedback">{t('login.authFailed')}</div>}
                    </div>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3 btn shadow"
                      disabled={isSubmitting}
                    >
                      {t('login.submit')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="small mr-2">{t('login.newToChat')}</span>
                <Link className="text-primary" to="/signup">{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
