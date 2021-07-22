import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const messages = useSelector((state) => state.messagesData.messages);
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const space = ': ';

  const renderMessages = () => channelMessages.map((messageInfo, i) => {
    const { user, body, id } = messageInfo;
    return (
      <div key={i} className="text-break">
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
