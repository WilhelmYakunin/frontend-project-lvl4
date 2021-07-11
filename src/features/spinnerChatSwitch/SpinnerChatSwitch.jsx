import React from 'react';
import { useSelector } from 'react-redux';
import container from './switchStyles';
import ChatView from '../chatView';
import Spinner from '../spinner';

const SpinnerChatSwitch = ({ socket }) => {
  const loading = useSelector((state) => state.channelsData.serverDataLoaded);
  const spinner = !loading && <Spinner />;
  const content = loading && <ChatView socket={socket} />;

  return (
    <div className={container}>
      {spinner}
      {content}
    </div>
  );
};

export default SpinnerChatSwitch;
