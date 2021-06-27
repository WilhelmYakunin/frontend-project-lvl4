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
      const newState = state.channels.filter((channel) => channel.id !== id);
      state.channels = newState;
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      return {
        ...state,
        channels: state.channels.map((channel) => {
          if (channel.id === id) {
            const updatedChannel = { ...channel };
            updatedChannel.name = name;
            return updatedChannel;
          }
          return channel;
        }),
      };
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
