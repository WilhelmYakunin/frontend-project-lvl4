/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalFromsSlice = createSlice({
  name: 'modal',
  initialState: {
    modalType: 'unset',
    modalProccedingError: 'none',
  },
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.modalType = 'unset';
    },
    modalsGotError: (state, action) => {
      const errInfo = action.payload;
      state.modalProccedingError = errInfo;
    },
  },
});

export const {
  openModal,
  closeModal,
  modalsGotError,
} = modalFromsSlice.actions;

export default modalFromsSlice.reducer;
