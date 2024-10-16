import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  questionTitle: string;
  questionType: string;
  answers?: string[];
  correctAnswers?: string[];
  maxPoint: number;
}

interface FormState {
  questions: Question[];
  activeQuestionIndex: number | null;
}

const initialState: FormState = {
  questions: [],
  activeQuestionIndex: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addQuestion(state) {
      const newQuestion: Question = {
        questionTitle: '',
        questionType: 'SHORT_ANSWER', // Default type
        answers: [],
        correctAnswers: [],
        maxPoint: 0, // Default max point
      };

      return {
        ...state,
        questions: [...state.questions, newQuestion],
        activeQuestionIndex: state.questions.length, // Update activeQuestionIndex
      };
    },
    updateQuestionTitle(
      state,
      action: PayloadAction<{ index: number; questionTitle: string }>,
    ) {
      const { index, questionTitle } = action.payload;
      if (state.questions[index]) {
        state.questions[index].questionTitle = questionTitle;
      }
    },
    updateQuestionType(
      state,
      action: PayloadAction<{ index: number; questionType: string }>,
    ) {
      const { index, questionType } = action.payload;
      if (state.questions[index]) {
        state.questions[index].questionType = questionType;
      }
    },
    updateQuestionCorrectAnswers(
      state,
      action: PayloadAction<{
        index: number;
        questionCorrectAnswers: string[];
      }>,
    ) {
      const { index, questionCorrectAnswers } = action.payload;
      if (state.questions[index]) {
        state.questions[index].correctAnswers = questionCorrectAnswers;
      }
    },
    updateQuestionPoint(
      state,
      action: PayloadAction<{ index: number; maxPoint: number }>,
    ) {
      const { index, maxPoint } = action.payload;
      if (state.questions[index]) {
        state.questions[index].maxPoint = maxPoint;
      }
    },
    updateQuestionValue(
      state,
      action: PayloadAction<{ index: number | null; value: string[] }>,
    ) {
      const { index, value } = action.payload;
      if (index !== null && state.questions[index]) {
        state.questions[index].answers = value;
      }
    },
    deleteQuestion(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.questions.splice(index, 1);
      if (state.activeQuestionIndex !== null) {
        state.activeQuestionIndex =
          index === state.questions.length ? index - 1 : null;
      }
    },
    setActiveQuestionIndex(state, action: PayloadAction<number | null>) {
      state.activeQuestionIndex = action.payload;
    },
  },
});

export const {
  addQuestion,
  updateQuestionTitle,
  updateQuestionType,
  updateQuestionCorrectAnswers,
  updateQuestionPoint,
  updateQuestionValue,
  deleteQuestion,
  setActiveQuestionIndex,
} = formSlice.actions;

export default formSlice.reducer;
