import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import _ from 'lodash';

export default function Messages() {
  const msgContainerStyles = cn('chat-messages', 'overflow-auto', 'mb-3');
  const msgStyles = cn('text-break');
  const messages = useSelector((state) => state.messagesData.messages);
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <div id="messages-box" className={msgContainerStyles}>
      { channelMessages.length === 0 ? null
        : channelMessages.map((messageInfo, index) => {
          const { user, body } = messageInfo;
          return (
            <div key={_.uniqueId(index)} className={msgStyles}>{}
              <b>{user}</b>: {body}
            </div>
          );
        }) }
    </div>
  );
}
