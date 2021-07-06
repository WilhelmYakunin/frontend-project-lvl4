import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    authError: 'none',
  },
  reducers: {
    login(state) {
      Object.assign(state, { isAuthenticated: true });
    },
    loginError(state, action) {
      Object.assign(state, { loginError: action.payload });
    },
  },
});

export const {
  login, loginError,
} = loginSlice.actions;

export default loginSlice.reducer;
