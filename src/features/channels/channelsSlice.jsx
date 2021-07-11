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
      const { channels, currentChannelId } = action.payload;
      Object.assign(state, {
        serverDataLoaded: true,
        channels,
        currentChannelId,
      });
    },
    setCurrentChannel(state, action) {
      Object.assign(state, { currentChannelId: action.payload });
    },
    addChannel: (state, action) => {
      const newChannel = action.payload;
      state.channels.push(newChannel);
    },
    deleteChannel: (state, action) => {
      const id = action.payload;
      const indexOfDeletee = state.channels.findIndex((channel) => channel.id === id);
      state.channels.splice(indexOfDeletee, 1);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (!channel) return;
      channel.name = name;
    },
    channelsProccedingError(state, action) {
      Object.assign(state, { channelsProccedingError: action.payload });
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
