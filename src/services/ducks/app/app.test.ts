import reducer, { IAppState, setError } from './app';

const initialState: IAppState = {
  isError: false,
};

describe('App reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  it('should handle setError', () => {
    expect(reducer(initialState, { type: setError, payload: true })).toEqual({
      isError: true,
    });
  });
});
