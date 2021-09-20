import axios from 'axios';
import { addMessage } from '../features/messages/messagesSlice.jsx';
import {
  addChannel, setCurrentChannel, renameChannel, deleteChannel,
} from '../features/channels/channelsSlice.jsx';

export default (socket, dispatch) => {
  socket.on('newMessage', (newMessage) => dispatch(addMessage(newMessage)));
  socket.on('newChannel', (newChannel) => {
    dispatch(addChannel(newChannel));
    dispatch(setCurrentChannel(newChannel.id));
  });
  socket.on('renameChannel', (newName) => dispatch(renameChannel(newName)));
  socket.on('removeChannel', (requestedChannleId) => {
    const INITIAL_CURRENT_CHANNEL_ID = 1;
    dispatch(deleteChannel(requestedChannleId));
    dispatch(setCurrentChannel(INITIAL_CURRENT_CHANNEL_ID));
  });

  axios.interceptors.request.use((req) => {
    if (req.url === '/api/v1/data' && req.headers.Authorization === undefined) {
      return Promise.reject(req);
    }
    return req;
  }, (err) => Promise.reject(err));
};
