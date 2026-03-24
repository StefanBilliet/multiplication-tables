import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import {
  createErrorsSlice,
  type ErrorsSlice,
} from "../../features/practice/errorsSlice";
import { createRewardsSlice, type RewardsSlice } from "../rewards/rewardsSlice";

export type QuestionOrderMode = "structured" | "varied";

type AppState = RewardsSlice &
  ErrorsSlice & {
    questionOrderMode: QuestionOrderMode;
    setQuestionOrderMode: (mode: QuestionOrderMode) => void;
  };

type AppStore = AppState;

type AppStorePersist = Omit<
  AppStore,
  | "addReward"
  | "addMultiplicationError"
  | "clearMultiplicationErrors"
  | "setQuestionOrderMode"
>;

const LEGACY_STORAGE_KEY = "lifetimeRewardTotal";
const NEW_STORAGE_KEY = "multiplication-app";

const migrateLegacyStorage = () => {
  const newData = localStorage.getItem(NEW_STORAGE_KEY);
  if (newData) return;

  const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!legacyData) return;

  const parsed = Number(legacyData);
  const value = !Number.isNaN(parsed) ? parsed : 0;
  localStorage.setItem(
    NEW_STORAGE_KEY,
    JSON.stringify({
      state: { lifetimeRewardTotal: value, multiplicationErrors: [] },
      version: 0,
    }),
  );
  localStorage.removeItem(LEGACY_STORAGE_KEY);
};

const createPersistStorage = () => {
  return {
    getItem: (_name: string): string | null =>
      localStorage.getItem(NEW_STORAGE_KEY),
    setItem: (_name: string, value: string) => {
      localStorage.setItem(NEW_STORAGE_KEY, value);
    },
    removeItem: (_name: string) => {
      localStorage.removeItem(NEW_STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    },
  };
};

const createAppStore = () => {
  migrateLegacyStorage();

  return createStore<AppState>()(
    persist(
      (...args) => ({
        ...createRewardsSlice(...args),
        ...createErrorsSlice(...args),
        questionOrderMode: "structured",
        setQuestionOrderMode: (mode) => {
          args[0](() => ({ questionOrderMode: mode }));
        },
      }),
      {
        name: "multiplication-app",
        storage: createJSONStorage(() => createPersistStorage()),
        partialize: (state): AppStorePersist => ({
          lifetimeRewardTotal: state.lifetimeRewardTotal,
          multiplicationErrors: state.multiplicationErrors,
          questionOrderMode: state.questionOrderMode,
        }),
      },
    ),
  );
};

let appStore = createAppStore();

export const getAppStore = () => appStore;

export const useAppStore = <T>(selector: (state: AppState) => T) =>
  useStore(appStore, selector);

export const resetAppStore = () => {
  appStore = createAppStore();
};
