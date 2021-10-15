import React from 'react';
import { Button } from 'react-bootstrap';

const AuthButton = ({ text, isSubmitting }) => (
  <Button
    type="submit"
    variant="outline-primary"
    className="w-100 mb-3 btn shadow"
    disabled={isSubmitting}
  >
    {text}
  </Button>
);

export default AuthButton;
