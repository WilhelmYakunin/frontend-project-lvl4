import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { closeModal } from '../features/modals/modalFormsSlice';

const ModalFooter = ({ textCancel, textSubmit, submitButtonVariant }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          {textCancel}
        </Button>
        <Button type="submit" variant={submitButtonVariant}>{textSubmit}</Button>
      </Modal.Footer>
    </>
  );
};

export default ModalFooter;
