import React from 'react';
import { useSelector } from 'react-redux';
import channelsDashboardStyles from './channelsStyles';
import Channel from './ListChannel';

const Channels = () => {
  const {
    channels,
    currentChannelId,
  } = useSelector((state) => state.channelsData);

  return (
    <ul className={channelsDashboardStyles}>
      {channels === undefined ? null : channels.map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          currentChannelId={currentChannelId}
        />
      ))}
    </ul>
  );
};

export default Channels;
