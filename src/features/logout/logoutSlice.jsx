import { createSlice } from '@reduxjs/toolkit';

export const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    isLogouted: true,
    logoutError: 'none',
  },
  reducers: {
    logout(state) {
      Object.assign(state, { isLogouted: false });
    },
    logoutError(state, action) {
      Object.assign(state, { logoutError: action.payload });
    },
  },
});

export const {
  logout, logoutError,
} = logoutSlice.actions;

export default logoutSlice.reducer;
