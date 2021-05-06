import { createSlice } from '@reduxjs/toolkit';

export const deleteModalSlice = createSlice({
  name: 'deleteModal',
  initialState: {
    isOpen: false,
    deleteModalProccedingError: 'none',
    isProceeding: false,
  },
  reducers: {
    requestDeleteModalOpen: (state) => ({
      ...state,
      isProceeding: true,
      deleteModalProccedingError: 'none',
    }),
    setDeleteModalOpen: (state) => ({
      ...state,
      isOpen: true,
    }),
    reciveDeleteModalOpen: (state) => ({
      ...state,
      isProceeding: false,
      deleteModalProccedingError: 'none',
    }),
    requestDeleteModalClose: (state) => ({
      ...state,
      isProceeding: true,
      deleteModalProccedingError: 'none',
    }),
    setDeleteModalClose: (state) => ({
      ...state,
      isOpen: false,
    }),
    reciveDeleteModalClose: (state) => ({
      ...state,
      isProceeding: false,
      deleteModalProccedingError: 'none',
    }),
    deleteModalProccedingError: (state, action) => ({
      ...state,
      deleteModalProccedingError: action.payload,
    }),
  },
});

export const {
  requestDeleteModalOpen,
  setDeleteModalOpen,
  reciveDeleteModalOpen,
  requestDeleteModalClose,
  setDeleteModalClose,
  reciveDeleteModalClose,
  deleteModalProccedingError,
} = deleteModalSlice.actions;

export default deleteModalSlice.reducer;
