import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { channelsProccedingError } from '../channels/channelsSlice';
import { setModalClose } from './modalSlice';
import { getDropdownId } from '../../selectors/selectors';

const DeleteChannelModal = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const requestedChannleId = useSelector(getDropdownId);

  const handleDeleteChannel = () => {
    try {
      socket.emit('removeChannel', { id: requestedChannleId }, (acknowledge) => {
        if (acknowledge.status === 'ok') {
          dispatch(setModalClose());
        }
      });
    } catch (exception) {
      dispatch(channelsProccedingError(exception.message));
    }
  };

  return (
    <>
      <Modal
        show
        onHide={() => dispatch(setModalClose())}
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
          <Button variant="secondary" onClick={() => dispatch(setModalClose())}>
            {t('modals.cancel')}
          </Button>
          <Button type="submit" onClick={handleDeleteChannel} variant="danger">{t('modals.confirm')}</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default DeleteChannelModal;
