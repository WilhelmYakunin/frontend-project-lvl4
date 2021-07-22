import { createSlice } from '@reduxjs/toolkit';
import { loadChatState, deleteChannel } from '../channels/channelsSlice';

const messagesSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
    messageError: 'none',
  },
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload;
      state.messages.push(newMessage);
    },
    messageError: (state, action) => {
      const copy = state;
      copy.messageError = action.payload;
    },
  },
  extraReducers: {
    [deleteChannel]: (state, action) => {
      const copy = state;
      const id = action.payload;
      const copyMessages = state.messages.slice();
      copy.messages = copyMessages.filter((message) => message.channelId !== id);
    },
    [loadChatState]: (state, action) => {
      const copy = state;
      const { messages } = action.payload;
      copy.messages = messages;
    },
  },
});

export const {
  addMessage, messageError,
} = messagesSlice.actions;

export default messagesSlice.reducer;
