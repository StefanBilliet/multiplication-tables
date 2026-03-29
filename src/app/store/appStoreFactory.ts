import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore, type StoreApi } from 'zustand/vanilla';
import {
  createSessionHistorySlice,
  hydrateSessionCompletedEvent,
  type SerializedSessionCompletedEvent,
  type SessionHistorySlice,
} from '../../practice-history/state/sessionHistorySlice';
import { createHesitationRuleSlice, type HesitationRuleSlice } from '../../settings/state/hesitationRuleSlice';
import { createQuestionOrderModeSlice, type QuestionOrderModeSlice } from '../../settings/state/questionOrderModeSlice';
import { createRewardsSlice, type RewardsSlice } from '../state/rewardsSlice';
import { createPersistStorage, migrateLegacyStorage } from './appStorePersistence';

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
        merge: (persistedState, currentState) => {
          const state =
            (persistedState as { state?: Partial<AppStorePersist> } | undefined)?.state ??
            (persistedState as Partial<AppStorePersist> | undefined);

          if (!state) {
            return currentState;
          }

          const sessionCompletedEvents = state.sessionCompletedEvents ?? [];

          return {
            ...currentState,
            ...state,
            sessionCompletedEvents: sessionCompletedEvents.map((event) =>
              hydrateSessionCompletedEvent(event as unknown as SerializedSessionCompletedEvent),
            ),
          };
        },
      },
    ),
  );
};

export type { AppStore };
