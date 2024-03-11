import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  questions: number[][];
  currentQuestionIndex: number;
  currentQuestion: number[];
  score: number;
  isCompleted: boolean;
}

const initialState: QuizState = {
  questions: [],
  currentQuestion: [],
  currentQuestionIndex: 0,
  score: 0,
  isCompleted: false,
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
  },
});

export const { resetQuiz, setCurrentQuestionIndex, setScore, setIsCompleted } =
  quizSlice.actions;

export const quizReducer = quizSlice.reducer;
