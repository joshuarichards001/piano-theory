import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pressedKeysReducer } from "./slices/pressedKeysSlice";
import { quizReducer } from "./slices/quizSlice";

const rootReducer = combineReducers({
  pressedKeys: pressedKeysReducer,
  quiz: quizReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
