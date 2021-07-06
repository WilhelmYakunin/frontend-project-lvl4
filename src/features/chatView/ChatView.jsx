import React from 'react';
import ChannelsDash from '../channelsDash';
import Messages from '../messages';
import ChatInput from '../chatInput';
import { wrapper, container } from './chatViewStyles';

const ChatView = () => (
  <>
    <ChannelsDash />
    <div className={wrapper}>
      <div className={container}>
        <Messages />
        <ChatInput />
      </div>
    </div>
  </>
);

export default ChatView;
