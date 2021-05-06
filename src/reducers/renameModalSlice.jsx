import { createSlice } from '@reduxjs/toolkit';

export const renameModalSlice = createSlice({
  name: 'renameModal',
  initialState: {
    isOpen: false,
    renameModalProccedingError: 'none',
    isProceeding: false,
  },
  reducers: {
    requestRenameModalOpen: (state) => ({
      ...state,
      isProceeding: true,
      renameModalProccedingError: 'none',
    }),
    setRenameModalOpen: (state) => ({
      ...state,
      isOpen: true,
    }),
    reciveRenameModalOpen: (state) => ({
      ...state,
      isProceeding: false,
      renameModalProccedingError: 'none',
    }),
    requestRenameModalClose: (state) => ({
      ...state,
      isProceeding: true,
      renameModalProccedingError: 'none',
    }),
    setRenameModalClose: (state) => ({
      ...state,
      isOpen: false,
    }),
    reciveRenameModalClose: (state) => ({
      ...state,
      isProceeding: false,
      renameModalProccedingError: 'none',
    }),
    renameModalProccedingError: (state, action) => ({
      ...state,
      renameModalProccedingError: action.payload,
    }),
  },
});

export const {
  requestRenameModalOpen,
  setRenameModalOpen,
  reciveRenameModalOpen,
  requestRenameModalClose,
  setRenameModalClose,
  reciveRenameModalClose,
  renameModalProccedingError,
} = renameModalSlice.actions;

export default renameModalSlice.reducer;
