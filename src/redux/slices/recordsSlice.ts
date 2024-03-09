import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const recordsSlice = createSlice({
  name: "records",
  initialState: [] as QuizRecord[],
  reducers: {
    setRecords(_, action: PayloadAction<QuizRecord[]>) {
      return action.payload;
    },
    addRecord(state, action: PayloadAction<QuizRecord>) {
      state.push(action.payload);
    },
    updateRecord(state, action: PayloadAction<QuizRecord>) {
      return state.map((record) => {
        if (record.quizType === action.payload.quizType) {
          return action.payload;
        }
        return record;
      });
    },
  },
});

export const { setRecords, addRecord, updateRecord } = recordsSlice.actions;

export const recordsReducer = recordsSlice.reducer;
