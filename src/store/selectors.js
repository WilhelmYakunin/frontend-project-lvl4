const getChannelsData = (state) => state.channelsData;
const isServerDataLoaded = (state) => state.channelsData.serverDataLoaded;
const showDropdownForChannel = (state) => state.channelsData.showDropdownForChannel;
const getCurrentChannelId = (state) => state.channelsData.currentChannelId;
const getMessages = (state) => state.messagesData.messages;
const getAllChannels = (state) => state.channelsData.channels;
const getModalType = (state) => state.modal.modalType;

export {
  getChannelsData, isServerDataLoaded,
  showDropdownForChannel, getCurrentChannelId, getMessages, getModalType, getAllChannels,
};
