import { combineReducers } from "redux";

import category from "./category"
import product from "./product";
import item from "./item";

const rootReducer = combineReducers({
  category,
  product,
  item
});

export default rootReducer;
