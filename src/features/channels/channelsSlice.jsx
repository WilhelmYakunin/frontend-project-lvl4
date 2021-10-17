/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

export const channelsData = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    loadChatState(state, action) {
      const { channels, currentChannelId } = action.payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
    newChannel: (state, action) => {
      const newChannel = action.payload;
      state.currentChannelId = newChannel.id;
      state.channels.push(newChannel);
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      const INITIAL_CURRENT_CHANNEL_ID = 1;
      state.channels = current(state.channels).filter((channel) => channel.id !== id);
      state.currentChannelId = INITIAL_CURRENT_CHANNEL_ID;
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (!channel) return;
      channel.name = name;
    },
  },
});

export const {
  loadChatState,
  setCurrentChannel,
  newChannel,
  renameChannel,
  removeChannel,
} = channelsData.actions;

export default channelsData.reducer;
