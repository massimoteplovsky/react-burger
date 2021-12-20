import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import { ApiRoute } from '../../utils/constants';
import { ActionPrefix, Token, TOKEN_ERROR_TYPES } from '../../utils/constants';
import { deleteCookie, getCookie, setCookie } from '../../utils/helpers';

// Actions
export const resetStatus = createAction(`${ActionPrefix.USER}/resetStatus`);

export const registerUser = createAsyncThunk(
  `${ActionPrefix.USER}/registerUser`,
  async (formData, { rejectWithValue, extra: request }) => {
    try {
      const data = await request(ApiRoute.AUTH_REGISTRATION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const { accessToken, refreshToken, user } = data;
      setCookie(Token.ACCESS_TOKEN, accessToken);
      setCookie(Token.REFRESH_TOKEN, refreshToken);
      return user;
    } catch {
      return rejectWithValue();
    }
  }
);

export const loginUser = createAsyncThunk(
  `${ActionPrefix.USER}/loginUser`,
  async (formData, { rejectWithValue, extra: request }) => {
    try {
      const data = await request(ApiRoute.AUTH_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const { accessToken, refreshToken, user } = data;
      setCookie(Token.ACCESS_TOKEN, accessToken);
      setCookie(Token.REFRESH_TOKEN, refreshToken);
      return user;
    } catch {
      return rejectWithValue();
    }
  }
);

export const sendUserEmailToResetPassword = createAsyncThunk(
  `${ActionPrefix.USER}/sendUserEmailToResetPassword`,
  async (formData, { rejectWithValue, extra: request }) => {
    try {
      return await request(ApiRoute.PASSWORD_RESET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      return rejectWithValue();
    }
  }
);

export const resetPassword = createAsyncThunk(
  `${ActionPrefix.USER}/resetPassword`,
  async (formData, { rejectWithValue, extra: request }) => {
    try {
      return await request(ApiRoute.PASSWORD_RESET_RESET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      return rejectWithValue();
    }
  }
);

export const logoutUser = createAsyncThunk(
  `${ActionPrefix.USER}/logoutUser`,
  async (_, { rejectWithValue, extra: request }) => {
    const refreshToken = getCookie(Token.REFRESH_TOKEN);
    try {
      await request(ApiRoute.AUTH_LOGOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      });
      deleteCookie(Token.REFRESH_TOKEN);
      deleteCookie(Token.ACCESS_TOKEN);
    } catch {
      return rejectWithValue();
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  `${ActionPrefix.USER}/refreshUserToken`,
  async (asyncAction, { rejectWithValue, dispatch, extra: request }) => {
    const token = getCookie(Token.REFRESH_TOKEN);
    try {
      const { accessToken, refreshToken } = await request(ApiRoute.AUTH_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      setCookie(Token.REFRESH_TOKEN, refreshToken);
      setCookie(Token.ACCESS_TOKEN, accessToken);
      await dispatch(asyncAction());
    } catch (err) {
      deleteCookie(Token.REFRESH_TOKEN);
      deleteCookie(Token.ACCESS_TOKEN);
      return rejectWithValue();
    }
  }
);

export const fetchUserData = createAsyncThunk(
  `${ActionPrefix.USER}/fetchUserData`,
  async (_, { rejectWithValue, dispatch, extra: request }) => {
    const accessToken = getCookie(Token.ACCESS_TOKEN);
    try {
      const { user } = await request(ApiRoute.AUTH_USER, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      });
      return user;
    } catch (err) {
      if (TOKEN_ERROR_TYPES.includes(err.message)) {
        dispatch(refreshUserToken(fetchUserData));
        return rejectWithValue();
      }
      return rejectWithValue();
    }
  }
);

export const updateUserData = createAsyncThunk(
  `${ActionPrefix.USER}/updateUserData`,
  async (formData, { rejectWithValue, dispatch, extra: request }) => {
    const accessToken = getCookie(Token.ACCESS_TOKEN);
    try {
      const { user } = await request(ApiRoute.AUTH_USER, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: JSON.stringify(formData),
      });
      return user;
    } catch (err) {
      if (TOKEN_ERROR_TYPES.includes(err.message)) {
        dispatch(refreshUserToken(() => updateUserData(formData)));
        return rejectWithValue();
      }
      return rejectWithValue();
    }
  }
);

// Reducer
const initialState = {
  userData: null,
  isLoading: false,
  isError: false,
  success: false,
};

const reducer = createReducer(initialState, (builder) => {
  // registerUser action
  builder.addCase(registerUser.pending, (state) => {
    state.isLoading = true;
    state.isError = false;
  });
  builder.addCase(registerUser.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.success = true;
    state.userData = payload;
  });
  builder.addCase(registerUser.rejected, (state) => {
    state.isLoading = false;
    state.isError = true;
    state.success = false;
    state.userData = null;
  });
  // loginUser action
  builder.addCase(loginUser.pending, (state) => {
    state.isLoading = true;
    state.isError = false;
  });
  builder.addCase(loginUser.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.success = true;
    state.userData = payload;
  });
  builder.addCase(loginUser.rejected, (state) => {
    state.isLoading = false;
    state.isError = true;
    state.success = false;
    state.userData = null;
  });
  // sendUserEmailToResetPassword action
  builder.addCase(sendUserEmailToResetPassword.pending, (state) => {
    state.isLoading = true;
    state.isError = false;
  });
  builder.addCase(sendUserEmailToResetPassword.fulfilled, (state) => {
    state.isLoading = false;
    state.success = true;
  });
  builder.addCase(sendUserEmailToResetPassword.rejected, (state) => {
    state.isLoading = false;
    state.isError = true;
    state.success = false;
  });
  // resetPassword action
  builder.addCase(resetPassword.pending, (state) => {
    state.isLoading = true;
    state.isError = false;
  });
  builder.addCase(resetPassword.fulfilled, (state) => {
    state.isLoading = false;
    state.success = true;
  });
  builder.addCase(resetPassword.rejected, (state) => {
    state.isLoading = false;
    state.isError = true;
    state.success = false;
  });
  // logoutUser action
  builder.addCase(logoutUser.fulfilled, () => initialState);
  // fetchUserData action
  builder.addCase(fetchUserData.pending, (state) => {
    state.success = false;
  });
  builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
    state.userData = payload;
    state.success = true;
  });
  builder.addCase(fetchUserData.rejected, (state) => {
    state.userData = null;
    state.success = false;
  });
  // refreshUserToken action
  builder.addCase(refreshUserToken.rejected, (state) => {
    state.success = false;
    state.isError = true;
  });
  // updateUserData action
  builder.addCase(updateUserData.pending, (state) => {
    state.success = false;
  });
  builder.addCase(updateUserData.fulfilled, (state, { payload }) => {
    state.userData = payload;
    state.success = true;
  });
  builder.addCase(updateUserData.rejected, (state) => {
    state.userData = null;
    state.success = false;
  });
  // resetStatus action
  builder.addCase(resetStatus, (state) => {
    state.success = false;
    state.isError = false;
  });
  builder.addDefaultCase((state) => state);
});

// Selectors
export const getUserState = ({ user }) => user;

export default reducer;
