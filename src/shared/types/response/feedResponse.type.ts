import { TFeedOrderItem } from '../feedOrderItem.type';
import { TBaseError } from '../baseError.type';

export type TFeedResponse =
  | {
      success: true;
      orders: Array<TFeedOrderItem>;
      total: number;
      totalToday: number;
    }
  | TBaseError;
