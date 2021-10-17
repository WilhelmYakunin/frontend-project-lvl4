const getChannelsData = (state) => state.channelsData;
const isServerDataLoaded = (state) => state.channelsData.serverDataLoaded;
const modalChannelId = (state) => state.modal.channelId;
const getCurrentChannelId = (state) => state.channelsData.currentChannelId;
const getMessages = (state) => state.messagesData.messages;
const getAllChannels = (state) => state.channelsData.channels;
const getModalType = (state) => state.modal.modalType;

export {
  getChannelsData, isServerDataLoaded,
  modalChannelId, getCurrentChannelId, getMessages, getModalType, getAllChannels,
};
