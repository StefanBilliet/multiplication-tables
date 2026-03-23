import type { StateCreator } from "zustand";

export type MultiplicationError = {
  table: number;
  multiplier: number;
};

export type ErrorsSlice = {
  multiplicationErrors: MultiplicationError[];
  addMultiplicationError: (error: MultiplicationError) => void;
  clearMultiplicationErrors: () => void;
};

export const createErrorsSlice: StateCreator<ErrorsSlice> = (set) => ({
  multiplicationErrors: [],
  addMultiplicationError: (error) => {
    set((state) => ({
      multiplicationErrors: [...state.multiplicationErrors, error],
    }));
  },
  clearMultiplicationErrors: () => {
    set(() => ({
      multiplicationErrors: [],
    }));
  },
});
