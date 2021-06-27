import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { msgContainerStyles, msgStyles } from './messagesStyles';

const Messages = () => {
  const messages = useSelector((state) => state.messagesData.messages);
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const space = ': ';

  return (
    <div id="messages-box" className={msgContainerStyles}>
      { channelMessages.length === 0 ? null
        : channelMessages.map((messageInfo, index) => {
          const { user, body } = messageInfo;
          return (
            <div key={_.uniqueId(index)} className={msgStyles}>
              <b>{user}</b>
              {space}
              {body}
            </div>
          );
        }) }
    </div>
  );
};

export default Messages;
