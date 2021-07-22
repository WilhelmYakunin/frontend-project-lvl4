import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    isSignuped: false,
    signupError: 'none',
  },
  reducers: {
    signup(state) {
      const copy = state;
      copy.isSignuped = true;
    },
    signupError(state, action) {
      const copy = state;
      copy.signupError = action.payload;
    },
  },
});

export const {
  signup, signupError,
} = signupSlice.actions;

export default signupSlice.reducer;
