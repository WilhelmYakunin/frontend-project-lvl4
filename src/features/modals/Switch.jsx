import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './getModalType';

const ModalDialog = () => {
  const modalType = useSelector((state) => state.modal.modalType);
  const Modal = getModal(modalType);

  return modalType === 'unset' ? null
    : (
      <>
        <Modal />
      </>
    );
};

export default ModalDialog;
