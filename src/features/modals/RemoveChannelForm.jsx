import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import ModalHeader from '../../components/ModalHeader';
import ModalFooter from '../../components/ModalFooter';
import { closeModal } from './modalFormsSlice';
import { modalChannelId } from '../../store/selectors';
import SocketContext from '../../contexts/SocketContext';

const RemoveChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idOfDeleetingChannel = useSelector(modalChannelId);
  const { removeChannel } = React.useContext(SocketContext);
  const handleRemoveChannel = () => {
    const removeChannelInfo = { id: idOfDeleetingChannel };
    removeChannel(removeChannelInfo);
    dispatch(closeModal());
  };

  return (
    <Formik
      initialValues
      onSubmit={handleRemoveChannel}
    >
      {() => (
        <Form>
          <ModalHeader text={t('modals.remove')} />
          <Modal.Body>
            {t('modals.confirmation')}
          </Modal.Body>
          <ModalFooter textCancel={t('modals.cancel')} textSubmit={t('modals.confirm')} submitButtonVariant="danger" />
        </Form>
      )}
    </Formik>
  );
};

export default RemoveChannelForm;
