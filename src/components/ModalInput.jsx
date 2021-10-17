import React from 'react';
import { Field } from 'formik';
import cn from 'classnames';

const ModalInput = ({
  dataTestid, ariaLabel, isValid, onBlur, error,
}) =>{ 

  return (
  <>
    <Field
      autoFocus
      name="name"
      data-testid={dataTestid}
      aria-label={ariaLabel}
      required
      className={cn(
        'mr-2 form-control',
        !isValid && 'is-invalid',
      )}
    />
    { error && <div className="invalid-feedback">{error}</div> }
  </>
)};

export default ModalInput;
