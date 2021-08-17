import React from 'react';
import { useSelector } from 'react-redux';
import getModalFormType from './getModalFormType';
import { getModalType } from '../../store/selectors';

const ModalForm = () => {
  const modalType = useSelector(getModalType);
  const Modal = getModalFormType(modalType);

  return modalType !== 'unset' && (
  <>
    <Modal />
  </>
  );
};

export default ModalForm;
