import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../modals/modalFormsSlice';
import { getCurrentChannelId } from '../../store/selectors';

const ChannelDropdownMenu = ({ channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannelId);

  return (
    <>
      <button
        type="button"
        role="menu"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${channelId === currentChannelId && 'btn-secondary'}`}
      />
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button
          onClick={() => dispatch(openModal({ type: 'removeModal', channelId }))}
          className="dropdown-item"
          type="button"
        >
          {t('channels.remove')}
        </button>
        <button
          onClick={() => dispatch(openModal({ type: 'renameModal', channelId }))}
          className="dropdown-item"
          type="submit"
        >
          {t('channels.rename')}
        </button>
      </div>
    </>
  );
};

export default ChannelDropdownMenu;
