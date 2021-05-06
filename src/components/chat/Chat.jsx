import React from 'react';
import ChannelsDash from './ChannelsDash.jsx';
import Messages from './Messages.jsx';
import Input from './Input.jsx';

export default function Chat() {
  return (
    <div className="row flex-grow-1 h-75 pb-3">
      <ChannelsDash />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <Input />
        </div>
      </div>
    </div>
  );
}
