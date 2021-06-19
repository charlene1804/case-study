import { combineReducers } from "redux";

// reducers import
import productsReducer from "./products";
import cartReducer from "./cart";
import orderReducer from "./order";

// combine reducers
export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});
