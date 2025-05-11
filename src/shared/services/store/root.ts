import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../reducers/ingredientsSlice';
import orderReducer from '../reducers/orderSlice';
import selectedIngredientsReducer from '../reducers/selectedIngredientsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  selectedIngredients: selectedIngredientsReducer,
});

export default rootReducer;
