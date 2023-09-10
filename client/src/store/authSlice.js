import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userId: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, userId, accessToken } = action.payload;
      state.user = user;
      state.userId = userId;
      state.token = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const fetchAuthData = () => async (dispatch) => {
  try {
    const response = await apiSlice.endpoints.getAuthToken();

    if (apiSlice.endpoints.getAuthToken.match(response)) {
      const { user, userId, accessToken } = response.data;

      dispatch(setCredentials({ user, userId, accessToken }));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    console.error('Error fetching auth data:', error);
    dispatch(logout());
  }
};

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentToken = (state) => state.auth.token;
