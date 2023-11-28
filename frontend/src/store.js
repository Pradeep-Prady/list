import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import listReducer from "./slices/listSlice";

const reducer = combineReducers({
  listState: listReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
