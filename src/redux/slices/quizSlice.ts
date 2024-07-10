import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: Quiz = {
  questions: [],
  currentQuestion: [],
  currentQuestionIndex: 0,
  score: 0,
  isCompleted: false,
  finalTime: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuiz(_, action: PayloadAction<number[][]>) {
      return {
        ...initialState,
        questions: action.payload,
        currentQuestion: action.payload[0],
      };
    },
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
      state.currentQuestion = state.questions[action.payload];
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    setIsCompleted(state, action: PayloadAction<boolean>) {
      state.isCompleted = action.payload;
    },
    setFinalTime(state, action: PayloadAction<number>) {
      state.finalTime = action.payload;
    },
  },
});

export const {
  resetQuiz,
  setCurrentQuestionIndex,
  setScore,
  setIsCompleted,
  setFinalTime,
} = quizSlice.actions;

export const quizReducer = quizSlice.reducer;
