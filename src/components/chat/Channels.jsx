import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import ListChannel from './ListChannel';

export default function ChannelsList() {
  const channelsDashboardStyles = cn(
    'nav',
    'flex-column',
    'nav-pills',
    'nav-fill',
  );

  const {
    channels,
    currentChannelId,
  } = useSelector((state) => state.channelsData);

  return (
    <ul className={channelsDashboardStyles}>
      {channels === undefined ? null : channels.map((channel) => (
        <ListChannel
          key={channel.id}
          channel={channel}
          currentChannelId={currentChannelId}
        />
      ))}
    </ul>
  );
}
