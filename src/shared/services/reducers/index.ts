export { default as feedReducer } from './feedSlice';
export {
  wsDisconnect,
  wsOnMessage as feedWsOnMessage,
  wsOnClose as feedWsOnClose,
  wsOnConnecting as feedWsOnConnecting,
  wsOnOpen as feedWsOnOpen,
} from './feedSlice';
export type { ISliceFeed } from './feedSlice';

// ingredientsSlice
export { default as ingredientsReducer } from './ingredientsSlice';
export { loadIngredients } from './ingredientsSlice';
export type { IIngredientsState } from './ingredientsSlice';

// modalSlice
export { default as modalReducer } from './modalSlice';
export { setModalIngredient, setOpen } from './modalSlice';
export type { IIngredientModalState } from './modalSlice';

// orderSlice
export { default as orderReducer } from './orderSlice';
export { postOrder, setOrderItems } from './orderSlice';
export type { IOrderState } from './orderSlice';

// passwordSlice
export { default as passwordReducer } from './passwordSlice';
export { forgotPassword, resetPassword } from './passwordSlice';
export type { IPasswordState } from './passwordSlice';

// selectedIngredientsSlice
export { default as selectedIngredientsReducer } from './selectedIngredientsSlice';
export {
  setBun,
  setIngredients,
  setIngredient,
  addIngredient,
  removeIngredient,
  sortIngredients,
} from './selectedIngredientsSlice';
export type { ISliceSelectedIngredients } from './selectedIngredientsSlice';

// userSlice
export { default as userReducer } from './userSlice';
export {
  initUser,
  loginUser,
  registerUser,
  logoutUser,
  resetStore,
  setAuthStatus,
  setUser,
  wsOnClose as userWsOnClose,
  wsOnConnecting as userWsOnConnecting,
  wsOnMessage as userWsOnMessage,
  wsOnOpen as userWsOnOpen,
} from './userSlice';
export type { IUserState } from './userSlice';
