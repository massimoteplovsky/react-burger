import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import { ApiRoute, ActionPrefix, Token } from '../../utils/constants';
import { getToken, deleteToken, setToken } from '../../utils/helpers';
import { RootState, AppDispatch } from '../store';
import { wsAction } from './orders';
import { TApiOptions } from '../../utils/prop-validator';

interface IUserState {
  userData: {
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  isError: boolean;
  success: boolean;
}

type TFormData = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
};

type TUserDataResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

type TUserData = {
  email: string;
  name: string;
};

// Actions
export const resetStatus = createAction(`${ActionPrefix.USER}/resetStatus`);

export const registerUser = createAsyncThunk<
  TUserData,
  TFormData,
  {
    rejectValue: void;
    extra: {
      request: (
        enpoint: string,
        options: TApiOptions
      ) => Promise<TUserDataResponse>;
    };
  }
>(
  `${ActionPrefix.USER}/registerUser`,
  async (formData, { rejectWithValue, extra: { request } }) => {
    try {
      const data = await request(ApiRoute.AUTH_REGISTRATION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const { accessToken, refreshToken, user } = data;
      setToken(Token.ACCESS_TOKEN, accessToken);
      setToken(Token.REFRESH_TOKEN, refreshToken);
      return user;
    } catch {
      return rejectWithValue();
    }
  }
);

export const loginUser = createAsyncThunk<
  TUserData,
  TFormData,
  {
    rejectValue: void;
    extra: {
      request: (
        enpoint: string,
        options: TApiOptions
      ) => Promise<TUserDataResponse>;
    };
  }
>(
  `${ActionPrefix.USER}/loginUser`,
  async (formData, { rejectWithValue, extra: { request } }) => {
    try {
      const data = await request(ApiRoute.AUTH_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const { accessToken, refreshToken, user } = data;
      setToken(Token.ACCESS_TOKEN, accessToken);
      setToken(Token.REFRESH_TOKEN, refreshToken);
      return user;
    } catch {
      return rejectWithValue();
    }
  }
);

export const sendUserEmailToResetPassword = createAsyncThunk<
  void,
  TFormData,
  {
    rejectValue: void;
    extra: {
      request: (enpoint: string, options: TApiOptions) => void;
    };
  }
>(
  `${ActionPrefix.USER}/sendUserEmailToResetPassword`,
  async (formData, { rejectWithValue, extra: { request } }) => {
    try {
      await request(ApiRoute.PASSWORD_RESET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      return rejectWithValue();
    }
  }
);

export const resetPassword = createAsyncThunk<
  void,
  TFormData,
  {
    rejectValue: void;
    extra: {
      request: (enpoint: string, options: TApiOptions) => void;
    };
  }
>(
  `${ActionPrefix.USER}/resetPassword`,
  async (formData, { rejectWithValue, extra: { request } }) => {
    try {
      await request(ApiRoute.PASSWORD_RESET_RESET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      return rejectWithValue();
    }
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  {
    rejectValue: void;
    extra: {
      request: (enpoint: string, options: TApiOptions) => void;
    };
  }
>(
  `${ActionPrefix.USER}/logoutUser`,
  async (_, { rejectWithValue, extra: { request } }) => {
    const refreshToken = getToken(Token.REFRESH_TOKEN);
    try {
      await request(ApiRoute.AUTH_LOGOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      });
      deleteToken(Token.REFRESH_TOKEN);
      deleteToken(Token.ACCESS_TOKEN);
    } catch {
      return rejectWithValue();
    }
  }
);

export const refreshUserToken = createAsyncThunk<
  void,
  any,
  {
    rejectValue: void;
    dispatch: AppDispatch;
    extra: {
      request: (
        endpoint: string,
        options: TApiOptions
      ) => Promise<{ accessToken: string; refreshToken: string }>;
    };
  }
>(
  `${ActionPrefix.USER}/refreshUserToken`,
  async (asyncAction, { rejectWithValue, dispatch, extra: { request } }) => {
    const token = getToken(Token.REFRESH_TOKEN);
    try {
      const { accessToken, refreshToken } = await request(ApiRoute.AUTH_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      });
      setToken(Token.ACCESS_TOKEN, accessToken);
      setToken(Token.REFRESH_TOKEN, refreshToken);
      await dispatch(asyncAction());
    } catch (err) {
      deleteToken(Token.ACCESS_TOKEN);
      deleteToken(Token.REFRESH_TOKEN);
      return rejectWithValue();
    }
  }
);

export const fetchUserData = createAsyncThunk<
  TUserData,
  void,
  {
    rejectValue: void;
    dispatch: AppDispatch;
    extra: {
      request: (
        endpoint: string,
        options: TApiOptions
      ) => Promise<{ user: TUserData }>;
    };
  }
>(
  `${ActionPrefix.USER}/fetchUserData`,
  async (_, { rejectWithValue, dispatch, extra: { request } }) => {
    const accessToken = getToken(Token.ACCESS_TOKEN);

    try {
      const { user } = await request(ApiRoute.AUTH_USER, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      });
      dispatch(wsAction.wsInitUserOrders());
      return user;
    } catch (err: any) {
      if (err.message) {
        dispatch(refreshUserToken(fetchUserData));
        return rejectWithValue();
      }
      return rejectWithValue();
    }
  }
);

export const updateUserData = createAsyncThunk<
  TUserData,
  TFormData,
  {
    rejectValue: void;
    dispatch: AppDispatch;
    extra: {
      request: (
        endpoint: string,
        options: TApiOptions
      ) => Promise<{ user: TUserData }>;
    };
  }
>(
  `${ActionPrefix.USER}/updateUserData`,
  async (formData, { rejectWithValue, dispatch, extra: { request } }) => {
    const accessToken = getToken(Token.ACCESS_TOKEN);
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
    } catch (err: any) {
      if (err.message) {
        dispatch(refreshUserToken(() => updateUserData(formData)));
        return rejectWithValue();
      }
      return rejectWithValue();
    }
  }
);

// Reducer
const initialState: IUserState = {
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
export const getUserState = ({ user }: RootState): IUserState => user;

export default reducer;
