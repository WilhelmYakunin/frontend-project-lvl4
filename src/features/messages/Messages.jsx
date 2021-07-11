import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { msgContainerStyles, msgStyles } from './messagesStyles';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channelsData.currentChannelId);
  const messages = useSelector((state) => state.messagesData.messages);
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const space = ': ';

  // useEffect(() => {
  //   const newMessage = messages[messages.length - 1];
  //   console.log(newMessage);
  // });
  console.log(channelMessages);
  const renderMessages = () => channelMessages.map((messageInfo, index) => {
    const { user, body } = messageInfo;
    return (
      <div key={index} className={msgStyles}>
        <b>{user}</b>
        {space}
        {body}
      </div>
    );
  });

  return (
    <div id="messages-box" className={msgContainerStyles}>
      { channelMessages.length !== 0 && renderMessages() }
    </div>
  );
};

export default Messages;
