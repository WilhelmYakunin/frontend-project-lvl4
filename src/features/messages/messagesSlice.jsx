/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { loadChatState } from '../channels/channelsSlice';

const messagesSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
    messageError: 'none',
  },
  reducers: {
    newMessage: (state, action) => {
      const newMessage = action.payload;
      state.messages.push(newMessage);
    },
    messageError: (state, action) => {
      state.messageError = action.payload;
    },
  },
  extraReducers: {
    [loadChatState]: (state, action) => {
      const { messages } = action.payload;
      state.messages = messages;
    },
  },
});

export const {
  newMessage, messageError,
} = messagesSlice.actions;

export default messagesSlice.reducer;
