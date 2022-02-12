import reducer, {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
  clearCurrentOrder,
  fetchCurrentOrder,
  IOrdersState,
} from './orders';
import { data } from '../../../utils/data';

const initialState: IOrdersState = {
  isLoading: false,
  isConnected: false,
  ordersData: null,
  currentOrder: null,
};

describe('Orders reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle wsConnectionSuccess', () => {
    expect(reducer(initialState, { type: wsConnectionSuccess })).toEqual({
      ...initialState,
      isConnected: true,
    });
  });
  it('should handle wsConnectionError', () => {
    expect(reducer(initialState, { type: wsConnectionError })).toEqual(
      initialState
    );
  });
  it('should handle wsConnectionClosed', () => {
    expect(reducer(initialState, { type: wsConnectionClosed })).toEqual(
      initialState
    );
  });
  it('should handle wsGetMessage', () => {
    expect(
      reducer(initialState, { type: wsGetMessage, payload: [data[0], data[1]] })
    ).toEqual({ ...initialState, ordersData: [data[0], data[1]] });
  });
  it('should handle fetchCurrentOrder pending', () => {
    expect(reducer(initialState, { type: fetchCurrentOrder.pending })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('should handle fetchCurrentOrder fulfilled', () => {
    expect(
      reducer(initialState, {
        type: fetchCurrentOrder.fulfilled,
        payload: data[0],
      })
    ).toEqual({
      ...initialState,
      currentOrder: data[0],
    });
  });
  it('should handle fetchCurrentOrder rejected', () => {
    expect(
      reducer(initialState, {
        type: fetchCurrentOrder.rejected,
      })
    ).toEqual(initialState);
  });
  it('should handle clearCurrentOrder', () => {
    expect(
      reducer(initialState, {
        type: clearCurrentOrder,
      })
    ).toEqual({
      ...initialState,
      currentOrder: null,
    });
  });
});
