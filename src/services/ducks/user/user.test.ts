import reducer, {
  resetStatus,
  registerUser,
  loginUser,
  sendUserEmailToResetPassword,
  resetPassword,
  logoutUser,
  refreshUserToken,
  fetchUserData,
  updateUserData,
  IUserState,
} from './user';

const initialState: IUserState = {
  userData: null,
  isLoading: false,
  isError: false,
  success: false,
};

const userData = {
  email: 'test@email.ru',
  name: 'Test user',
};

describe('User reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should handle registerUser pending', () => {
    expect(reducer(initialState, { type: registerUser.pending })).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });
  it('should handle registerUser fulfilled', () => {
    expect(
      reducer(initialState, {
        type: registerUser.fulfilled,
        payload: userData,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      success: true,
      userData,
    });
  });
  it('should handle registerUser rejected', () => {
    expect(
      reducer(initialState, {
        type: registerUser.rejected,
        payload: userData,
      })
    ).toEqual({
      ...initialState,
      isError: true,
    });
  });
  it('should handle loginUser pending', () => {
    expect(
      reducer(initialState, {
        type: loginUser.pending,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });
  it('should handle loginUser fulfilled', () => {
    expect(
      reducer(initialState, {
        type: loginUser.fulfilled,
        payload: userData,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      success: true,
      userData,
    });
  });
  it('should handle loginUser rejected', () => {
    expect(
      reducer(initialState, {
        type: loginUser.rejected,
      })
    ).toEqual({
      ...initialState,
      isError: true,
    });
  });
  it('should handle sendUserEmailToResetPassword pending', () => {
    expect(
      reducer(initialState, {
        type: sendUserEmailToResetPassword.pending,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });
  it('should handle sendUserEmailToResetPassword fulfilled', () => {
    expect(
      reducer(initialState, {
        type: sendUserEmailToResetPassword.fulfilled,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      success: true,
    });
  });
  it('should handle sendUserEmailToResetPassword rejected', () => {
    expect(
      reducer(initialState, {
        type: sendUserEmailToResetPassword.rejected,
      })
    ).toEqual({
      ...initialState,
      isError: true,
    });
  });
  it('should handle resetPassword pending', () => {
    expect(
      reducer(initialState, {
        type: resetPassword.pending,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });
  it('should handle resetPassword fulfilled', () => {
    expect(
      reducer(initialState, {
        type: resetPassword.fulfilled,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      success: true,
    });
  });
  it('should handle resetPassword rejected', () => {
    expect(
      reducer(initialState, {
        type: resetPassword.rejected,
      })
    ).toEqual({
      ...initialState,
      isError: true,
    });
  });
  it('should handle logoutUser', () => {
    expect(
      reducer(initialState, {
        type: logoutUser,
      })
    ).toEqual(initialState);
  });
  it('should handle fetchUserData pending', () => {
    expect(
      reducer(initialState, {
        type: fetchUserData.pending,
      })
    ).toEqual({ ...initialState, success: false });
  });
  it('should handle fetchUserData fulfilled', () => {
    expect(
      reducer(initialState, {
        type: fetchUserData.fulfilled,
        payload: userData,
      })
    ).toEqual({ ...initialState, success: true, userData });
  });
  it('should handle fetchUserData rejected', () => {
    expect(
      reducer(initialState, {
        type: fetchUserData.rejected,
      })
    ).toEqual({ ...initialState, userData: null, success: false });
  });
  it('should handle refreshUserToken rejected', () => {
    expect(
      reducer(initialState, {
        type: refreshUserToken.rejected,
      })
    ).toEqual({ ...initialState, isError: true, success: false });
  });
  it('should handle updateUserData pending', () => {
    expect(
      reducer(initialState, {
        type: updateUserData.pending,
      })
    ).toEqual({ ...initialState, success: false });
  });
  it('should handle updateUserData fulfilled', () => {
    expect(
      reducer(
        {
          ...initialState,
          userData: { email: 'test1@email.ru', name: 'Test name1' },
        },
        {
          type: updateUserData.fulfilled,
          payload: userData,
        }
      )
    ).toEqual({ ...initialState, success: true, userData });
  });
  it('should handle updateUserData rejected', () => {
    expect(
      reducer(initialState, {
        type: updateUserData.rejected,
      })
    ).toEqual({ ...initialState, userData: null, success: false });
  });
  it('should handle resetStatus', () => {
    expect(
      reducer(initialState, {
        type: resetStatus,
      })
    ).toEqual({ ...initialState, isError: false, success: false });
  });
});
