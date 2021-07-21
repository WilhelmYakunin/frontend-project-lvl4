import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setDropdownOpen, dropdownProccedingError } from './dropdownSlice';
import {
  setModalOpen, modalProccedingError,
} from '../modals/modalSlice';

const Dropdown = ({ channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const isCurrent = () => (channelId === currentChannelId ? 'btn-primary' : 'btn-light');

  const handleOpenDeleteModal = (e) => {
    e.preventDefault();
    try {
      dispatch(setModalOpen('removeModal'));
    } catch (exception) {
      dispatch(modalProccedingError());
    }
  };

  const handleOpenRenameModal = (e) => {
    e.preventDefault();
    try {
      dispatch(setModalOpen('renameModal'));
    } catch (exception) {
      dispatch(modalProccedingError());
    }
  };

  function handleReciveDropdownOpen() {
    try {
      dispatch(setDropdownOpen(channelId));
    } catch (exception) {
      dispatch(dropdownProccedingError());
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

export default Dropdown;
