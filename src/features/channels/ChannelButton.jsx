import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannel } from './channelsSlice';
import ChannelDropdownMenu from './ChannelDropdownMenu';

const ChannelButton = ({
  channel: { id, name, removable },
  currentChannelId,
}) => {
  const dispatch = useDispatch();
  const handleSetCurrentChannel = () => dispatch(setCurrentChannel(id));

  return (
    <div role="group" className="d-flex dropdown btn-group">
      <button
        className={`w-100 rounded-0 mr-0 btn ${id === currentChannelId && 'btn-secondary'}`}
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

export default ChannelButton;
