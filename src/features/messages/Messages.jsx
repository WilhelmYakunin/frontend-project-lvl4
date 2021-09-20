import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelId, getMessages } from '../../store/selectors';

const Messages = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const messages = useSelector(getMessages);
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const space = ': ';

  const renderMessages = () => channelMessages.map((messageInfo) => {
    const { user, body, id } = messageInfo;

    return (
      <div key={id} className="text-break">
        <b>{user}</b>
        {space}
        {body}
      </div>
    );
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 mt-4">
      { channelMessages.length !== 0 && renderMessages() }
    </div>
  );
};

export default Messages;
