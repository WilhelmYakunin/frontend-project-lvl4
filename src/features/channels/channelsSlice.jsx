/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

export const channelsData = createSlice({
  name: 'channels',
  initialState: {
    serverDataLoaded: false,
    channels: [],
    currentChannelId: 1,
    channelsGotError: 'none',
    showDropdownForChannel: 0,
  },
  reducers: {
    loadChatState(state, action) {
      const { channels, currentChannelId } = action.payload;
      state.serverDataLoaded = true;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
    OpenDropDownFor(state, action) {
      state.showDropdownForChannel = action.payload;
    },
    addChannel: (state, action) => {
      const newChannel = action.payload;
      state.channels.push(newChannel);
    },
    deleteChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = current(state.channels).filter((channel) => channel.id !== id);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (!channel) return;
      channel.name = name;
    },
    channelsGotError(state, action) {
      state.channelsProccedingError = action.payload;
    },
  },
});

export const {
  channelsGotError,
  loadChatState,
  setCurrentChannel,
  OpenDropDownFor,
  addChannel,
  renameChannel,
  deleteChannel,
} = channelsData.actions;

export default channelsData.reducer;
