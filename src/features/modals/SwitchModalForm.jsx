import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import getModalFormType from './getModalFormType';
import { getModalType } from '../../store/selectors';
import { closeModal } from './modalFormsSlice';

const ModalForm = () => {
  const modalType = useSelector(getModalType);
  const dispatch = useDispatch();
  const ModalInner = getModalFormType(modalType);

  return modalType !== 'unset' && (
  <>
    <Modal
      animation={false}
      show
      onHide={() => dispatch(closeModal())}
      backdrop="static"
      centered
    >
      <ModalInner />
    </Modal>
  </>
  );
};

export default ModalForm;
