import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  requestModalOpen, setModalOpen, reciveModalOpen, modalProccedingError,
} from '../../reducers/newChannelModal';
import ChannelsList from './Channels';

export default function ChannelsDash() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleOpenModal() {
    try {
      dispatch(requestModalOpen());
      dispatch(setModalOpen());
      dispatch(reciveModalOpen());
    } catch (exception) {
      dispatch(modalProccedingError());
    }
  }

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels.channels')}</span>
        <button type="button" onClick={handleOpenModal} className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ChannelsList />
    </div>
  );
}
