import { createSlice } from '@reduxjs/toolkit';

const i18nSlice = createSlice({
  name: 'i18n',
  initialState: {
    isInit: false,
    i18nError: 'none',
  },
  reducers: {
    i18nLoaded(state) {
      state.isInit = true;
    },
    i18nError(state, action) {
      state.i18nError = action.payload;
    },
  },
});

export const {
  i18nLoaded, i18nError,
} = i18nSlice.actions;

export default i18nSlice.reducer;
