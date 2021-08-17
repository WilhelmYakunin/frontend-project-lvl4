import React from 'react';
import { useSelector } from 'react-redux';
import ChannelButton from './ChannelButton';
import { getChannelsData } from '../../store/selectors';

const ChannelsContainer = () => {
  const {
    channels,
    currentChannelId,
  } = useSelector(getChannelsData);

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels !== undefined && channels.map((channel) => (
        <li key={channel.id} className="nav-item">
          <div role="group" className="d-flex mb-2 dropdown btn-group">
            <ChannelButton
              channel={channel}
              currentChannelId={currentChannelId}
            />
          </div>
        </li>
      ))}

    </ul>
  );
};

export default ChannelsContainer;
