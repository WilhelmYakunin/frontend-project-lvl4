import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  setModalOpen, modalProccedingError,
} from '../modals/modalSlice';
import ChannelsList from './Channels';

export default function ChannelsDash() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function setAddChannelModal() {
    try {
      dispatch(setModalOpen('addModal'));
    } catch (exception) {
      dispatch(modalProccedingError());
    }
  }
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels.channels')}</span>
        <button type="button" onClick={setAddChannelModal} className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ChannelsList />
    </div>
  );
}
