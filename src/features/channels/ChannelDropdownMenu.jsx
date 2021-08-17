import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { OpenDropDownFor, channelsGotError } from './channelsSlice';
import { openModal, modalsGotError } from '../modals/modalFormsSlice';
import { getCurrentChannelId } from '../../store/selectors';

const ChannelDropdownMenu = ({ channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannelId);
  const isCurrent = () => (channelId === currentChannelId ? 'btn-primary' : 'btn-light');

  const handleOpenDeleteModal = (e) => {
    e.preventDefault();
    try {
      dispatch(openModal('removeModal'));
    } catch (exception) {
      dispatch(modalsGotError());
    }
  };

  const handleOpenRenameModal = (e) => {
    e.preventDefault();
    try {
      dispatch(openModal('renameModal'));
    } catch (exception) {
      dispatch(modalsGotError());
    }
  };

  function handleReciveDropdownOpen() {
    try {
      dispatch(OpenDropDownFor(channelId));
    } catch (exception) {
      dispatch(channelsGotError());
    }
  }

  return (
    <>
      <button
        onClick={handleReciveDropdownOpen}
        type="button"
        role="menu"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${isCurrent()}`}
      />
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a
          onClick={handleOpenDeleteModal}
          className="dropdown-item"
          href="/"
          role="button"
        >
          {t('channels.remove')}
        </a>
        <a
          onClick={handleOpenRenameModal}
          className="dropdown-item"
          href="/"
          role="button"
        >
          {t('channels.rename')}
        </a>
      </div>
    </>
  );
};

export default ChannelDropdownMenu;
