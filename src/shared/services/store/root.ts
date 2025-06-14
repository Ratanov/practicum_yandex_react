import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../reducers/ingredientsSlice';
import orderReducer from '../reducers/orderSlice';
import selectedIngredientsReducer from '../reducers/selectedIngredientsSlice';
import userReducer from '../reducers/userSlice';
import ingredientsModalReducer from '../reducers/modalSlice';
import passwordReducer from '../reducers/passwordSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  selectedIngredients: selectedIngredientsReducer,
  user: userReducer,
  ingredientsModal: ingredientsModalReducer,
  password: passwordReducer,
});

export default rootReducer;
