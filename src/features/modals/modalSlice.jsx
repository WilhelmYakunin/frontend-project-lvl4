import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalType: 'unset',
    modalProccedingError: 'none',
  },
  reducers: {
    setModalOpen: (state, action) => {
      const copy = state;
      copy.modalType = action.payload;
    },
    setModalClose: (state) => {
      const copy = state;
      copy.modalType = 'unset';
    },
    modalProccedingError: (state, action) => {
      const copy = state;
      const errInfo = action.payload;
      copy.modalProccedingError = errInfo;
    },
  },
});

export const {
  setModalOpen,
  setModalClose,
  modalProccedingError,
} = modalSlice.actions;

export default modalSlice.reducer;
