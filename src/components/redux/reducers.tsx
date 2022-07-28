import { combineReducers } from "redux";
import ReducerSlice from "./Slices";

const rootReducer = combineReducers({
  ReducerSlice: ReducerSlice
});

export default rootReducer;
