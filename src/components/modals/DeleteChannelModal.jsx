import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import {
  requestChannelsChanges,
  deleteChannel,
  setCurrentChannel,
  reciveChannelsChanges,
  channelsProccedingError,
} from '../../reducers/channelsSlice';
import {
  requestDeleteModalClose,
  setDeleteModalClose,
  reciveDeleteModalClose,
  deleteModalProccedingError,
} from '../../reducers/deleteModalSlice';

export default function DeleteChannelModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.deleteModal.isOpen);
  const requestedChannleId = useSelector((state) => state.dropdown.id);

  function handleDeleteModalClose() {
    try {
      dispatch(requestDeleteModalClose());
      dispatch(setDeleteModalClose());
      dispatch(reciveDeleteModalClose());
    } catch (exception) {
      dispatch(deleteModalProccedingError(exception.message));
    }
  }

  async function handleDeleteChannel(e) {
    e.preventDefault();
    try {
      const socket = io();
      const INITIAL_CURRENT_CHANNEL_ID = 1;
      await socket.emit('removeChannel', { id: requestedChannleId }, () => {
        dispatch(requestChannelsChanges());
        dispatch(deleteChannel(requestedChannleId));
        dispatch(setCurrentChannel(INITIAL_CURRENT_CHANNEL_ID));
        dispatch(reciveChannelsChanges());
        handleDeleteModalClose();
      });
    } catch (exception) {
      dispatch(channelsProccedingError(exception.message));
    }
  }

  return (isModalOpen === false ? null
    : (
      <>
        <div className="fade modal-backdrop show" />
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block', paddingLeft: '23px' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title h4">{t('modals.remove')}</div>
                <button type="button" onClick={handleDeleteModalClose} className="close">
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="modal-body">
                {t('modals.confirmation')}
                <div className="d-flex justify-content-between">
                  <button type="button" onClick={handleDeleteModalClose} className="mr-2 btn btn-secondary">{t('modals.cancel')}</button>
                  <button type="button" onClick={handleDeleteChannel} className="btn btn-danger">{t('modals.confirm')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
