import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session.js';
import authorizationSlice from '../features/authorization/authorizationSlice.jsx';
import channelsSlice from '../features/channels/channelsSlice.jsx';
import modalSlice from '../features/modals/modalSlice.jsx';
import dropdownInfoSlice from '../features/channels/dropdownSlice.jsx';
import messagesInfoSlice from '../features/messages/messagesSlice.jsx';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  channelsData: channelsSlice,
  messagesData: messagesInfoSlice,
  dropdown: dropdownInfoSlice,
  modal: modalSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
