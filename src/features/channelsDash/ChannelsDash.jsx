import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  setModalOpen, modalProccedingError,
} from '../modals/modalSlice';
import Channels from '../channels/Channels';
import { wrapper, container } from './chaennelsDashStyles';

const ChannelsDash = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const setAddChannelModal = () => {
    try {
      dispatch(setModalOpen('addModal'));
    } catch (exception) {
      dispatch(modalProccedingError());
    }
  };

  return (
    <div className={wrapper}>
      <div className={container}>
        <span>{t('channels.channels')}</span>
        <button type="button" onClick={setAddChannelModal} className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <Channels />
    </div>
  );
};

export default ChannelsDash;
