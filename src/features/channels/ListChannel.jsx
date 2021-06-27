import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { channelsProccedingError, setCurrentChannel } from './channelsSlice';
import { setDropdownOpen, dropdownProccedingError } from '../channels/dropdownSlice';
import {
  setModalOpen, modalProccedingError,
} from '../modals/modalSlice';

export default function ListChannel({
  channel: { id, name, removable },
  currentChannelId,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getChannelBtnStyles = cn(
    'flex-grow-1',
    'nav-link',
    'btn-block',
    'text-left',
    'btn',
  );

  const isCurrent = () => (id === currentChannelId ? 'btn-primary' : 'btn-light');

  const getChannelDropdawnBtnStyles = cn(
    'flex-grow-0',
    'dropdown-toggle',
    'dropdown-toggle-split',
    'btn',
  );

  function handleSetCurrentChannel() {
    try {
      dispatch(setCurrentChannel(id));
    } catch (exception) {
      dispatch(channelsProccedingError(exception.message));
    }
  }

  const handleOpenDeleteModal = (e) => {
    e.preventDefault();
    try {
      dispatch(setModalOpen('removeModal'));
    } catch (exception) {
      dispatch(modalProccedingError());
    }
  }

  const handleOpenRenameModal = (e) => {
    e.preventDefault();
    try {
      dispatch(setModalOpen('renameModal'));
    } catch (exception) {
      dispatch(modalProccedingError());
    }
  }

  function handleReciveDropdownOpen() {
    try {
      dispatch(setDropdownOpen(id));
    } catch (exception) {
      dispatch(dropdownProccedingError());
    }
  }

  return (
    <li key={id} className="nav-item">
      <div role="group" className="d-flex mb-2 dropdown btn-group">
        <button
          className={`${getChannelBtnStyles} ${isCurrent(id)}`}
          onClick={handleSetCurrentChannel}
          type="submit"
        >
          {name}
        </button>
        { removable ? (
          <>
            <button
              onClick={handleReciveDropdownOpen}
              type="button"
              role="menu"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              className={`${getChannelDropdawnBtnStyles} ${isCurrent(id)}`}
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
        ) : null}
      </div>
    </li>
  );
}

ListChannel.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    removable: PropTypes.bool.isRequired,
  }).isRequired,
  currentChannelId: PropTypes.number.isRequired,
};
