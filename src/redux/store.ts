import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rootCustomMiddleware } from "./middleware";
import { muteReducer } from "./slices/muteSlice";
import { pressedKeysReducer } from "./slices/pressedKeysSlice";
import { quizReducer } from "./slices/quizSlice";
import { recordsReducer } from "./slices/recordsSlice";

const rootReducer = combineReducers({
  pressedKeys: pressedKeysReducer,
  quiz: quizReducer,
  records: recordsReducer,
  mute: muteReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootCustomMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
