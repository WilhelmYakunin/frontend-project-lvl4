import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authorization',
  initialState: {
    isAuthenticated: false,
    authError: 'none',
  },
  reducers: {
    login(state) {
      Object.assign(state, { isAuthenticated: true });
    },
    logout(state) {
      Object.assign(state, { isAuthenticated: false });
    },
    authError(state, action) {
      Object.assign(state, { authError: action.payload });
    },
  },
});

export const {
  login, logout, authError,
} = authSlice.actions;

export default authSlice.reducer;
