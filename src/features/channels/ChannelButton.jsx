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

  const isCurrent = () => (id === currentChannelId && 'btn-secondary');

  const handleSetCurrentChannel = () => {
    try {
      dispatch(setCurrentChannel(id));
    } catch (exception) {
      dispatch(channelsGotError(exception.message));
    }
  };

  return (
    <div role="group" className="d-flex dropdown btn-group">
      <button
        className={`w-100 rounded-0 mr-0 btn ${isCurrent(id)}`}
        onClick={handleSetCurrentChannel}
        type="submit"
      >
        <span className="me-1"># </span>
        {name}
      </button>
      {removable && <ChannelDropdownMenu channelId={id} />}
    </div>
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
