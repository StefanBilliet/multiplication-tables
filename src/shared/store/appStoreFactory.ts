import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore, type StoreApi } from 'zustand/vanilla';
import { createRewardsSlice, type RewardsSlice } from '../rewards/rewardsSlice';
import { createPersistStorage, migrateLegacyStorage } from './appStorePersistence';
import { createHesitationRuleSlice, type HesitationRuleSlice } from './hesitationRuleSlice';
import { createQuestionOrderModeSlice, type QuestionOrderModeSlice } from './questionOrderModeSlice';
import { createSessionHistorySlice, type SessionHistorySlice } from './sessionHistorySlice';

export type AppState = RewardsSlice & SessionHistorySlice & HesitationRuleSlice & QuestionOrderModeSlice;

type CreateAppStoreOptions = {
  persist?: boolean;
};

type AppStorePersist = Omit<
  AppState,
  'addReward' | 'recordSessionCompleted' | 'setHesitationRuleEnabled' | 'setQuestionOrderMode'
>;

type AppStore = StoreApi<AppState>;

export const createAppStore = ({ persist: shouldPersist = true }: CreateAppStoreOptions = {}) => {
  const createBaseStore = () =>
    createStore<AppState>()((...args) => ({
      ...createRewardsSlice(...args),
      ...createSessionHistorySlice(...args),
      ...createHesitationRuleSlice(...args),
      ...createQuestionOrderModeSlice(...args),
    }));

  if (!shouldPersist) {
    return createBaseStore();
  }

  migrateLegacyStorage();

  return createStore<AppState>()(
    persist(
      (...args) => ({
        ...createRewardsSlice(...args),
        ...createSessionHistorySlice(...args),
        ...createHesitationRuleSlice(...args),
        ...createQuestionOrderModeSlice(...args),
      }),
      {
        name: 'multiplication-app',
        storage: createJSONStorage(() => createPersistStorage()),
        partialize: (state): AppStorePersist => ({
          lifetimeRewardTotal: state.lifetimeRewardTotal,
          recentWeaknesses: state.recentWeaknesses,
          sessionCompletedEvents: state.sessionCompletedEvents,
          isHesitationRuleEnabled: state.isHesitationRuleEnabled,
          questionOrderMode: state.questionOrderMode,
        }),
      },
    ),
  );
};

export type { AppStore };
