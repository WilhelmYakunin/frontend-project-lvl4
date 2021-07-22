import { createSlice } from '@reduxjs/toolkit';

export const channelsData = createSlice({
  name: 'channels',
  initialState: {
    serverDataLoaded: false,
    channels: [],
    currentChannelId: 1,
    channelsProccedingError: 'none',
    showDropdownForChannel: 0,
  },
  reducers: {
    loadChatState(state, action) {
      const copy = state;
      const { channels, currentChannelId } = action.payload;
      copy.serverDataLoaded = true;
      copy.channels = channels;
      copy.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, action) {
      const copy = state;
      copy.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      const copy = state;
      const newChannel = action.payload;
      copy.channels.push(newChannel);
    },
    deleteChannel: (state, action) => {
      const copy = state;
      const id = action.payload;
      const indexOfDeletee = state.channels.findIndex((channel) => channel.id === id);
      copy.channels.splice(indexOfDeletee, 1);
    },
    renameChannel: (state, action) => {
      const copy = state;
      const { id, name } = action.payload;
      const channel = copy.channels.find((c) => c.id === id);
      if (!channel) return;
      channel.name = name;
    },
    channelsProccedingError(state, action) {
      const copy = state;
      copy.channelsProccedingError = action.payload;
    },
  },
});

export const {
  channelsProccedingError,
  loadChatState,
  setCurrentChannel,
  addChannel,
  renameChannel,
  deleteChannel,
} = channelsData.actions;

export default channelsData.reducer;
