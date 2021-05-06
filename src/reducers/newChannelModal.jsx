import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalProccedingError: 'none',
  },
  reducers: {
    requestModalOpen: (state) => ({
      ...state,
      isProceeding: true,
      modalProccedingError: 'none',
    }),
    setModalOpen: (state) => ({
      ...state,
      isOpen: true,
    }),
    reciveModalOpen: (state) => ({
      ...state,
      isProceeding: false,
      modalProccedingError: 'none',
    }),
    requestModalClose: (state) => ({
      ...state,
      isProceeding: true,
      modalProccedingError: 'none',
    }),
    setModalClose: (state) => ({
      ...state,
      isOpen: false,
    }),
    reciveModalClose: (state) => ({
      ...state,
      isProceeding: false,
      modalProccedingError: 'none',
    }),
    modalProccedingError: (state, action) => ({
      ...state,
      modalProccedingError: action.payload,
    }),
  },
});

export const {
  requestModalOpen,
  setModalOpen,
  reciveModalOpen,
  requestModalClose,
  setModalClose,
  reciveModalClose,
  modalProccedingError,
} = modalSlice.actions;

export default modalSlice.reducer;
