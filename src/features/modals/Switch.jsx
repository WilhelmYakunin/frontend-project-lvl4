import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './getModalType';

const ModalDialog = ({ socket }) => {
  const modalType = useSelector((state) => state.modal.modalType);
  const Modal = getModal(modalType);

  return modalType === 'unset' ? null
    : (
      <>
        <Modal socket={socket} />
      </>
    );
};

export default ModalDialog;
