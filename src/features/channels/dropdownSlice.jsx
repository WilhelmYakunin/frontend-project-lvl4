import { createSlice } from '@reduxjs/toolkit';

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    id: 'none',
    dropdownProccedingError: 'none',
  },
  reducers: {
    setDropdownOpen(state, action) {
      const copy = state;
      copy.id = action.payload;
    },
    dropdownProccedingError(state, action) {
      const copy = state;
      copy.dropdownProccedingError = action.payload;
    },
  },
});

export const {
  setDropdownOpen,
  dropdownProccedingError,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;
