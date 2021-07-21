import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { channelsProccedingError, setCurrentChannel } from './channelsSlice';
import Dropdown from './Dropdown';

const CreateChannel = ({
  channel: { id, name, removable },
  currentChannelId,
}) => {
  const dispatch = useDispatch();

  const isCurrent = () => (id === currentChannelId ? 'btn-primary' : 'btn-light');

  const handleSetCurrentChannel = () => {
    try {
      dispatch(setCurrentChannel(id));
    } catch (exception) {
      dispatch(channelsProccedingError(exception.message));
    }
  };

  return (
    <li key={id} className="nav-item">
      <div role="group" className="d-flex mb-2 dropdown btn-group">
        <button
          className={`flex-grow-1 nav-link btn-block text-left btn ${isCurrent(id)}`}
          onClick={handleSetCurrentChannel}
          type="submit"
        >
          {name}
        </button>
        {removable && <Dropdown channelId={id} />}
      </div>
    </li>

  );
};

CreateChannel.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    removable: PropTypes.bool,
  }).isRequired,
  currentChannelId: PropTypes.number.isRequired,
};

export default CreateChannel;
