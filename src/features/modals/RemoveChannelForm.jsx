import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { channelsGotError } from '../channels/channelsSlice';
import { closeModal } from './modalFormsSlice';
import { showDropdownForChannel } from '../../store/selectors';
import SocketContext from '../../contexts/SocketContext';

const RemoveChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idOfDeleetingChannel = useSelector(showDropdownForChannel);
  const { removeChannel } = React.useContext(SocketContext);

  const handleRemoveChannel = () => {
    try {
      const removeChannelInfo = { id: idOfDeleetingChannel };
      removeChannel(removeChannelInfo);
      dispatch(closeModal());
    } catch (exception) {
      dispatch(channelsGotError(exception.message));
    }
  };

  return (
    <>
      <Modal
        show
        onHide={() => dispatch(closeModal())}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.remove')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('modals.confirmation')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            {t('modals.cancel')}
          </Button>
          <Button type="submit" onClick={handleRemoveChannel} variant="danger">{t('modals.confirm')}</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default RemoveChannelForm;
