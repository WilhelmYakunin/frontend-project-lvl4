import { configureStore, combineReducers } from '@reduxjs/toolkit';
import channelsSlice from '../features/channels/channelsSlice.jsx';
import modalFormsSlice from '../features/modals/modalFormsSlice.jsx';
import messagesInfoSlice from '../features/messages/messagesSlice.jsx';

const rootReducer = combineReducers({
  channelsData: channelsSlice,
  messagesData: messagesInfoSlice,
  modal: modalFormsSlice,
});

export default (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return store;
};
