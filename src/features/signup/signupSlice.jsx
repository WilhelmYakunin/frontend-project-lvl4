import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    isSignuped: false,
    signupError: 'none',
  },
  reducers: {
    signup(state) {
      Object.assign(state, { isSignuped: true });
    },
    signupError(state, action) {
      Object.assign(state, { signupError: action.payload });
    },
  },
});

export const {
  signup, signupError,
} = signupSlice.actions;

export default signupSlice.reducer;
