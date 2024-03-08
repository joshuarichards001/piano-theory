import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  questions: number[][];
  currentQuestionIndex: number;
  currentQuestion: number[];
}

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    currentQuestion: [],
  } as QuizState,
  reducers: {
    resetQuiz(state, action: PayloadAction<number[][]>) {
      state.questions = action.payload;
      state.currentQuestion = action.payload[0];
      state.currentQuestionIndex = 0;
    },
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
      state.currentQuestion = state.questions[action.payload];
    },
  },
});

export const { resetQuiz, setCurrentQuestionIndex } = quizSlice.actions;

export const quizReducer = quizSlice.reducer;
