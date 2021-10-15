import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

const AuthInput = ({
  formik, name, type, label, placeHolder, errMessage,
}) => (
  <Form.Group>
    <Form.Label htmlFor={name}>{label}</Form.Label>
    <Form.Control
      autoFocus
      onChange={formik.handleChange}
      value={formik.values[name]}
      placeholder={placeHolder}
      name={name}
      type={type}
      id={name}
      autoComplete={name === 'password' ? 'current-password' : 'false'}
      readOnly={formik.isSubmitting}
      className="shadow"
      isInvalid={Object.keys(formik.errors).length !== 0}
      required
    />
    <Form.Control.Feedback type="invalid">{errMessage}</Form.Control.Feedback>
  </Form.Group>
);

export default AuthInput;
