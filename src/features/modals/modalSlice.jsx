/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalType: 'unset',
    modalProccedingError: 'none',
  },
  reducers: {
    setModalOpen: (state, action) => {
      state.modalType = action.payload;
    },
    setModalClose: (state) => {
      state.modalType = 'unset';
    },
    modalProccedingError: (state, action) => {
      const errInfo = action.payload;
      state.modalProccedingError = errInfo;
    },
  },
});

export const {
  setModalOpen,
  setModalClose,
  modalProccedingError,
} = modalSlice.actions;

export default modalSlice.reducer;
