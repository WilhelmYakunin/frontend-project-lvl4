import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  deleteChannel,
  setCurrentChannel,
  channelsProccedingError,
} from '../channels/channelsSlice';
import { setModalClose } from './modalSlice';

const DeleteChannelModal = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const requestedChannleId = useSelector((state) => state.dropdown.id);

  const handleDeleteChannel = () => {
    try {
      const INITIAL_CURRENT_CHANNEL_ID = 1;
      socket.emit('removeChannel', { id: requestedChannleId }, () => {
        dispatch(deleteChannel(requestedChannleId));
        dispatch(setCurrentChannel(INITIAL_CURRENT_CHANNEL_ID));
        dispatch(setModalClose());
      });
    } catch (exception) {
      dispatch(channelsProccedingError(exception.message));
    }
  };

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block', paddingLeft: '23px' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.remove')}</div>
              <button type="button" onClick={() => dispatch(setModalClose())} className="close">
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">
              {t('modals.confirmation')}
              <div className="d-flex justify-content-between">
                <button type="button" onClick={() => dispatch(setModalClose())} className="mr-2 btn btn-secondary">{t('modals.cancel')}</button>
                <button type="button" onClick={handleDeleteChannel} className="btn btn-danger">{t('modals.confirm')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteChannelModal;
