import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    authError: 'none',
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    loginError(state, action) {
      state.loginError = action.payload;
    },
  },
});

export const {
  login, loginError,
} = loginSlice.actions;

export default loginSlice.reducer;
