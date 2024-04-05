import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const muteSlice = createSlice({
  name: "mute",
  initialState: true,
  reducers: {
    setMute(_, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setMute } = muteSlice.actions;

export const muteReducer = muteSlice.reducer;
