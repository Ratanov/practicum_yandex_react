import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../reducers/ingredientsSlice';
import orderReducer from '../reducers/orderSlice';
import selectedIngredientsReducer from '../reducers/selectedIngredientsSlice';
import userReducer from '../reducers/userSlice';
import ingredientsModalReducer from '../reducers/modalSlice';
import passwordReducer from '../reducers/passwordSlice';
import feedReducer from '../reducers/feedSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  selectedIngredients: selectedIngredientsReducer,
  user: userReducer,
  ingredientsModal: ingredientsModalReducer,
  password: passwordReducer,
  feeds: feedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
