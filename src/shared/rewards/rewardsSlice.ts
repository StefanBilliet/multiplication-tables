import type { StateCreator } from 'zustand';

export type RewardsSlice = {
  lifetimeRewardTotal: number;
  addReward: () => void;
};

export const createRewardsSlice: StateCreator<RewardsSlice> = (set) => ({
  lifetimeRewardTotal: 0,
  addReward: () => {
    set((state) => ({
      lifetimeRewardTotal: state.lifetimeRewardTotal + 1,
    }));
  },
});
