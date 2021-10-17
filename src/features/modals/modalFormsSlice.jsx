/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalFromsSlice = createSlice({
  name: 'modal',
  initialState: {
    modalType: 'unset',
    channelId: 'unset',
  },
  reducers: {
    openModal: (state, action) => {
      const { type, channelId} = action.payload;
      state.modalType = type;
      state.channelId = channelId;
    },
    closeModal: (state) => {
      state.modalType = 'unset';
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalFromsSlice.actions;

export default modalFromsSlice.reducer;
