import { newMessage } from '../features/messages/messagesSlice.jsx';
import {
  newChannel, renameChannel, removeChannel,
} from '../features/channels/channelsSlice.jsx';

export default (socket, handle) => {
  socket
    .on('newMessage', (message) => handle(newMessage(message)))
    .on('renameChannel', (newName) => handle(renameChannel(newName)))
    .on('newChannel', (newChannelInfo) => {
      handle(newChannel(newChannelInfo));
    })
    .on('removeChannel', (requestedChannleId) => {
      handle(removeChannel(requestedChannleId));
    });
};
