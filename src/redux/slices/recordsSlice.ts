import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const recordsSlice = createSlice({
  name: "records",
  initialState: [] as QuizTypeRecord[],
  reducers: {
    setRecords(_, action: PayloadAction<QuizTypeRecord[]>) {
      return action.payload;
    },
    addRecord(state, action: PayloadAction<QuizTypeRecord>) {
      state.push(action.payload);
    },
    updateRecord(state, action: PayloadAction<QuizTypeRecord>) {
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
