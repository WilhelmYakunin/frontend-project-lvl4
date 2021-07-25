/* eslint-disable no-param-reassign */
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
      state.messageError = action.payload;
    },
  },
  extraReducers: {
    [deleteChannel]: (state, action) => {
      const id = action.payload;
      state.messages.filter((message) => message.channelId !== id);
    },
    [loadChatState]: (state, action) => {
      const { messages } = action.payload;
      state.messages = messages;
    },
  },
});

export const {
  addMessage, messageError,
} = messagesSlice.actions;

export default messagesSlice.reducer;
