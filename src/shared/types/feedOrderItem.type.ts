export type TFeedOrderItem = {
  ingredients: Array<string>;
  _id: string;
  status: 'created' | 'pending' | 'done';
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
