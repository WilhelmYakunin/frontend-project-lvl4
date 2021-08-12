import React from 'react';
import { useFormik } from 'formik';
import { Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { signup, signupError } from './signupSlice';
import signupSchema from './signupSchema';
import Context from '../../contexts/context';
import getSignupData from '../../API/getSignupData';

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const log = React.useContext(Context);
  const logIn = () => log.logToggler();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (userInfo, { setSubmitting, setErrors, resetForm }) => {
      setSubmitting(true);
      try {
        const data = await getSignupData(userInfo);
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(signup());
        resetForm();
        logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
        setSubmitting(false);
      } catch (exception) {
        const { message } = exception;
        if (exception.isAxiosError && exception.response.status === 409) {
          setErrors({ authFailed: true });
        }
        dispatch(signupError(message));
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <Form.Group>
              <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
              <Form.Control
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder={t('signup.usernameConstraints')}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={formik.touched.username && formik.errors.username}
                required
              />
              <Form.Control.Feedback type="invalid">{t(formik.errors.username)}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={t('signup.passMin')}
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">{t('signup.passMin')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">{t('signup.confirm')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder={t('signup.mustMatch')}
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="current-password"
                isInvalid={formik.touched.password || formik.errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{t('signup.mustMatch')}</Form.Control.Feedback>
            </Form.Group>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
              {t('signup.submit')}
            </button>
            { formik.errors.authFailed && (
            <Alert variant="danger">
              {t('signup.alreadyExists')}
            </Alert>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
