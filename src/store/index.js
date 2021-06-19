// Imports
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// rootReducer = result of combineReducers in Reducers/index.js
import rootReducer from "../reducers";

// middlewares
import productsMiddleware from "../middlewares/products";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(productsMiddleware))
);

export default store;
