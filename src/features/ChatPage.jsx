import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadChatState, channelsProccedingError } from './channels/channelsSlice';
import routes from '../API/routes';
import LoadSpinner from '../components/LoadSpinner';
import ChannelsDash from './channels/ChannelsDash';
import Messages from './messages/Messages';
import ChatInput from './messages/ChatInput';
import { getIsServerDataLoaded } from '../selectors/selectors';

const Chat = ({ socket }) => (
  <>
    <ChannelsDash />
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <Messages />
        <ChatInput socket={socket} />
      </div>
    </div>
  </>
);

const ChatPage = ({ socket }) => {
  const isLoad = useSelector(getIsServerDataLoaded);
  const spinner = !isLoad && <LoadSpinner />;
  const content = isLoad && <Chat socket={socket} />;

  const dispatch = useDispatch();
  const { token } = JSON.parse(localStorage.getItem('user'));
  const channelsDataUrl = routes.dataPath();

  axios.get(
    channelsDataUrl, {
      headers: { Authorization: 'Bearer '.concat(token) },
    },
  ).then((res) => {
    dispatch(loadChatState(res.data));
  })
    .catch((exception) => {
      const { message } = exception;
      dispatch(channelsProccedingError(message));
    });

  return (
    <div className="row flex-grow-1 h-75 pb-3">
      {spinner}
      {content}
    </div>
  );
};

export default ChatPage;
