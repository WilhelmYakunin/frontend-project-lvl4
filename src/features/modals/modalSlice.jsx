import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalType: 'unset',
    modalProccedingError: 'none',
  },
  reducers: {
    setModalOpen: (state, action) => {
      Object.assign(state, { modalType: action.payload });
    },
    setModalClose: (state) => {
      Object.assign(state, { modalType: 'unset' });
    },
    modalProccedingError: (state, action) => {
      const errInfo = action.payload;
      Object.assign(state, { modalProccedingError: errInfo });
    },
  },
});

export const {
  setModalOpen,
  setModalClose,
  modalProccedingError,
} = modalSlice.actions;

export default modalSlice.reducer;
