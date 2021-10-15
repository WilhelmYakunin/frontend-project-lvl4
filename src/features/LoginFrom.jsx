import React, { useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import routes from '../API/routes';
import AuthFormContainer from '../components/authFormContainer';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';

const LoginFrom = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const { logIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (userInfo, { setErrors, resetForm, setSubmitting }) => {
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
          return setErrors({ loginFailed: true });
        }
      }
      return setSubmitting(false);
    },
  });

  return (
    <>
      <AuthFormContainer>
        <Form onSubmit={formik.handleSubmit} className="m-auto p-3 w-50">
          <AuthInput
            name="username"
            formik={formik}
            label={t('login.username')}
            errMessage={t(formik.errors.username)}
          />
          <AuthInput
            name="password"
            type="password"
            formik={formik}
            label={t('login.password')}
            errMessage={t(formik.errors.password)}
          />
          <AuthButton text={t('login.submit')} isSubmitting={formik.isSubmitting} />
          { formik.errors.loginFailed && (
          <Alert variant="danger">
            {t('login.authFailed')}
          </Alert>
          ) }
        </Form>
      </AuthFormContainer>
      <div className="card-footer p-4">
        <div className="text-center">
          <span className="small mr-2">{t('login.newToChat')}</span>
          <Link className="text-primary" to="/signup">{t('login.signup')}</Link>
        </div>
      </div>
    </>
  );
};

export default LoginFrom;
