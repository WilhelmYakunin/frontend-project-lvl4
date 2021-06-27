import React from 'react';
import { useSelector } from 'react-redux';
import container from './switchStyles';
import ChatView from '../chatView';
import Spinner from '../spinner';

const SpinnerChatSwitch = () => {
  const loading = useSelector((state) => state.channelsData.serverDataLoaded);
  const spinner = !loading ? <Spinner /> : null;
  const content = loading ? <ChatView /> : null;

  return (
    <div className={container}>
      {spinner}
      {content}
    </div>
  );
};

export default SpinnerChatSwitch;
