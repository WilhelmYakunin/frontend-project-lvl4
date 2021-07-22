import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './getModalType';
import { getModalType } from '../../selectors/selectors';

const ModalDialog = ({ socket }) => {
  const modalType = useSelector(getModalType);
  const Modal = getModal(modalType);

  return modalType !== 'unset' && (
  <>
    <Modal socket={socket} />
  </>
  );
};

export default ModalDialog;
