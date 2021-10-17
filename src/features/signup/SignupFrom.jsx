import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import signupSchema from './signupSchema';
import AuthContext from '../../contexts/AuthContext';
import AuthFormContainer from '../../components/authFormContainer';
import routes from '../../API/routes';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';

const SignupFrom = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const { logIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (userInfo, { setSubmitting, setErrors, resetForm }) => {
      setSubmitting(true);
      try {
        const signupUrl = routes.signupPath();
        const { data } = await axios.post(signupUrl, userInfo);
        logIn(data);
        resetForm();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
        setSubmitting(false);
      } catch (exception) {
        if (exception.isAxiosError && exception.response.status === 409) {
          setErrors({ signupFailed: true });
        }
        const { from } = location.state || { from: { pathname: '/signup' } };
        history.replace(from);
      }
    },
  });

  return (
    <AuthFormContainer>
      <Form onSubmit={formik.handleSubmit} className="m-auto p-3 w-50">
        <AuthInput
          name="username"
          formik={formik}
          label={t('signup.username')}
          placeHolder={t('signup.usernameConstraints')}
          errMessage={t(formik.errors.username)}
        />
        <AuthInput
          name="password"
          type="password"
          formik={formik}
          label={t('signup.password')}
          placeHolder={t('signup.passMin')}
          errMessage={t(formik.errors.password)}
        />
        <AuthInput
          name="confirm"
          type="password"
          formik={formik}
          label={t('signup.confirm')}
          placeHolder={t('signup.mustMatch')}
          errMessage={t('signup.mustMatch')}
        />
        <AuthButton text={t('signup.submit')} isSubmitting={formik.isSubmitting} />
        { formik.errors.signupFailed && (
        <Alert variant="danger">
          {t('signup.alreadyExists')}
        </Alert>
        )}
      </Form>
    </AuthFormContainer>
  );
};

export default SignupFrom;