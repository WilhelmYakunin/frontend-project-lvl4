import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authorizationSlice from '../features/login/authorizationSlice.jsx';
import channelsSlice from '../features/channels/channelsSlice.jsx';
import modalSlice from '../features/modals/modalSlice.jsx';
import dropdownInfoSlice from '../features/channels/dropdownSlice.jsx';
import messagesInfoSlice from '../features/messages/messagesSlice.jsx';

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  channelsData: channelsSlice,
  messagesData: messagesInfoSlice,
  dropdown: dropdownInfoSlice,
  modal: modalSlice,
});

export default configureStore({
  reducer: rootReducer,
});
