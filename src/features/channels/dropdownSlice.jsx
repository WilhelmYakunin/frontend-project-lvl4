import { createSlice } from '@reduxjs/toolkit';

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    id: 'none',
    dropdownProccedingError: 'none',
  },
  reducers: {
    setDropdownOpen(state, action) {
      Object.assign(state, { id: action.payload });
    },
    dropdownProccedingError(state, action) {
      Object.assign(state, { dropdownProccedingError: action.payload });
    },
  },
});

export const {
  setDropdownOpen,
  dropdownProccedingError,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;
