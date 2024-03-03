import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pressedKeysReducer } from "./slices/pressedKeysSlice";

const rootReducer = combineReducers({
  pressedKeys: pressedKeysReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
