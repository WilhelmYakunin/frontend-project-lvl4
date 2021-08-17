import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { channelsGotError, setCurrentChannel } from './channelsSlice';
import ChannelDropdownMenu from './ChannelDropdownMenu';

const ChannelButton = ({
  channel: { id, name, removable },
  currentChannelId,
}) => {
  const dispatch = useDispatch();

  const isCurrent = () => (id === currentChannelId ? 'btn-primary' : 'btn-light');

  const handleSetCurrentChannel = () => {
    try {
      dispatch(setCurrentChannel(id));
    } catch (exception) {
      dispatch(channelsGotError(exception.message));
    }
  };

  return (
    <>
      <button
        className={`flex-grow-1 nav-link btn-block text-left btn ${isCurrent(id)}`}
        onClick={handleSetCurrentChannel}
        type="submit"
      >
        {name}
      </button>
      {removable && <ChannelDropdownMenu channelId={id} />}
    </>
  );
};

ChannelButton.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    removable: PropTypes.bool,
  }).isRequired,
  currentChannelId: PropTypes.number.isRequired,
};

export default ChannelButton;
