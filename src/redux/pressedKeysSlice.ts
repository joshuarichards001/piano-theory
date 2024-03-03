import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const pressedKeysSlice = createSlice({
  name: "pressedKeys",
  initialState: [] as number[],
  reducers: {
    addKey(state, action: PayloadAction<number>) {
      state.push(action.payload);
    },
    resetKeys() {
      return [];
    },
  },
});

export const { addKey, resetKeys } = pressedKeysSlice.actions;

export const pressedKeysReducer = pressedKeysSlice.reducer;
