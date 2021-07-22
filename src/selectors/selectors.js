const isI18nInit = (state) => state.i18n.isInit;
const getChannelsData = (state) => state.channelsData;
const getIsServerDataLoaded = (state) => state.channelsData.serverDataLoaded;
const getDropdownId = (state) => state.dropdown.id;
const getCurrentChannelsId = (state) => state.channelsData.currentChannelId;
const getMessages = (state) => state.messagesData.messages;
const getAllChannels = (state) => state.channelsData.channels;
const getModalType = (state) => state.modal.modalType;

export {
  isI18nInit, getChannelsData, getIsServerDataLoaded, 
  getDropdownId, getCurrentChannelsId, getMessages, getModalType, getAllChannels,
};
