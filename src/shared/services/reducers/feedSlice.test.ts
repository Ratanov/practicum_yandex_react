import { describe, it, expect } from '@jest/globals';
import reducer, {
  wsOnMessage,
  wsOnConnecting,
  wsOnOpen,
  wsOnClose,
  wsDisconnect,
  initialState,
} from './feedSlice';
import type { ISliceFeed } from './feedSlice';
import type { TFeedOrderItem } from '@shared/types';
import mockOrdersData from '../test/orders.json';

const mockOrders: TFeedOrderItem[] = mockOrdersData.orders.map((order) => ({
  ...order,
  status: order.status as 'done' | 'created' | 'pending',
}));

describe('Тестирование reducer ленты заказов', () => {
  it('должен вернуть исходное состояние при неизвестном (unknown) действии', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обновить данные фида при получении сообщения через websocket', () => {
    const mockPayload: Omit<ISliceFeed, 'status'> = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };

    const previousState: ISliceFeed = { ...initialState };
    const newState = reducer(previousState, wsOnMessage(mockPayload));

    expect(newState).toEqual({
      ...previousState,
      total: mockPayload.total,
      totalToday: mockPayload.totalToday,
      orders: mockPayload.orders,
    });
  });

  it('должен установить статус "connecting" при начале соединения websocket', () => {
    const previousState: ISliceFeed = {
      ...initialState,
      status: 'disconnected',
    };
    const newState = reducer(previousState, wsOnConnecting());

    expect(newState).toEqual({
      ...previousState,
      status: 'connecting',
    });
  });

  it('должен установить статус "connected" при успешном соединении websocket', () => {
    const previousState: ISliceFeed = { ...initialState, status: 'connecting' };
    const newState = reducer(previousState, wsOnOpen());

    expect(newState).toEqual({
      ...previousState,
      status: 'connected',
    });
  });

  it('должен установить статус "disconnected" при закрытии соединения websocket', () => {
    const previousState: ISliceFeed = { ...initialState, status: 'connected' };
    const newState = reducer(previousState, wsOnClose());

    expect(newState).toEqual({
      ...previousState,
      status: 'disconnected',
    });
  });

  it('должен очистить все данные при отключении', () => {
    const previousState: ISliceFeed = {
      status: 'connected',
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };

    const newState = reducer(previousState, wsDisconnect());

    expect(newState).toEqual({
      status: 'disconnected',
      orders: [],
      total: null,
      totalToday: null,
    });
  });
});
