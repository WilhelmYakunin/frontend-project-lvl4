import { createSlice } from '@reduxjs/toolkit';

export const channelsData = createSlice({
  name: 'channels',
  initialState: {
    isFetching: false,
    serverDataLoaded: false,
    channels: [],
    currentChannelId: 1,
    channelsProccedingError: 'none',
    showDropdownForChannel: 0,
  },
  reducers: {
    requestChannelsChanges: (state) => ({
      ...state,
      isFetching: true,
      channelsProccedingError: 'none',
    }),
    reciveChannelsChanges: (state) => ({
      ...state,
      isFetching: false,
      channelsProccedingError: 'none',
    }),
    channelsProccedingError: (state, action) => ({
      ...state,
      channelsProccedingError: action.payload,
    }),
    setInitialState: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      return {
        ...state,
        serverDataLoaded: true,
        channels,
        currentChannelId,
        channelsProccedingError: 'none',
      };
    },
    setCurrentChannel: (state, action) => ({
      ...state,
      currentChannelId: action.payload,
    }),
    addChannel: (state, action) => {
      const newChannel = action.payload;
      const copyChannels = state.channels.slice();
      copyChannels.push(newChannel);
      return {
        ...state,
        channels: copyChannels,
      };
    },
    deleteChannel: (state, action) => {
      const id = action.payload;
      const copyChannels = state.channels.slice();
      return {
        ...state,
        channels: copyChannels.filter((channel) => channel.id !== id),
      };
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
  },
});

export const {
  requestChannelsChanges,
  reciveChannelsChanges,
  channelsProccedingError,
  setInitialState,
  setCurrentChannel,
  addChannel,
  renameChannel,
  deleteChannel,
} = channelsData.actions;

export default channelsData.reducer;
