import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { loadChatState } from './channels/channelsSlice';
import routes from '../API/routes';
import LoadSpinner from '../components/LoadSpinner';
import ChannelsMenagingDash from './channels/ChannelsMenagingDash';
import Messages from './messages/Messages';
import NewMessageForm from './messages/NewMessageForm';
import AuthContext from '../contexts/AuthContext';

const Chat = () => (
  <>
    <ChannelsMenagingDash />
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Messages />
        <NewMessageForm />
      </div>
    </div>
  </>
);

const ChatPage = () => {
  const [chatLoaded, setLoaded] = useState(false);
  const spinner = !chatLoaded && <LoadSpinner />;
  const content = chatLoaded && <Chat />;
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { getAuthHeader } = useContext(AuthContext);
  const channelsDataUrl = routes.dataPath();

  const getChatLoaded = () => !chatLoaded && axios({
    method: 'get',
    url: channelsDataUrl,
    headers: getAuthHeader(),
    timeout: 10000,
  }).then((res) => {
    dispatch(loadChatState(res.data));
    setLoaded(true);
  })
    .catch(() => {
      const { from } = location.state || { from: { pathname: '/login' } };
      history.replace(from);
    });

  getChatLoaded();

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {spinner}
        {content}
      </div>
    </div>
  );
};

export default ChatPage;
