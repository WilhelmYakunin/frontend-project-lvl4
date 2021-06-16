import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel } from '../channels/channelsSlice';

export const messagesSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
    filing: true,
    addMessageError: 'none',
  },
  reducers: {
    requestAddMessage: (state) => ({
      ...state,
      filing: true,
      addMessageError: 'none',
    }),
    addMessage: (state, action) => {
      const newMessage = action.payload;
      const copyMessages = state.messages.slice();
      copyMessages.push(newMessage);
      return {
        ...state,
        messages: copyMessages,
      };
    },
    receiveNewMessage: (state) => ({
      ...state,
      filing: false,
      addMessageError: 'none',
    }),
    addMessageError: (state, action) => ({
      ...state,
      filing: false,
      addMessageError: action.payload,
    }),
  },
  extraReducers: {
    [deleteChannel]: (state, action) => {
      const id = action.payload;
      const copyMessages = state.messages.slice();
      return {
        ...state,
        messages: copyMessages.filter((message) => message.channelId !== id),
      };
    },
  },
});

export const {
  requestAddMessage, addMessage, receiveNewMessage, addMessageError,
} = messagesSlice.actions;

export default messagesSlice.reducer;
