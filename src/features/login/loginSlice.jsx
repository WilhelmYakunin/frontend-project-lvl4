import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    authError: 'none',
  },
  reducers: {
    login(state) {
      const copy = state;
      copy.isAuthenticated = true;
    },
    loginError(state, action) {
      const copy = state;
      copy.loginError = action.payload;
    },
  },
});

export const {
  login, loginError,
} = loginSlice.actions;

export default loginSlice.reducer;
