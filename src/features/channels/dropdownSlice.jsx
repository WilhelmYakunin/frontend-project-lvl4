import { createSlice } from '@reduxjs/toolkit';

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    id: 'none',
    dropdownProccedingError: 'none',
    isProceeding: false,
  },
  reducers: {
    requestDropdownOpen: (state) => ({
      ...state,
      isProceeding: true,
      dropdownProccedingError: 'none',
    }),
    setDropdownOpen: (state, action) => ({
      ...state,
      id: action.payload,
    }),
    reciveDropdownOpen: (state) => ({
      ...state,
      isProceeding: false,
      dropdownProccedingError: 'none',
    }),
    dropdownProccedingError: (state, action) => ({
      ...state,
      dropdownProccedingError: action.payload,
    }),
  },
});

export const {
  requestDropdownOpen,
  setDropdownOpen,
  reciveDropdownOpen,
  dropdownProccedingError,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;
