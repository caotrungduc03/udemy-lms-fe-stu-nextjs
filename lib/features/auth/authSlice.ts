import { createSlice } from '@reduxjs/toolkit';
import { getToken, setToken } from '../../tokens';
import { authApi } from './authApi';

type AuthState = {
  user: any;
  accessToken: string | undefined;
};

const initialState: AuthState = {
  user: null,
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      state.user = null;
      state.accessToken = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.data.accessToken);

          state.user = payload.data.user;
          state.accessToken = payload.data.accessToken;
        },
      )
      .addMatcher(
        authApi.endpoints.getAuthData.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data;
          state.accessToken = getToken();
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
