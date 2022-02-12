import reducer, { sendOrder, resetOrder, IOrderState } from './order';

const initialState: IOrderState = {
  orderNumber: null,
  isLoading: false,
};

describe('Order reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle sendOrder pending', () => {
    expect(
      reducer(initialState, {
        type: sendOrder.pending,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('should handle sendOrder fulfilled', () => {
    expect(
      reducer(initialState, {
        type: sendOrder.fulfilled,
        payload: 12345,
      })
    ).toEqual({
      orderNumber: 12345,
      isLoading: false,
    });
  });
  it('should handle sendOrder rejected', () => {
    expect(
      reducer(initialState, {
        type: sendOrder.rejected,
      })
    ).toEqual(initialState);
  });
  it('should handle resetOrder', () => {
    expect(
      reducer(initialState, {
        type: resetOrder,
      })
    ).toEqual(initialState);
  });
});
