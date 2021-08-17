import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { loadChatState, channelsGotError } from './channels/channelsSlice';
import routes from '../API/routes';
import LoadSpinner from '../components/LoadSpinner';
import ChannelsMenagingDash from './channels/ChannelsMenagingDash';
import Messages from './messages/Messages';
import NewMessageForm from './messages/NewMessageForm';
import { isServerDataLoaded } from '../store/selectors';

const Chat = () => (
  <>
    <ChannelsMenagingDash />
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <Messages />
        <NewMessageForm />
      </div>
    </div>
  </>
);

const ChatPage = () => {
  const isLoad = useSelector(isServerDataLoaded);
  const spinner = !isLoad && <LoadSpinner />;
  const content = isLoad && <Chat />;
  const location = useLocation();
  const history = useHistory();

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
      dispatch(channelsGotError(message));
      const { from } = location.state || { from: { pathname: '/login' } };
      history.replace(from);
    });

  return (
    <div className="row flex-grow-1 h-75 pb-3">
      {spinner}
      {content}
    </div>
  );
};

export default ChatPage;
