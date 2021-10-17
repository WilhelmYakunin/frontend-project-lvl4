import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import getOnlyUniqeChannelName from './getOnlyUniqueSchema';
import ModalHeader from '../../components/ModalHeader';
import ModalInput from '../../components/ModalInput';
import ModalFooter from '../../components/ModalFooter';
import { closeModal } from './modalFormsSlice';
import { getAllChannels } from '../../store/selectors';
import SocketContext from '../../contexts/SocketContext';

const NewChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getAllChannels);
  const channelsNames = channels.map((channel) => channel.name);
  const { addChannel } = React.useContext(SocketContext);
  const handleAddChannel = (newChannelName, { resetForm }) => {
    const { name } = newChannelName;
    addChannel(name);
    resetForm();
    dispatch(closeModal());
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={getOnlyUniqeChannelName(channelsNames)}
        onSubmit={handleAddChannel}
      >
        {({ errors, isValid, handleBlur }) => (
          <Form>
            <ModalHeader text={t('modals.add')} />
            <Modal.Body>
              <ModalInput
                dataTestid="add-channel"
                ariaLabel="add channel"
                isValid={isValid}
                error={t(errors.name)}
              />
            </Modal.Body>
            <ModalFooter textCancel={t('modals.cancel')} textSubmit={t('modals.submit')} submitButtonVariant="primary" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewChannelForm;
