import type { StateCreator } from 'zustand';
import type { QuestionOrderMode } from '../models/questionOrderMode';

export type QuestionOrderModeSlice = {
  questionOrderMode: QuestionOrderMode;
  setQuestionOrderMode: (mode: QuestionOrderMode) => void;
};

export const createQuestionOrderModeSlice: StateCreator<QuestionOrderModeSlice> = (set) => ({
  questionOrderMode: 'structured',
  setQuestionOrderMode: (mode) => {
    set(() => ({ questionOrderMode: mode }));
  },
});
