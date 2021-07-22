import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { getCurrentChannelsId, getMessages } from '../../selectors/selectors';

const Messages = () => {
  const currentChannelId = useSelector(getCurrentChannelsId);
  const messages = useSelector(getMessages);
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const space = ': ';

  const renderMessages = () => channelMessages.map((messageInfo, i) => {
    const { user, body } = messageInfo;
    return (
      <div key={_.uniqueId(i)} className="text-break">
        <b>{user}</b>
        {space}
        {body}
      </div>
    );
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      { channelMessages.length !== 0 && renderMessages() }
    </div>
  );
};

export default Messages;
