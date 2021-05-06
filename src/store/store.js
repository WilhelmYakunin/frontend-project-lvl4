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
import authorizationSlice from '../reducers/authorizationSlice.jsx';
import channelsSlice from '../reducers/channelsSlice.jsx';
import newChannelModalSlice from '../reducers/newChannelModal.jsx';
import deleteModaleSlice from '../reducers/deleteModalSlice.jsx';
import renameModaleSlice from '../reducers/renameModalSlice.jsx';
import dropdownInfoSlice from '../reducers/dropdownSlice.jsx';
import messagesInfoSlice from '../reducers/messagesSlice.jsx';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  channelsData: channelsSlice,
  messagesData: messagesInfoSlice,
  dropdown: dropdownInfoSlice,
  newChannelModal: newChannelModalSlice,
  deleteModal: deleteModaleSlice,
  renameModal: renameModaleSlice,
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
