import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openModal, modalsGotError } from '../modals/modalFormsSlice';
import ChannelsContainer from './ChannelsContainer';

const ChannelsDash = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const setAddChannelModal = () => {
    try {
      dispatch(openModal('addModal'));
    } catch (exception) {
      dispatch(modalsGotError(exception));
    }
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels.channels')}</span>
        <button type="button" onClick={setAddChannelModal} className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ChannelsContainer />
    </div>
  );
};

export default ChannelsDash;
