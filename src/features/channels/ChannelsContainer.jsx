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
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {channels !== undefined && channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <ChannelButton
            channel={channel}
            currentChannelId={currentChannelId}
          />
        </li>
      ))}

    </ul>
  );
};

export default ChannelsContainer;
